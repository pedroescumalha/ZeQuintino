import { Router } from "express";

export interface ICreateController {
    CreateRouter(): Router;
}