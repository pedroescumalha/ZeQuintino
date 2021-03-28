import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { IRouter } from "express";
import { ICreateController } from "./ICreateController";
import { IDelete } from "./IDelete";
import { IGet } from "./IGet";
import { IPost } from "./IPost";
import { IPut } from "./IPut";

export interface IPostsController extends ICreateController, IGet<IPostsController>, IPost<IPostsController>, IDelete<IPostsController>, IPut<IPostsController>
{
    router: IRouter;
    
    basePath: string;

    dbClient: EntityManager<IDatabaseDriver<Connection>>;
}