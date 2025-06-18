export interface iUser{
    _id?:string,
    firstName:string,
    lastName?:string,
    email: string,
    phone?: string
    password: string,
    role?:string,
    refreshToken?: string

}