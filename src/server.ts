import app from "./app";
import dotenv from "dotenv";
// import configuration from "./config/config";
import mongodbConnect from "./config/db"
import logger from './utils/logger'

dotenv.config();
mongodbConnect();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  logger.info(`<<<<<< -- Auth Service running on port ${PORT} -- >>>>>>`);
});
