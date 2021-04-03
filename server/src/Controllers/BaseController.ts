import { IRouter } from "express";
import { inject, injectable } from "inversify";
import { IDatabaseClientAsync } from "src/Abstractions/IDatabaseClientAsync";
import { Symbols } from "../Constants/constants";

@injectable()
export abstract class BaseController
{
    router!: IRouter;
    
    basePath!: string;

    dbClient: IDatabaseClientAsync

    constructor(@inject(Symbols.Router) router:IRouter,  @inject(Symbols.DbClient) dbClient:IDatabaseClientAsync) 
    {
        this.router = router;
        this.dbClient = dbClient;
    }
}