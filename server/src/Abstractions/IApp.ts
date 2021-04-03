import { IPostsController } from "./Controller/IPostsController";
import { Express } from 'express-serve-static-core';

export interface IApp
{
    PostController: IPostsController;

    init(): void;
    Server: Express;
}