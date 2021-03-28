import { IRouter } from "express";
import { IDatabaseClientAsync } from "src/Abstractions/IDatabaseClientAsync";
import { IDatabaseEntity } from "src/Abstractions/IDatabaseEntity";

export abstract class BaseController<T extends IDatabaseEntity>
{
    router!: IRouter;
    
    basePath!: string;

    dbClient: IDatabaseClientAsync<T>

    constructor(router:IRouter,  dbClient:IDatabaseClientAsync<T>) 
    {
        this.router = router;
        this.dbClient = dbClient;
    }
}