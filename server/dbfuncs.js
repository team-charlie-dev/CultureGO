import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

export const supabase = createClient(process.env.DB_URL,process.env.API_KEY);

const BASE_IMG_URL = 'https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/'

export const getItems = async (amount, user) => {
  const { data, error } = await supabase.from('sights').select() // TODO hämta enbart det man inte har sett
  if (error) return error

  // TODO fixa så att den väljer annorlunda varje gång
  return data.splice(0, amount).map(({sight_id, name, short_info, long_info, price, main_tag_id, address_id, number_of_img}) => {
    const images = []

    for (let i = 1; i <= number_of_img; i++)
      images.push(BASE_IMG_URL + 'sights/' + sight_id + '/' + i + '.jpg')

    return {sight_id, name, short_info, long_info, price, main_tag_id, address_id, images}
  })
}

export const getLikes = async (userId, page, filter, sort) => {
  const { data, error } = await supabase
    .from('liked_sights')
    .select('user_id, liked_at, sights (sight_id, name)')
    .order('liked_at', { ascending: sort === "old" })
  if (error) return error

  console.log("working")

  console.log(data)

  return data.splice(page * 10, 10)
}