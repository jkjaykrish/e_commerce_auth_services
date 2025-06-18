// const mongoose = require("mongoose");
// const config=require('../config/config')
// import mongoose from 'mongoose'
// import configuration from "./config";

// const connectDB = async () : Promise<void> => {
//     try {
//         await mongoose.connect(configuration.mongoose.url,
//             configuration.mongoose.options

//         );
//         console.log("<<<<<< -- MongoDB Connected -- >>>>>>");
//     } catch (error) {
//         console.error(`<<<<<< XX MongoDB Connection Failed: , ${error} XX >>>>>>`);
//         process.exit(1);
//     }
// };

// // module.exports = connectDB;
// export default connectDB;
// src/config/db.ts
import mongoose from "mongoose";
import logger from "../utils/logger";
import configuration from "./config";
const connectDB = async (): Promise<void> => {
  const mongoUri = configuration.mongoose.url;

  if (!mongoUri) {
    logger.error("MONGO_URI is not defined in environment variables.");
    process.exit(1); // Exit if DB URI is missing
  }

  try {
    await mongoose.connect(mongoUri, configuration.mongoose.options);
    logger.info("<<<<<<-- MongoDB Connected... ->>>>>>");
  } catch (err: any) {
    logger.error(`MongoDB connection error: ${err.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
