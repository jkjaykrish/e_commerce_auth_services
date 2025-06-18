import { registerUser_Controller} from "../../controller/user.controller";
import { Router } from "express";
import { validate } from "../../middleware/validationRequest";
import { createUserValidation } from "../../validations/user.validation";

const userRouter=Router();

userRouter.post('/register',validate(createUserValidation),registerUser_Controller )


export default userRouter