import mongoose from "mongoose";
import "dotenv/config.js";

const password = encodeURIComponent(process.env.PASSWORD);

mongoose
  .connect(
    `${process.env.MONGODB_USER}${password}${process.env.MONGODB_CLUSTER}?retryWrites=true&w=majority`
  )
  .then((value) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });

export default mongoose;
