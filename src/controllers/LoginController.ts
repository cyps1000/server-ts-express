import { Request, Response } from "express";

/** Import decorators */
import { get, controller, bodyValidator, post } from "./decorators";

@controller("/auth")
export class LoginController {
  @get("/login")
  public getLogin(req: Request, res: Response): void {
    res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>`);
  }

  @post("/login")
  @bodyValidator("email", "password")
  public postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email && password && email === "hi@hi.com" && password === "dadada") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid email or password");
    }
  }

  @get("/logout")
  public getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect("/");
  }
}
