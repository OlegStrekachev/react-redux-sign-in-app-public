import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { Kid, GuestKidSchema } from "../models/kidSchema.js";

// Middleware for a simple jwt token authentication

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401); // If no token is provided

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is not valid
    req.user = user;
    next();
  });
};

export const checkUserRole = (req, res, next) => {
  const userRole = req.user.role;

  if (userRole === "admin") {
    req.collection = Kid;
  } else if (userRole === "user") {
    req.collection = GuestKidSchema;
  }
  next();
};

export const handleLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

export const handleLogin = async (req, res) => {
  // Deconstructing the username and password from the request body
  const { username, password } = req.body;

  // Quering the database to find the user with the provided username

  try {
    // Find the user with the provided username and store it in the user variable
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    } else {
      console.log("User found", user);
    }

    // Compare the provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    } else {
      console.log("Password valid", validPassword);
    }

    // Prepare the user object to be stored in the token in the response
    const userForResToken = {
      username: user.username,
      role: user.role,
    };

    // Generate the access token

    const accessToken = jwt.sign(
      userForResToken,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5m",
      }
    );

    console.log("Access token generated", accessToken);

    // Set the token in a cookie and send it in the response

    res.cookie("token", accessToken, {
      maxAge: 5 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use 'secure' only in production
      sameSite: "strict",
    });

    console.log(res.cookie);

    return res.status(200).json({
      message: "Authentication successful",
      role: user.role,
      tokenExpiration: 5 * 60 * 1000,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error generating token", error });
  }
};
