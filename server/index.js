import cors from 'cors';
import express from 'express';

const app = express()
const port = 4000

import {getFullInfo, getItems, getLikes, getUser, addLikes, supabase} from './dbfuncs.js'

app.use(cors())

app.use(express.json())

app.get('/charlie', (req, res) => {
  res.send('<img src="https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/charlie.jpg" style="width:100%"/>')
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

app.post('/tags', async (req, res) => {
  console.log(req.body)
  res.status(200).send()
})

app.get('/likes', async (req, res) => {
  let userId = req.query.userId
  let page = req.query.page || 0
  let filter = req.query.filter || 'none'
  let sort = req.query.sort || 'new'

  console.log("yes")

  res.send(await getLikes(userId, page, filter, sort))
})

app.post('/addlikes', async (req, res) => {
  const { userId, sightId } = req.body

  const data = await addLikes(userId, sightId)
  res.send(data)
})

app.delete('/likes', (req, res) => {
  console.log(req.body)

  res.status(204).send()
 })
 
app.get('/getuser', async(req,res) => {
  const userId = req.query.userid
  const user = await getUser(userId)
  res.send(user)
})


app.get('/info', async(req, res) => {
  const sightId = req.query.sightId
  const onlyLong = req.query.onlyLong
  
  res.send(await getFullInfo(sightId ,onlyLong))
})

app.listen(port, () => {
  console.log(`Express server is listening on port: ${port}`)
})