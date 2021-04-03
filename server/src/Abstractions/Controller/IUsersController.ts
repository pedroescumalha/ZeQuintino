import { IController } from "./IController";

export interface IUsersController extends IController
{
    HashPassword(password: string): Promise<string>;

    VerifyPassword(hashedPassword:string, password: string): Promise<boolean>;

    Register(): IUsersController;

    Login(): IUsersController;
}