import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

export const supabase = createClient(process.env.DB_URL,process.env.API_KEY);

const BASE_IMG_URL = 'https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/'

export const getItems = async (amount, user) => {
  const { data, error } = await supabase.from('sights').select() // TODO hämta enbart det man inte har sett
  if (error) return error

  // TODO fixa så att den väljer annorlunda varje gång
  const splicedData = data.splice(0, amount)
  return await Promise.all(splicedData.map(async ({sight_id, name, short_info, long_info, price, main_tag_id, address_id, number_of_img, short_price}) => {
    const images = []
    const open_hours = await getOpenHours(sight_id)

    for (let i = 1; i <= number_of_img; i++)
      images.push(BASE_IMG_URL + 'sights/' + sight_id + '/' + i + '.jpg')

    return {sight_id, name, short_info, long_info, price, main_tag_id, address_id, images, short_price, open_hours}
  }))
}

export const getOpenHours = async (sightId) => {
  const {data, error} = await supabase.from('open_hours').select().eq('sight_id', sightId)
  return data[0]
}


export const getLikes = async (userId, page, filter, sort) => {
  const { data, error } = await supabase
    .from('liked_sights')
    .select('user_id, liked_at, sights (sight_id, name)')
    .order('liked_at', { ascending: sort === "old" })
    .eq('user_id', 'cfb5b9bd-ece8-470e-89c0-8ac52122652a')
    .range(page * 10, page * 10 + 9)
    
  if (error) return error

  console.log("working")

  console.log(data)

  return data
}

export const getUser = async (userId) => {
  const { data, error } = await supabase.from('users').select('username, user_id').eq('user_id', userId)
  if (error) return error

  return data[0]
}

export const addLikes = async (userId, sightId) => {
  const { data, error } = await supabase.from('liked_sights').insert([{user_id: userId, sight_id: sightId}])
  if (error) return error

  return {sightId}
}
