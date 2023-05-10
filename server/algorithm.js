import { getFilters, getLikes, getTagValue } from "./dbfuncs.js";

const placeHolderSight = {
    sight_id: "placeholder_id",
    name: "SLUT",
    short_info: "Du har swipat på alla sights, fler kommer snart",
    long_info: "Du har swipat på alla sights, fler kommer snart",
    price: "Gratis",
    main_tag_id: "123",
    address_id: "123",
    images: ["https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/charlie.jpg"],
    short_price: "Gratis",
    open_hours: [],
    location: "Stockholm",
    sub_tag: []
}

var sentSights = {}

//Hashtable, used for retrieving values for tags
class HashTable {
  constructor() {
    this.table = new Array(127);
    this.size = 0;
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.table.length;
  }

  set(key, value) {
    const index = this.hash(key);
    if (this.table[index]) {
      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i][0] === key) {
          this.table[index][i][1] = value;
          return;
        }
      }
      this.table[index].push([key, value]);
    } else {
      this.table[index] = [];
      this.table[index].push([key, value]);
    }
    this.size++;
  }

  get(key) {
    const target = this.hash(key);
    if (this.table[target]) {
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[target][i][0] === key) {
          return this.table[target][i][1];
        }
      }
    }
    return undefined;
  }
}

//Algorithm, finds three highest scores
export const algorithm = async (userId, sights, filters, liked, disliked) => {
  const ht = new HashTable();
  const values = await getTagValue(userId);
  const indoorTagId = "c9eaa966-a8ee-41ca-be9e-4480a368a705";
  const outdoorTagId = "06bce9f7-14fc-4f55-a87b-7748ca990aa6";

  // if we have no record of sending sights to a user
  if (!sentSights[userId])
  {
    Object.assign(sentSights, {[userId]: [undefined, undefined, undefined, undefined, undefined, undefined]}) // init with 5 empty
  }

  // remove sights which appear in sentSights[userId]
  sentSights[userId].forEach(sightId => {
    if (!sightId) return;
    
    let index = sights.findIndex(sight => sight.sight_id == sightId)

    if (index == -1) return; // we didn't find it

    sights.splice(index, 1) // otherwise remove 1 element starting at the found index
  })

  if (filters.indoor || filters.outdoor || filters.free) {
    const newSights = sights.filter((sight) => {
      const sight_id = sight.sight_id;
      let indoor = false;
      let outdoor = false;
      let free = false;

      if (sight.sub_tag.some((item) => item.tag_id === indoorTagId))
        indoor = true;
      if (sight.sub_tag.some((item) => item.tag_id === outdoorTagId))
        outdoor = true;
      if (sight.price === "Gratis")
        free = true;

      if(filters.free && free) {
        if(filters.outdoor && outdoor)
            return true
        if(filters.indoor && indoor)
            return true
        return true
      }

      if (filters.indoor && indoor && !filters.free) return true;

      if (filters.outdoor && outdoor && !filters.free) return true;

      return false;
    });
    sights = newSights;
  }

  const newSights = sights.filter((sight) => {
    if (liked.some((item) => item.sight_id === sight.sight_id)) return false;
    if (
      disliked.some(
        (item) =>
          item.sight_id === sight.sight_id &&
          Date.parse(new Date(item.time_to_live)) > Date.now()
      )
    )
      return false;
    return true;
  });
  sights = newSights;

  //console.log(values)
  for (let i = 0; i < values.length; i++) {
    ht.set(values[i].tag_id, values[i].value);
  }
  // console.log(ht.get('fcde0ef4-3083-4898-821f-2f5a1893a25c'))

  if (filters.random) {
    const index = Math.floor(Math.random() * (sights.length-3))
    return [sights[index], sights[index+1], sights[index+2]]
  } else {
    const similarities = [];
    let similarity = 0;

    for (let i = 0; i < sights.length; i++) {
      for (let j = 0; j < sights[i].sub_tag.length; j++) {
        const tagId = sights[i].sub_tag[j].tag_id;
        const value = ht.get(tagId);
        similarity += value;
      }
      similarity += ht.get(sights[i].main_tag_id) * 1.5;
      similarity = similarity / (sights[i].sub_tag.length + 1);
      similarities.push([sights[i], similarity]);
      similarity = 0;
    }
    
    similarities.sort((a, b) => b[1] - a[1]);

    let send = similarities.slice(0, 3).map(v => v[0])

    sentSights[userId].splice(0, send.length)
    sentSights[userId] = sentSights[userId].concat(send.map(s => s.sight_id))

    // fill with placeholders so it contains at least 3 sights
    for (let i = send.length; i < 3; i++)
    {
      send.push(placeHolderSight)
    }

    return send;
  }
};
