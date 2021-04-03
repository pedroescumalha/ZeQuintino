import express from "express";
import bodyParser from "body-parser";
import { IPostsController } from "./Abstractions/Controller/IPostsController";
import { Express } from 'express-serve-static-core';

import { IApp } from "./Abstractions/IApp";
import { Routes } from "./Constants/Routes";

export class App implements IApp
{
    PostController: IPostsController;
    Server: Express;
    
    constructor(postController: IPostsController) 
    {
        this.PostController = postController;
        this.Server = express();
    }

    public init()
    {
        this.Server.use(bodyParser.json());
        this.Server.use(Routes.V1.Base, this.PostController.CreateRouter());
        this.Server.listen(4000, () => console.log('server started on localhost:4000'));
    }
}