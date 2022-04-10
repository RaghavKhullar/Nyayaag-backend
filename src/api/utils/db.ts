import mongoose from "mongoose";

const url = `mongodb://localhost:27017/nyayaag`

mongoose.set("debug", true); // To see mongoose data in the terminal Mongoose : ***
mongoose.Promise.Promise; // To use async functions

export default () => {
    mongoose
        .connect(url)
        .then(() => {
            console.log("Connected to the data base !");
        })
        .catch((err) => {
            console.log(`ERROR!!! : ${err}`);
        })
}

const connection = mongoose.connection;
export { connection };