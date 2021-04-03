import express from "express";
import bodyParser from "body-parser";
import { IPostsController } from "./Abstractions/Controller/IPostsController";
import { Express } from 'express-serve-static-core';
import { IApp } from "./Abstractions/IApp";
import { Routes } from "./Constants/Routes";
import { inject, injectable } from "inversify";
import { Symbols } from "./Constants/constants";
import { IUsersController } from "./Abstractions/Controller/IUsersController";

@injectable()
export class App implements IApp
{    
    constructor(
        @inject(Symbols.PostsController) postController: IPostsController,
        @inject(Symbols.UsersController) usersController: IUsersController
    ) 
    {
        this.PostController = postController;
        this.UsersController = usersController;
        this.Server = express();
    }

    PostController: IPostsController;
    Server: Express;
    UsersController: IUsersController;

    public init()
    {
        this.Server.use(bodyParser.json());
        this.Server.use(Routes.V1.Base, this.PostController.CreateRouter());
        this.Server.use(Routes.V1.Base, this.UsersController.CreateRouter());
        this.Server.listen(4000, () => console.log('server started on localhost:4000'));
    }
}