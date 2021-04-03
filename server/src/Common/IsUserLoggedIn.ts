import { Request } from "express";

const IsUserLoggedIn = (request: Request): boolean => request.session!.userId != null;

export default IsUserLoggedIn;
