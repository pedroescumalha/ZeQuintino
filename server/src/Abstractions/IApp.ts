import { IPostsController } from "./Controller/IPostsController";
import { Express } from 'express-serve-static-core';
import { IUsersController } from "./Controller/IUsersController";

export interface IApp
{
    PostController: IPostsController;

    UsersController: IUsersController;

    init(): void;
    Server: Express;
}