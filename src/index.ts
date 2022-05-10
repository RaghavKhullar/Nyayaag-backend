import express from "express";
import database from "./api/utils/db";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const session=require("express-session");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MongoDBStore = require('connect-mongodb-session')(session);
// import { Request } from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false })); // get data from the forms from frontend z >>

declare module 'express-session' {
  export interface Session {
    user: string;
  }
}
app.use(
  session({
    secret: "myNameisRaghav",
    saveUninitialized: true,
    store: new MongoDBStore({
      uri:"mongodb://localhost:27017/nyayaag",
      collection:"session",
    }),
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
  })
);
// app.use(methodOverride("_method"));
database();

import AuthRoute from "./api/routes/AuthRoute"
import ClientRoute from "./api/routes/UserRoute"
import AdvocateRoute from "./api/routes/AdvocateRoute"
import StudentRoute from "./api/routes/StudentsRoute"
// import { ObjectId } from "mongodb";
app.use("/auth", AuthRoute);
app.use("/advocate",AdvocateRoute)
app.use("/clinet",ClientRoute)
app.use("/student",StudentRoute)



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
