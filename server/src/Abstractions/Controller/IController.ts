import { IRouter } from "express";
import { IDatabaseClientAsync } from "../IDatabaseClientAsync";

export interface IController
{
    router: IRouter;
    
    basePath: string;

    dbClient: IDatabaseClientAsync;

    CreateRouter(): IRouter;
}