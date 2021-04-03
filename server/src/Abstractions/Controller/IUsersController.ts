import { IController } from "./IController";
import { IDelete } from "./IDelete";
import { IGet } from "./IGet";
import { IPost } from "./IPost";
import { IPut } from "./IPut";

export interface IUsersController extends IController, IGet<IUsersController>, IPost<IUsersController>, IDelete<IUsersController>, IPut<IUsersController>
{
    HashPassword(password: string): Promise<string>;

    VerifyPassword(hashedPassword:string, password: string): Promise<boolean>;

    Register(): IUsersController;

    Login(): IUsersController;

    Logout(): IUsersController;

    GetCurrentUser(): IUsersController;
}