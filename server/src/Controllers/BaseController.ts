import { IRouter } from "express";
import { IDatabaseClientAsync } from "src/Abstractions/IDatabaseClientAsync";

export abstract class BaseController
{
    router!: IRouter;
    
    basePath!: string;

    dbClient: IDatabaseClientAsync

    constructor(router:IRouter,  dbClient:IDatabaseClientAsync) 
    {
        this.router = router;
        this.dbClient = dbClient;
    }
}