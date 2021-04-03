import express from "express";
import bodyParser from "body-parser";
import { IPostsController } from "./Abstractions/Controller/IPostsController";
import { Express } from 'express-serve-static-core';
import { IApp } from "./Abstractions/IApp";
import { Routes } from "./Constants/Routes";
import { inject, injectable } from "inversify";
import { IsProdEnvironment, Symbols } from "./Constants/constants";
import { IUsersController } from "./Abstractions/Controller/IUsersController";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

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

        const RedisStore = connectRedis(session);
        const redisClient = redis.createClient();
        this.Server.use(session({
            name: "qid",
            store: new RedisStore({ 
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax", // csrf
                secure: IsProdEnvironment,
            },
            saveUninitialized: false,
            secret: "qwfqebefwfqfqfqefeg",
            resave: false,
        }));

        this.Server.use(Routes.V1.Base, this.PostController.CreateRouter());
        this.Server.use(Routes.V1.Base, this.UsersController.CreateRouter());
        this.Server.listen(4000, () => console.log('server started on localhost:4000'));
    }
}