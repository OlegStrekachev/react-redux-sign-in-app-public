import path from "path";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import router from "./my_modules/router/router.js";
import {
  handleLogout,
  verifyToken,
  handleLogin,
  checkUserRole,
} from "./my_modules/controllers/authentication.js";

const expressApp = express();

// cookieParser middleware helps to parse the incoming request cookies

expressApp.use(cookieParser());

// json middleware helps to parse the incoming request with JSON payloads

expressApp.use(express.json());

// __dirname is a global object in Node.js that represents the directory name of the current module. path.resolve() returns the absolute path of the current directory.

const __dirname = path.resolve();

// Allows the client to access the server and perform CRUD operations

expressApp.use(
  cors({
    origin: "http://127.0.0.1:3000", // replace with the address of your React app
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // this allows cookies and credentials to be sent
  })
);

expressApp.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);

  if (req.body && req.body.username && req.body.password) {
    console.log(
      `Username: ${req.body.username}, Password: ${req.body.password}`
    );
  } else {
    console.log(req.body);
  }

  next();
});

expressApp.post("/login", handleLogin);
expressApp.post("/logout", handleLogout);

// Middleware to authenticate the token for any requests to /api
expressApp.use("/api", verifyToken, checkUserRole);

// Routes for /api
expressApp.use("/api", router);

export default expressApp;
