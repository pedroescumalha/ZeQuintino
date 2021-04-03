export const IsProdEnvironment = process.env.NODE_ENV === 'production';

export const Symbols = {
	PostsController : Symbol.for("PostsController"),
    Router: Symbol.for("Router"),
    ORM: Symbol.for("ORM"),
    DbClient: Symbol.for("DbClient"),
    Server: Symbol.for("Server"),
    App: Symbol.for("App"),
}