import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

// Front end app doesnt require to have user creation functionality and hence we using
//this function to create users manually in the database

async function createUsers() {
  const users = [
    {
      username: "username",
      password: await bcrypt.hash("password123", 10),
      role: "admin",
    },
    {
      username: "user",
      password: await bcrypt.hash("user", 10),
      role: "user",
    },
  ];

  for (let { username, password, role } of users) {
    const user = new User({
      username,
      password,
      role,
    });

    try {
      await user.save();
      console.log(`User ${username} created succesfully`);
    } catch {
      console.log(`Error creating user ${username}`);
    }
  }
}
// Uncomment this line to create users in the database in case it is needed in the future
// createUsers();

export const User = mongoose.model("users", userSchema);
