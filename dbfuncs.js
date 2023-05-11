import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export const supabase = createClient(process.env.DB_URL, process.env.API_KEY);

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

  // set default tag values for new user
  await setDefaultValues(data[0].user_id);
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

export const getUserById = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select("username, user_id, password")
    .eq("user_id", userId);
  if (error) return { error: error };
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

export const getSightAddress = async (addressId) => {
  const { data, error } = await supabase
    .from("addresses")
    .select()
    .eq("address_id", addressId);
  return data ? data[0] : { street: "", zip: "", city: "" };
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
    .select(
      "user_id, liked_at, sights (sight_id, name, number_of_img, addresses (location))"
    )
    .order("liked_at", { ascending: sort === "old" })
    .eq("user_id", userId)
    .range(page * 10, page * 10 + 9);

  if (error) return error;

  return data;
};

export const getFullInfo = async (sightId, onlyLong) => {
  if (sightId != "placeholder_id") {
    // commented version doesnt work on sights that are missing in the opening hours table
    // const {data, error} = await supabase.from('open_hours').select('sights ( long_info )').eq('sight_id', sightId)
    const { data, error } = await supabase
      .from("sights")
      .select("long_info, price, address_id")
      .eq("sight_id", sightId);
    const open_hours = await getOpenHours(sightId);
    console.log("address_id ", data[0].address_id);
    const address = await getSightAddress(data[0].address_id);
    console.log("address ", address);
    if (error) return error;

    return [data, open_hours, address];
  }
  return [[{}], {}, {}];
};

export const addLikes = async (userId, sightId) => {
  if (sightId != "placeholder_id") {
    const { data, error } = await supabase
      .from("liked_sights")
      .insert([{ user_id: userId, sight_id: sightId }]);
    if (error) return error;

    return { sightId };
  }
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
export const updateFilter = async (newBoost, userId) => {
  const { error } = await supabase
    .from("user_filters")
    .update({
      outdoor: newBoost.outdoor,
      indoor: newBoost.indoor,
      free: newBoost.free,
      random: newBoost.random,
    })
    .eq("user_id", userId);
};

export const getFilters = async (userId) => {
  const { data: filters, error } = await supabase
    .from("user_filters")
    .select()
    .eq("user_id", userId);
  return filters[0];
};

// filtering the get with ugly if else spaghetti nest
export const getWithFilter = async (amount, userId) => {
  const indoor = "c9eaa966-a8ee-41ca-be9e-4480a368a705";
  const outdoor = "06bce9f7-14fc-4f55-a87b-7748ca990aa6";

  const { data: filters, error: filterError } = await supabase
    .from("user_filters")
    .select()
    .eq("user_id", userId);
  console.log("user: ", userId);
  console.log("filters: ", filters);

  if (filters[0].indoor) {
    if (filters[0].free) {
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

  if (filters[0].outdoor) {
    if (filters[0].free) {
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

  if (filters[0].free) {
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

export const addDislikes = async (userId, sightId) => {
  if (sightId != "placeholder_id") {
    const { data: disliked_sights, error } = await supabase
      .from("disliked_sights")
      .select("*")
      .eq("user_id", userId)
      .eq("sight_id", sightId);

    if (error) return error;

    if (disliked_sights.length === 0) {
      const { data: ttl, ttlError } = await supabase.rpc("time_to_live", {
        days: "5 days",
      });

      if (ttlError) return ttlError;

      const { data, error } = await supabase.from("disliked_sights").insert([
        {
          user_id: userId,
          sight_id: sightId,
          time_to_live: ttl,
          times_disliked: 1,
        },
      ]);

      if (error) return error;
    } else {
      const { data: ttl, ttlError } = await supabase.rpc("time_to_live", {
        days: "5 days",
      });
      const { error } = await supabase
        .from("disliked_sights")
        .update({
          time_to_live: ttl,
          times_disliked: disliked_sights[0].times_disliked + 1,
        })
        .eq("user_id", userId)
        .eq("sight_id", sightId);
    }
  }
};

export const updateTags = async (userId, sightId, liked) => {
  if (sightId != "placeholder_id") {
    // fetch tag val
    const tagValues = await getTagValue(userId);
    const tags = {};
    tagValues.forEach(({ tag_id, value }) =>
      Object.assign(tags, { [tag_id]: value })
    );
    var updatedValues = [];

    // fetch sight tags
    const subTags = await getSubTags(sightId);

    // get main tag (sight)
    const {
      data: [{ main_tag_id: mainTag }],
    } = await supabase
      .from("sights")
      .select("main_tag_id")
      .eq("sight_id", sightId);

    // update main tag value separately for easier future changing
    let value = tags[mainTag] * 0.9 + (liked ? 0.1 : 0);
    updatedValues.push({ tag_id: mainTag, user_id: userId, value });

    // update sub-tag values
    subTags.forEach(({ tag_id }) => {
      // if we like it, move 10% closer to 1, if we dislike move 10% closer to 0
      value = tags[tag_id] * 0.9 + (liked ? 0.1 : 0);
      updatedValues.push({ tag_id, user_id: userId, value });
    });

    // push to db
    const { error } = await supabase.from("tag_values").upsert(updatedValues);
    if (error) console.log(error);
  }
};

const setDefaultValues = async (user_id) => {
  // getta tags
  const { data, error } = await supabase.from("tags").select("tag_id");

  if (error) console.log(error);

  // skicka tags med 0.5 val
  const { error: insError } = await supabase.from("tag_values").insert(
    data.map(({ tag_id }) => {
      return { tag_id, user_id, value: 0.5 };
    })
  );

  const { error: filterError } = await supabase
    .from("user_filters")
    .insert({ user_id });

  if (insError) console.log(insError);

  if (filterError) console.log(filterError);
};

export const getAllData = async () => {
  const allSights = await supabase
    .from("sights")
    .select("*, addresses (*), sub_tag (*), open_hours (*)");
  const data = allSights.data.map(
    ({
      sight_id,
      name,
      short_info,
      long_info,
      price,
      main_tag_id,
      address_id,
      number_of_img,
      short_price,
      addresses,
      sub_tag,
      open_hours,
    }) => {
      const images = [];
      for (let i = 1; i <= number_of_img; i++)
        images.push(BASE_IMG_URL + "sights/" + sight_id + "/" + i + ".jpg");

      const location = addresses.location;

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
        sub_tag,
      };
    }
  );
  return data;
};

export const getLikesDislikes = async (userId) => {
  const { data: liked, error: likedError } = await supabase
    .from("liked_sights")
    .select("sight_id")
    .eq("user_id", userId);

  const { data: disliked, error: dislikedError } = await supabase
    .from("disliked_sights")
    .select("sight_id, time_to_live")
    .eq("user_id", userId);

  return { liked: liked, disliked: disliked };
};
