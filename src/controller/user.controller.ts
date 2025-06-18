import { registerUser } from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import { iUser } from "../interfaces/user.interface";
import { StatusCodes } from "http-status-codes";
import { Document } from "mongoose";
type UserDocument = iUser & Document;
export const registerUser_Controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
try {
    const userData: iUser = req.body;
    const createdUser = await registerUser(userData);

    // Convert Mongoose document to a plain object
   const userObject = (createdUser as UserDocument).toObject();
    
    // Remove sensitive password field
    delete userObject.password;

     res.status(StatusCodes.CREATED).json({
        error: false,
        message: "success",
        results: userObject,
    });
} catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unexpected error";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`register user error: ${errorMsg}`);
    next(error); 
}
  }

