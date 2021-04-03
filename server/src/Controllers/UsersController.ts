import { injectable } from "inversify";
import { Routes } from "../Constants/Routes";
import { IUsersController } from "../Abstractions/Controller/IUsersController";
import { BaseController } from "./BaseController";
import { User } from "../Entities/User";
import argon2 from "argon2";
import IsUserLoggedIn from "../Common/IsUserLoggedIn";

@injectable()
export default class UsersController extends BaseController implements IUsersController
{
    basePath = Routes.V1.Users;

    public HashPassword = async (password: string): Promise<string> => await argon2.hash(password);

    public VerifyPassword = async (hashedPassword:string, password: string): Promise<boolean> => await argon2.verify(hashedPassword, password);

    public Post(): IUsersController 
    {
        this.router.post(this.basePath, async (req, res) => {
            try {
                if (IsUserLoggedIn(req)) {
                    var payload = new User();
                    payload.username = req.body.username;
                    payload.password = await this.HashPassword(req.body.password);
                    var user = await this.dbClient.PostEntryAsync(User, payload);
                    return res.status(201).send(user);
                }

                return res.sendStatus(403);
            } catch (error) {
                return error.code === "23505" ? res.status(409).send("Username already taken.") : res.status(500).send(error.message);
            }
        });

        return this;
    }

    public Update(): IUsersController 
    {
        this.router.put(`${this.basePath}:id`, async (req, res) => {
            try {
                if (IsUserLoggedIn(req)) {
                    let user = await this.dbClient.GetEntryAsync(User, { id: req.params.id} );

                    if (user != null) {
                        user.username = req.body.username;
                        user.password = await this.HashPassword(req.body.password);
                        await this.dbClient.UpdateEntryAsync(user);
                        return res.send(user);
                    }
    
                    return res.status(409).send("User not found");
                }
    
                return res.sendStatus(403);                
            } catch (error) {
                return res.status(500).send(error.message);
            }
        });

        return this;
    }

    public Delete(): IUsersController 
    {
        this.router.delete(`${this.basePath}:id`, async (req, res) => {
            try {
                if (IsUserLoggedIn(req)) {
                    await this.dbClient.DeleteEntryAsync(User, {id: req.params.id});
                    return res.sendStatus(204);
                }

                return res.sendStatus(403);
            } catch (error) {
                return res.status(500).send(error.message);                
            }
        });

        return this;    
    }

    Get(): IUsersController 
    {
        this.router.get(`${this.basePath}:id`, async (req, res) => {
            try 
            {
                if (IsUserLoggedIn(req)) {
                    var user = await this.dbClient.GetEntryAsync(User, { id: req.params.id} );
                    return user != null ? res.send(user) : res.status(404).send("No user found.");
                }

                return res.sendStatus(403);
            }
            catch (error) 
            {
                return res.status(500).send(error.message);
            }
        });

        return this;
    }

    GetAll(): IUsersController 
    {
        this.router.get(`${this.basePath}`, async (req, res) => {
            try 
            {
                if (IsUserLoggedIn(req)) {
                    var users = await this.dbClient.GetAllEntriesAsync(User);
                    return res.send(users);
                }

                return res.sendStatus(403);
            }
            catch (error) 
            {
                return res.status(500).send(error.message);
            }
        });

        return this;
    }
     
    public Login(): IUsersController 
    {
        this.router.post(`${this.basePath}login`, async (req, res) => {
            try 
            {
                var user = await this.dbClient.GetEntryAsync(User, { username: req.body.username} );

                if (user != null && await this.VerifyPassword(user.password, req.body.password))
                {
                    req.session!.userId = user.id;
                    return res.sendStatus(200);
                }

                return res.status(403).send("incorrect password or username.");
            }
            catch (error) 
            {
                return res.status(500).send(error.message);
            }
        });

        return this;
    }

    public Register(): IUsersController 
    {
        this.router.post(`${this.basePath}register`, async (req, res) => {
            try 
            {
                const hashedPassword = await this.HashPassword(req.body.password);
                const user = await this.dbClient.PostEntryAsync(User, { username: req.body.username, password: hashedPassword });
                req.session!.userId = user.id;
                return res.status(201).send(user);                    
            } 
            catch (error)
            {
                return error.code === "23505" ? res.status(409).send("Username already taken.") : res.status(500).send(error.message);
            }
        });

        return this;
    }

    public Logout(): IUsersController
    {
        this.router.post(`${this.basePath}logout`, (req, res) => {
            if(IsUserLoggedIn(req))
            {
                delete req.session!.userId;
                return res.sendStatus(200);
            }
            
            return res.status(403).send("No user is logged in.");
        });

        return this;
    }

    public GetCurrentUser(): IUsersController
    {
        this.router.get(`${this.basePath}currentuser`, async (req, res) => {
            try {
                if (IsUserLoggedIn(req))
                {
                    var user = await this.dbClient.GetEntryAsync(User, { id: req.session!.userId});
                    return res.send(user);
                }

                return res.status(403).send("No user is logged in.");   

            } catch (error) {
                return res.status(500).send(error.message);  
            }
        });

        return this;
    }

    CreateRouter = () => 
        this
            .Get()
            .GetAll()
            .Register()
            .Login()
            .Logout()
            .GetCurrentUser()
            .Post()
            .Delete()
            .Update()
            .router;
}