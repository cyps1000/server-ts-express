import { Request, Response, NextFunction } from "express";

/** Import decorators */
import { get, controller, use } from "./decorators";

/** Auth Middleware */
const requrieAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send("Access denied.");
};

@controller("")
export class RootController {
  @get("/")
  public getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <div>You are logged in</div>
          <a href="/auth/logout">Logout</a>
        </div>
      `);
    } else {
      res.send(`
        <div>
          <div>You are not logged in</div>
          <a href="/auth/login">Login</a>
        </div>
      `);
    }
  }

  @get("/protected")
  @use(requrieAuth)
  public getProtected(req: Request, res: Response) {
    res.send("Welcome to Protected route, logged in user");
  }
}
