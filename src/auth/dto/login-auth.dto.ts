import { IsEmail,IsNotEmpty,IsString } from "class-validator";


export class login {
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string
}
