import express from "express";
import session from "express-session";
import database from "./api/utils/db"


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false })) // get data from the forms from frontend z >>

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

database();

import AdvocateRoute from "./api/routes/AdvocateRoute"
import ClientRoute from "./api/routes/ClientRoute"
app.use("/advocate",AdvocateRoute)
app.use("/clinet",ClientRoute)



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
