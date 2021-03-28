import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { IRouter } from "express";

export abstract class BaseController
{
    router!: IRouter;
    
    basePath!: string;

    dbClient: EntityManager<IDatabaseDriver<Connection>>

    constructor(path: string, router:IRouter,  dbClient:EntityManager<IDatabaseDriver<Connection>>) 
    {
        this.basePath = path;
        this.router = router;
        this.dbClient = dbClient;
    }
}