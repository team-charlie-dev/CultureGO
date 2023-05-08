import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

//export const supabase = createClient(process.env.DB_URL, process.env.API_KEY);
export const supabase = createClient(
  "https://iynsfqmubcvdoqicgqlv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5bnNmcW11YmN2ZG9xaWNncWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE3OTk1MTQsImV4cCI6MTk5NzM3NTUxNH0.N9sUJu0qrIm1TUVMx8vw78GDGw7WTe_Hm3gDIZbEIIc"
);

const BASE_IMG_URL =
  "https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/";

export const createUser = async (username, password) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ username: username, password: password }])
    .select("user_id, username");
  if (error) {
    if (error.code == "23505") {
      return { error: "User already exists" };
    }
    return error;
  }
  return data;
};

export const getUser = async (username) => {
  const { data, error } = await supabase
    .from("users")
    .select("username, user_id, password")
    .eq("username", username);
  if (error) return error;
  if (data.length == 0) return { error: "User not found" };
  return data[0];
};

export const getItems = async (amount, user) => {
  const { data, error } = await supabase.from("sights").select(); // TODO hämta enbart det man inte har sett
  if (error) return error;

  // TODO fixa så att den väljer annorlunda varje gång

  const splicedData = data.splice(0, amount);
  return await Promise.all(
    splicedData.map(
      async ({
        sight_id,
        name,
        short_info,
        long_info,
        price,
        main_tag_id,
        address_id,
        number_of_img,
        short_price,
      }) => {
        const images = [];
        const open_hours = await getOpenHours(sight_id);
        const location = await getLocation(address_id);

        for (let i = 1; i <= number_of_img; i++)
          images.push(BASE_IMG_URL + "sights/" + sight_id + "/" + i + ".jpg");

        return {
          sight_id,
          name,
          short_info,
          long_info,
          price,
          main_tag_id,
          address_id,
          images,
          short_price,
          open_hours,
          location,
        };
      }
    )
  );
};

export const getOpenHours = async (sightId) => {
  const { data, error } = await supabase
    .from("open_hours")
    .select()
    .eq("sight_id", sightId);
  return data ? data[0] : [];
};

export const getLocation = async (addressId) => {
  const { data, error } = await supabase
    .from("addresses")
    .select("location")
    .eq("address_id", addressId);
  return data[0].location;
};

export const getLikes = async (userId, page, filter, sort) => {
  const { data, error } = await supabase
    .from("liked_sights")
    .select("user_id, liked_at, sights (sight_id, name, number_of_img)")
    .order("liked_at", { ascending: sort === "old" })
    .eq("user_id", userId)
    .range(page * 10, page * 10 + 9);

  if (error) return error;

  return data;
};

export const getFullInfo = async (sightId, onlyLong) => {
  // commented version doesnt work on sights that are missing in the opening hours table
  // const {data, error} = await supabase.from('open_hours').select('sights ( long_info )').eq('sight_id', sightId)
  const { data, error } = await supabase
    .from("sights")
    .select("long_info, price")
    .eq("sight_id", sightId);
  const open_hours = await getOpenHours(sightId);
  if (error) return error;

  return [data, open_hours];
};

export const addLikes = async (userId, sightId) => {
  const { data, error } = await supabase
    .from("liked_sights")
    .insert([{ user_id: userId, sight_id: sightId }]);
  if (error) return error;

  return { sightId };
};

export const getSubTags = async (sightId) => {
  const { data, error } = await supabase
    .from("sub_tag")
    .select("tag_id")
    .eq("sight_id", sightId);
  if (error) return error;

  return data;
};

export const getTagValue = async (userId) => {
  const { data, error } = await supabase
    .from("tag_values")
    .select("tag_id, value")
    .eq("user_id", userId);
  if (error) return error;

  return data;
};

export const getRandomSights = async (amount, userId) => {
  // gettar random sights
  const data = await getWithFilter(amount, userId);

  // gettar varje sights resterande info
  const splicedData = data.splice(0, amount);
  return await Promise.all(
    splicedData.map(
      async ({
        sight_id,
        name,
        short_info,
        long_info,
        price,
        main_tag_id,
        address_id,
        number_of_img,
        short_price,
      }) => {
        const images = [];
        const open_hours = await getOpenHours(sight_id);
        const location = await getLocation(address_id);
        const sub_tags = await getSubTags(sight_id);

        // lägger till img paths
        for (let i = 1; i <= number_of_img; i++)
          images.push(BASE_IMG_URL + "sights/" + sight_id + "/" + i + ".jpg");

        // return ?json obj? med massa info för varje sight
        return {
          sight_id,
          name,
          short_info,
          long_info,
          price,
          main_tag_id,
          address_id,
          images,
          short_price,
          open_hours,
          location,
          sub_tags,
        };
      }
    )
  );
};

// adjusting filter values for filter
export let filter = {
  outdoor: false,
  indoor: false,
  free: false,
  random: false,
};
export const updateFilter = async (newBoost) => {
  filter.outdoor = newBoost.outdoor;
  filter.indoor = newBoost.indoor;
  filter.free = newBoost.free;
  filter.random = newBoost.random;
};

// filtering the get with ugly if else spaghetti nest
export const getWithFilter = async (amount, userId) => {
  console.log("filter settings!!!");
  console.log("booooooost outdoor " + filter.outdoor);
  console.log("booooooost indoor " + filter.indoor);
  console.log("booooooost free " + filter.free);
  console.log("booooooost random " + filter.random);

  const indoor = "c9eaa966-a8ee-41ca-be9e-4480a368a705";
  const outdoor = "06bce9f7-14fc-4f55-a87b-7748ca990aa6";

  if (filter.indoor) {
    if (filter.free) {
      const { data, error } = await supabase.rpc("random_sights_out_in_free", {
        amount: amount,
        tag: "c9eaa966-a8ee-41ca-be9e-4480a368a705",
        usr: userId,
      }); // query indoor+free
      return data;
    }

    const { data, error } = await supabase.rpc("random_sights_out_in", {
      amount: amount,
      tag: indoor,
      usr: userId,
    }); // query indoor
    return data;
  }

  if (filter.outdoor) {
    if (filter.free) {
      const { data, error } = await supabase.rpc("random_sights_out_in_free", {
        amount: amount,
        tag: "06bce9f7-14fc-4f55-a87b-7748ca990aa6",
        usr: userId,
      }); // query outdoor+free
      return data;
    }

    const { data, error } = await supabase.rpc("random_sights_out_in", {
      amount: amount,
      tag: outdoor,
      usr: userId,
    }); // query outdoor
    return data;
  }

  if (filter.free) {
    const { data, error } = await supabase.rpc("random_sights_free", {
      amount: amount,
      usr: userId,
    });
    return data;
  }

  const { data, error } = await supabase.rpc("random_sights", {
    amount: amount,
    usr: userId,
  });
  if (error) return error;
  return data;
};

export const removeLikes = async (userId, sightIds) => {
  await supabase
    .from("liked_sights")
    .delete()
    .eq("user_id", userId)
    .in("sight_id", sightIds);
};
