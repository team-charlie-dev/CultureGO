import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
const app = express();
const port = process.env.PORT || 4000;

import {
  getFullInfo,
  getItems,
  getLikes,
  getUser,
  addLikes,
  supabase,
  createUser,
  getSubTags,
  getTagValue,
  getRandomSights,
  updateFilter,
  getWithFilter,
  removeLikes,
  addDislikes,
  updateTags,
  getFilters,
  getAllData
} from "./dbfuncs.js";
import { algorithm } from "./algorithm.js";

// vet inte vad de gör men bra att de finns! låt va kvar
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path);
  //if the request is to signup or signin, we don't need to check for a token
  if (
    req.path === "/signup" ||
    req.path === "/signin" ||
    req.path === "/algorithm"
  ) {
    return next();
  }
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  let decoded;
  try {
    decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return res.status(403).send({
      message: "Token not valid!",
    });
  }
  next();
});

const allSights = await getAllData()


// tar emot username och password från frontend
// krypterar lösenordet
// skapar användare i databasen med username och krypterat lösenord
// om användaren redan finns skickas ett meddelande som säger "user already exists", annars får man tillbaka user_id och username
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPass = bcryptjs.hashSync(password, 8);
  const userData = await createUser(username, hashedPass);

  if (userData.error && userData.error === "User already exists") {
    return res.send({
      message: "Signup unsuccessful",
      error: userData.error,
    });
  }
  const token = jsonwebtoken.sign(
    { id: userData.username },
    process.env.SECRET_KEY,
    {
      expiresIn: 86400, // 24 hours
    }
  );
  const data = {
    message: "Signup successful",
    userData: { ...userData[0], token },
  };
  return res.send(data);
});

// tar emot username och password från frontend
// hämtar användare från databasen med username, användare innehåller user_id, username och krypterat lösenord
// jämför krypterat lösenord med det som skickades från frontend
// om lösenorden matchar skickas ett meddelande som säger "Login successful" och användarens user_id och username
// om lösenorden inte matchar skickas ett meddelande som säger "Login unsuccessful" och ett felmeddelande
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);
  if (user.error) {
    return res.send({
      message: "Login unsuccessful",
      error: user.error,
    });
  }
  const isPasswordValid = bcryptjs.compareSync(password, user.password);
  const data = {
    message: "Login unsuccessful",
  };
  if (isPasswordValid) {
    const token = jsonwebtoken.sign(
      { id: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: 86400, // 24 hours
      }
    );
    data.message = "Login successful";
    data.userData = { user_id: user.user_id, username: user.username, token };
    return res.send(data);
  }
  data.error = "Password incorrect";
  res.send(data);
});

app.get("/validatetoken", async (req, res) => {
  return res.send({ message: "Token valid" });
});

app.get("/charlie", (req, res) => {
  res.send(
    '<img src="https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/charlie.jpg" style="width:100%"/>'
  );
});

app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.get("/testDB", async (req, res) => {
  const data = await supabase.from("testtable").select();
  res.send(data);
});

app.get("/helloworld", (req, res) => {
  res.send("Hello World!");
});

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

app.get("/getitem", async (req, res) => {
  const amount = parseInt(req.query.amount) || 1;
  res.send(await getItems(amount, null));
});

app.post("/tags", async (req, res) => {
  await updateFilter(req.body, req.query.userId);
  res.status(200).send();
});

app.get("/getfilters", async (req, res) => {
  res.send(await getFilters(req.query.userId));
});

app.get("/likes", async (req, res) => {
  let userId = req.query.userId;
  let page = req.query.page || 0;
  let filter = req.query.filter || "none";
  let sort = req.query.sort || "new";

  res.send(await getLikes(userId, page, filter, sort));
});

app.post("/addlikes", async (req, res) => {
  const { userId, sightId } = req.body;

  const data = await addLikes(userId, sightId);
  res.send(data);
});

app.delete("/likes", async (req, res) => {
  let userId = req.query.userId;

  await removeLikes(userId, req.body);

  res.status(204).send();
});

app.post("/swipe", async (req, res) => {
  let userId = req.body.userId;
  let sightId = req.body.sightId;
  let liked = req.body.liked;

  if (liked) {
    await addLikes(userId, sightId);
  } else {
    await addDislikes(userId, sightId);
  }

  await updateTags(userId, sightId, liked);

  res.status(204).send();
});

app.get("/getuser", async (req, res) => {
  const userId = req.query.userid;
  const user = await getUser(userId);
  res.send(user);
});

app.get("/info", async (req, res) => {
  const sightId = req.query.sightId;
  const onlyLong = req.query.onlyLong;

  res.send(await getFullInfo(sightId, onlyLong));
});

app.get("/subtag", async (req, res) => {
  const sightId = req.query.sightId;

  res.send(await getSubTags(sightId));
});

app.get("/tagvalues", async (req, res) => {
  //const userID = req.query.userID;
  const tagId = req.query.tagId;

  res.send(await getTagValue("cfb5b9bd-ece8-470e-89c0-8ac52122652a", tagId));
});

app.get("/algorithm", async (req, res) => {
  // tar fram userID
  const userID = req.query.userID;

  // gettar sights och massa info om dom
  //const sights = await getRandomSights(100, userID);

  const filters = await getFilters(userID);
  // skickar tillbaka 3 random sights
  if (filters.random) res.send([allSights[0], allSights[1], allSights[2], allSights[3]]);
  // kallar algon med random sights och usrID
  else res.send(await algorithm(userID, allSights, filters));
});

app.get("/random", async (req, res) => {
  res.send(await getRandomSights());
});

app.listen(port, () => {
  console.log(`Express server is listening on port: ${port}`);
});

app.get("/filter", async (req, res) => {
  res.send(await getWithFilter(30, "83cebddf-ed75-4069-bbcf-3d198416b354"));
});
