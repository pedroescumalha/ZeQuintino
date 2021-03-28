import { IPostsController } from "./Controller/IPostsController";

export interface IApp
{
    PostController: IPostsController;

    init(): void;
}