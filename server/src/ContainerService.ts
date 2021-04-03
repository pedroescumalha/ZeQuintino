import { Connection, EntityManager, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import express, { IRouter } from "express";
import { Container } from "inversify";
import { IPostsController } from "./Abstractions/Controller/IPostsController";
import { IUsersController } from "./Abstractions/Controller/IUsersController";
import { IApp } from "./Abstractions/IApp";
import { IDatabaseClientAsync } from "./Abstractions/IDatabaseClientAsync";
import { App } from "./App";
import { DatabaseClientAsync } from "./Clients/DatabaseClientAsync";
import { Symbols } from "./Constants/constants";
import PostsController from "./Controllers/PostsController";
import UsersController from "./Controllers/UsersController";
import microConfig from './mikro-orm.config';

export class ContainerService
{
    async RegisterORM(container: Container): Promise<void>
    {
        const orm = await MikroORM.init(microConfig);
        await orm.getMigrator().up();
        container.bind<EntityManager<IDatabaseDriver<Connection>>>(Symbols.ORM).toConstantValue(orm.em);
    }
    
    RegisterRouter(container: Container): void
    {
        container.bind<IRouter>(Symbols.Router).toConstantValue(express.Router());
    }

    RegisterApp(container: Container): void
    {
        container.bind<IApp>(Symbols.App).to(App);
    }

    RegisterDependencies(container: Container): void
    {
        container.bind<IPostsController>(Symbols.PostsController).to(PostsController);
        container.bind<IUsersController>(Symbols.UsersController).to(UsersController);
        container.bind<IDatabaseClientAsync>(Symbols.DbClient).to(DatabaseClientAsync);
    }
}