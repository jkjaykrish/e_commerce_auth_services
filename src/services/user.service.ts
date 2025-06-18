import { User } from "../model";
import { iUser } from "../interfaces/user.interface";
// import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import {
  ConflictError,
  InternalServerError,
  BadRequestError,
} from "../utils/error";
import logger from "../utils/logger";

// --- register user---

export const registerUser = async (data: Partial<iUser>): Promise<iUser> => {
  logger.info(`Attempting to register user with email: ${data.email}`);

  // 1. Check if user already exists
  const userExist = await User.findOne({ email: data.email });
  if (userExist) {
    logger.warn(
      `Registration failed: User with email ${data.email} already exists.`
    );
    throw new ConflictError("User with this email already exists.");
  }

  // 2. Hash the password
  if (!data.password) {
    // This should ideally be caught by validation middleware before reaching here
    throw new BadRequestError("Password is required for registration.");
  }
  const hashPassword = await bcrypt.hash(data.password, 10);
  // logger.debug(`Hashed password for ${data.email}`); // Avoid logging sensitive data in production

  // 3. Create new user instance with hashed password
  const newUser = new User({ ...data, password: hashPassword });

  // 4. Save the user to the database
  try {
    const createdUser = await newUser.save();
    logger.info(`User registered successfully: ${createdUser.email}`);
    // Return the successfully created user document
    return createdUser;
  } catch (error: any) {
    // Log the specific database error for debugging purposes
    logger.error(
      `Database save error during user registration: ${error.message}`,
      { stack: error.stack }
    );
    // Throw a generic internal server error for unexpected database issues
    throw new InternalServerError(
      "Failed to register user due to an internal server issue."
    );
  }
};
