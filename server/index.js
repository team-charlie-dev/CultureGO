import cors from 'cors';
import express from 'express';
// import { createClient } from '@supabase/supabase-js'
const app = express()
const port = 4000

import {getItems, supabase} from './dbfuncs.js'


app.use(cors())

// const supabase = createClient(process.env.DB_URL,process.env.API_KEY);


app.get('/charlie', (req, res) => {
  res.send('<img src="https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/charlie.jpg" style="width:100%">')
})

app.get('/', (req, res) => {

  res.send('This is the home page')
})

app.get('/testDB', async (req, res) => {
  const data = await supabase
        .from('testtable')
        .select()
    res.send(data);
})

app.get('/helloworld', (req, res) => {
  res.json('Hello World!')
})

//api routes
/*
    Login -> post/authenticate
    Skapa konto -> post/createacount
    swipe info -> post/swipe
                -> get/getitem?amount=x
    Hämta userinfo -> get/userinfo
    Ändra userinfo -> post/userinfo
    Ta bort användare -> delete/userinfo
    Hämta likes -> get/likes?page=x&filter=visited/unvisited/none&sort=old/new      (HTTP 204 skickas tillbaka om det är slut på kort)
*/

app.get('/getitem', async (req, res) => { 
  const amount = parseInt(req.query.amount) || 1

  res.send(await getItems(amount, null))
})

app.listen(port, () => {
  console.log(`Express server is listening on port: ${port}`)
})