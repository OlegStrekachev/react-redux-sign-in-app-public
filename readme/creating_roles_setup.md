This guide outlines the steps to create a `root` user in MongoDB for full administrative access, ideal for scenarios like remote management via MongoDB Compass.

### Prerequisites
- MongoDB installed on Ubuntu.
- Basic knowledge of terminal and MongoDB.

### Steps

#### 1. Enable Authentication in MongoDB
Enable authentication to ensure secure user management.
```bash
# Edit MongoDB Config File
sudo nano /etc/mongod.conf

# Add or modify the following lines in the security section
security:
  authorization: "enabled"

# Restart MongoDB to apply changes
sudo systemctl restart mongod
```

#### 2. Create an Initial Admin User
Initially, you need to create an admin user to manage other users and roles. !THIS IS NOT A USER TO MANAGE THE DATABASE!
```javascript
# Access MongoDB Shell
mongo

# Switch to the admin database
use admin

# Create an admin user
db.createUser({
  user: "adminUser",
  pwd: "adminPassword",  // Replace with a strong, secure password
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
});
```
Replace `"adminUser"` and `"adminPassword"` with your desired username and password.

#### 3. Create a User with the `root` Role
After creating the initial admin user, log in with those credentials to create a `root` user.
```javascript
# Log in as the admin user
mongo -u adminUser -p adminPassword --authenticationDatabase admin

# Switch to the admin database
use admin

# Create a new user with the root role
db.createUser({
  user: "rootUser",
  pwd: "yourStrongPassword",  // Replace with a strong, secure password
  roles: ["root"]
});
```
Replace `"rootUser"` and `"yourStrongPassword"` with your desired username and password.

#### 4. Connect Using MongoDB Compass
Utilize MongoDB Compass to remotely manage the server.
- Open MongoDB Compass.
- Create a new connection using the credentials of the `rootUser`.
- Specify the `admin` database as the authentication database.

### Important Considerations
- **Security**: The `root` role provides comprehensive access to MongoDB. Secure this account with a strong, unique password and consider additional security measures.
- **Remote Access**: Ensure proper configuration for remote connections and appropriate network security.
- **Use of `root` Role**: Handle this level of access responsibly due to its extensive capabilities.

---