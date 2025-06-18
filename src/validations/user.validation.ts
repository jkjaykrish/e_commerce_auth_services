import { z } from "zod";

export const createUserValidation= z.object({
    body:z.object({
        firstName:z.string().min(3,`Name must be at least 3 characters long`),
        lastName:z.string(),
        email:z.string().min(4,"Email must be at least 4 characters long "),
        password:z.string().min(8,"Password should be 8 characters long"),
        phone:z.string().min(10,"Phone number must be 10 digt number"),
        role:z.enum(["staff","admin","manager"])
    })
})
export type CreateUserInput = z.infer<typeof createUserValidation>['body'];