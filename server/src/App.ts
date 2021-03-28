import express from "express";
import bodyParser from "body-parser";
import { IPostsController } from "./Abstractions/Controller/IPostsController";
import { IApp } from "./Abstractions/IApp";

export class App implements IApp
{
    PostController: IPostsController;
    
    constructor(postController: IPostsController) 
    {
        this.PostController = postController;
    }

    public init()
    {
        const app = express();
        app.use(bodyParser.json());
        app.use(this.PostController.basePath, this.PostController.CreateRouter());
        app.listen(4000, () => console.log('server started on localhost:4000'));
    }
}