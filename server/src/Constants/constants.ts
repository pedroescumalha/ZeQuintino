export const IsProdEnvironment = process.env.NODE_ENV === 'production';

export const Symbols = {
	PostsController : Symbol.for("PostsController"),
    Router: Symbol.for("Router"),
    PostService: Symbol.for("PostService"),
    ORM: Symbol.for("ORM"),
    Server: Symbol.for("Server"),
}