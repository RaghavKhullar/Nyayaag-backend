import express from "express";
import database from "./api/utils/db";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const session=require("express-session");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MongoDBStore = require('connect-mongodb-session')(session);
import { Request } from "express";
import UserRoute from "./api/routes/UserRoute";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false })); // get data from the forms from frontend z >>

declare module 'express-session' {
  export interface Session {
    user: string;
  }
}
// app.use( (req, res, next)=> {
 
//     req.session.user= "Manav"
  
// }),
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

app.get('/', (req:Request,res,next) => {
 
  
  req.session.save(err => {
      if(err){
          console.log(err);
      } else {
        console.log(req.session)
          res.send(req.session)
      }
  });
})

app.use("/auth", UserRoute);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
