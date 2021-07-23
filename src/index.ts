import express from "express";
import cookieSession from "cookie-session";

/** Imports Router */
import { AppRouter } from "./AppRouter";

/** Import Controllers */
import "./controllers/LoginController";
import "./controllers/RootController";

/**
 * Creates the express server
 */
const app = express();

/**
 * Init Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["string"] }));

/**
 * Login Routes
 */
app.use(AppRouter.getInstance());

app.listen(3000, () => console.log(`Listening to port 3000`));
