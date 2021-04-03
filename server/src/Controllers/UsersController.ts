import { injectable } from "inversify";
import { Routes } from "../Constants/Routes";
import { IUsersController } from "../Abstractions/Controller/IUsersController";
import { BaseController } from "./BaseController";
import { User } from "../Entities/User";
import argon2 from "argon2";

@injectable()
export default class UsersController extends BaseController implements IUsersController
{
    basePath = Routes.V1.Users;

    public HashPassword = async (password: string): Promise<string> => await argon2.hash(password);

    public VerifyPassword = async (hashedPassword:string, password: string): Promise<boolean> => await argon2.verify(hashedPassword, password);

    public Login(): IUsersController 
    {
        this.router.get(this.basePath, async (req, res) => {
            try 
            {
                var user = await this.dbClient.GetEntryAsync(User, { username: req.body.username} );

                if (user != null && await this.VerifyPassword(user.password, req.body.password))
                {
                    res.sendStatus(200);
                }
                else
                {
                    res.status(403).send("incorrect password or username.");
                }
            }
            catch (error) 
            {
                res.status(500).send(error.message);
            }
        });

        return this;
    }

    public Register(): IUsersController 
    {
        this.router.post(this.basePath, async (req, res) => {
            try 
            {
                const hashedPassword = await this.HashPassword(req.body.password);
                const user = await this.dbClient.PostEntryAsync(User, { username: req.body.username, password: hashedPassword });
                res.status(201).send(user);                    
            } 
            catch (error)
            {
                if (error.code === "23505")
                {
                    res.status(409).send("Username already taken.");
                }
                else
                {
                    res.status(500).send(error.message);
                }
            }
        });

        return this;
    }

    CreateRouter = () => this.Register().Login().router;
}