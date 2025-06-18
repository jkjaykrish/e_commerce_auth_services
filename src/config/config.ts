import dotenv from "dotenv";
import path, { extname } from "path";
import Joi from "joi";

dotenv.config();
const basePath = path.join(__dirname, "../../.env.development");
const baseEnv = dotenv.config({ path: basePath });
// Step 2: Now process.env.NODE_ENV is available
const env = process.env.NODE_ENV; // e.g. "development.local"
if (env) {
  const envPath = path.join(__dirname, `../../.env.${env || "development"}`);
  const envFile = dotenv.config({ path: envPath });
} else {
  console.error(
    " NODE_ENV is still undefined. Check if it's in the .env file"
  );
}
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().default(3000),
  MONGODB_URL: Joi.string().required().description("Mongo DB URL"),
  JWT_SECRET: Joi.string(),
  JWT_EXPIRES_IN: Joi.string(),
  REFRESH_TOKEN_SECRET: Joi.string(),
  REFRESH_TOKEN_EXPIRES_IN: Joi.string(),
}).unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config Validation Error: ${error.message}`);
}

// console.log("Before dotenv.config, process.env.MONGODB_URL:", process.env.MONGODB_URL);

interface MongooseConfig {
  url: string;
  options: {
    dbName: string;
    serverSelectionTimeoutMS: number;
  };
}

interface Config {
  env: string;
  port: number;
  mongoose: MongooseConfig;
  jwt_secret?: string;
  jwt_expires?: string;
  refresh_secret?: string;
  refresh_expires?: string;
}

const configuration: Config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
 mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      dbName: envVars.DBNAME,  // ✅ Optional valid option
      serverSelectionTimeoutMS: 5000, // ✅ Valid
      // No need for useNewUrlParser or useUnifiedTopology
    },
  },
  jwt_secret: envVars.JWT_SECRET,
  jwt_expires: envVars.JWT_EXPIRES_IN,
  refresh_secret: envVars.REFRESH_TOKEN_SECRET,
  refresh_expires: envVars.REFRESH_TOKEN_EXPIRES_IN,
};

export default configuration;
