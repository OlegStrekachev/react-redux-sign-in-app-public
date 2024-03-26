# Daycare sign in list printing automatization system

A web-based platform designed to manage a list of kids in a daycare setting, offering CRUD operations, and automated sign-in sheet generation with printing capabilities.

| <img src="https://drive.google.com/uc?export=view&id=11Rl3u4qQ8gMo0rXjQ0Gvr6fhEGNh0B5H" width="300"> | <img src="https://drive.google.com/uc?export=view&id=17UD9V2XnQCL3_PCCHxx4Uj90N_-9iHop" width="300"> |
| :--------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Usage](#usage)
- [Continuous Deployment](#continuous-deployment)
- [Contribute](#contribute)
- [License](#license)

## Features

- **Frontend Dashboard:** Interactive web page to view and manage a list of kids.
- **CRUD Operations:** Allows users to Create, Read, Update, and Delete kid's data entries.
- **PDF Generation:** On-demand generation of weekly sign-in sheets in PDF format.
- **Remote Printing:** Sends generated PDFs to a remote printer.

## Technologies Used

- **Frontend:** Bootstrap
- **Backend:** NodeJS, Express
- **Database:** MongoDB
- **Libraries & Packages:** pdfMaker, Nodemailer

## Installation and Setup

### Frontend

1. **Copy Static Website Folder**
   Transfer the static website folder "front-end-table" to your desired server location.

2. **Ensure JS Fetch API Paths are Correct in the fetch.js Script**
   The frontend table sends API requests to the backend, activating specific route handler functions. It's crucial to confirm that the frontend API calls align with your backend routes. Modify as necessary.

3. **Serve the Website**
   Use a web server tool of your choice to serve the static website to the client. Examples include Apache, Nginx, or any static site hosting service.

### Backend

1. **Clone the Repository**

   ```
   git clone [YOUR REPO LINK]
   ```

2. **Navigate to Project Directory**

   ```
   cd [YOUR PROJECT NAME]
   ```

3. **Install Required Dependencies**

   ```
   npm install
   ```

4. **Setup Environment Variables**
   Create a `.env` file in the root directory and provide values for:

   ```env
   # Host and Port expressApp running on
   EXPRESS_PORT=your_port
   EXPRESS_HOST=your_host

   # remote printer email
   REMOTE_PRINTER_EMAIL="your_remote_printer_email"
   DEVELOPMENT_EMAIL="your_development_email"

   # mongoDB connection
   MONGODB_URL_DEV=your_mongoDB_connection_string

   # Nodemailer login and pass for the email
   NODEMAILER_USER=your_email_login
   NODEMAILER_PASS=your_email_password

   # Nodemailer email
   NODEMAILER_EMAIL_FROM=email_you_sending_from

   ```

5. **Initialize and Run the MongoDB Server**

6. **Start the Application**
   ```
   npm start
   ```

## Usage

All the functionality is accessible from the front end web page table. Clients can perform the following actions:

- Create a new record.
- Edit an existing record.
- Delete an existing record.
- Send to print Monday to Friday PDF pages with the sign-in list for the current or next week.

## Continuous Deployment

This project uses GitHub Webhooks to achieve continuous deployment. Any pushes to the master branch automatically trigger a Bash script, pulling the latest changes and restarting the application using PM2.

To set up the webhook:

1. Navigate to your GitHub repository.
2. Click on 'Settings', then 'Webhooks'.
3. Add a new webhook with the Payload URL pointing to your deployment server route: `[YOUR_SERVER_URL]/deploy`.
4. Choose content type as `application/x-www-form-urlencoded`.
5. Set the secret and use the same in your deployment script for validation.
6. Select "Just the push event."

7. Create a bash script on your server:

   ```bash
   #!/bin/bash
   cd /opt/path-to-your-project
   git pull origin name-of-your-branch
   npm install
   pm2 restart name-of-your-process
   ```

8. Ensure the webhook is active.

Adjust the deployment route, script path, and other configurations as deemed necessary.

## Contribute

Contributions are always welcome! Please read the [contribution guidelines](CONTRIBUTING.md) first.

## License

[MIT License](LICENSE)

## Installation

1. Install Ubuntu 22.04 LTS Jammy Jellyfish

## Cofigure ssh to keep connection alive

- My current namecheap virtual machine seems to close connections when it detects incactivity for a while, so I had to configure ssh to keep the connection alive.

1. Create < name >.config file at /etc/ssh/sshd_config.d

2. Add the following lines to the file

   ```bash
   Host *
   ClientAliveInterval 60
   ClientAliveCountMax 120
   ```

## Install MongoDb

**Virtual machine VPS Pulsar lacks Avx cpu instructions for the later mongoDB version. The latest version that can work WITHOUT AVX is**

image: mongo:4.4.18
but if you are using it on a VPS, its worth a shot to contact their support, mine said that they changed the CPU type and that fixed the problem.

1. **Uninstall MongoDB (if not already uninstalled):**

```bash
# Stop the MongoDB service
sudo systemctl stop mongod

# Uninstall MongoDB (if it is installed)
sudo apt-get purge mongodb-org*
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb
```

2. **Import the MongoDB GPG key:**

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

3. **Create a MongoDB source list file for Ubuntu 20.04:**

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

4. **Reload the local package database:**

```bash
sudo apt-get update
```

5. **Install the MongoDB packages:**

```bash
sudo apt-get install -y mongodb-org=4.4.18 mongodb-org-server=4.4.18 mongodb-org-shell=4.4.18 mongodb-org-mongos=4.4.18 mongodb-org-tools=4.4.18
```

6. **Start MongoDB:**

```bash
sudo systemctl start mongod
```

7. **Enable MongoDB to start automatically at system boot**

```bash
sudo systemctl enable mongod
```

8. **Verify that MongoDB has started successfully**

```bash
sudo systemctl status mongod
```

## Installing Node JS and NPM

```bash
sudo apt update
sudo apt install nodejs npm
node -v
npm -v
```

## Installing PM2 Process Manager

```bash
sudo npm install pm2@latest -g
```

**Path to configs**

/root/.pm2-configs

## Installing Nginx

```bash
sudo apt update
sudo apt install nginx

sudo systemctl enable nginx # enable nginx to start on boot
```

## Setting up MongoDB permissions for remote access

- MongoDB handles user accounts at the database level, and the admin database is where you typically manage users and roles.
  Use this command to switch to the admin database:

```bash
use admin
```

- Create an Administrative User (if you haven't already):

It's a good practice to first create an administrative user who has the privilege to manage other users and roles.
Here's an example command to create an admin user:

```bash
db.createUser({
  user: "myAdmin",
  pwd: "4R8t8ZRAh5wxtwi942",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})
```

```bash 
db.createUser({
  user: "daycareAdmin",
  pwd: "SAx1XWE0WgSLjZpKX2",
  roles: ["root"]
});
```

config file:

```bash
# /etc/mongod.conf
```

**Enable Remote Access to MongoDB:**

```bash
# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0
```

**Enable Authentication on MongoDB:**

```bash
#security:
security:
  authorization: "enabled"
```

**Restart MongoDB:**

````bash
```bash
sudo systemctl restart mongod
````

**Connect with Authentication using MongoDB Compass:**

```bash
mongodb://myAdmin:<password>@162.0.239.131:27017/
```

**Enable Authentication on MongoDB:**

To enforce authentication, you need to edit the MongoDB configuration file (mongod.conf) and enable authentication.
Add the following line under the security section:

```bash
security:
  authorization: "enabled"
```

**Connect with Authentication:**

After enabling authentication, you'll need to connect to MongoDB using the credentials. For instance, using the MongoDB shell, you would connect as follows:

```bash
mongo -u myUser -p userPassword --authenticationDatabase myDatabase
```



db.auth('myAdmin', '4R8t8ZRAh5wxtwi942')


[**1. MongoDB Root User Creation Guide**](./creating_roles_setup.md)

!Install dotEnv


[**2. MongoDB Remote Connection Setup Guide**](./remote_access_setup.md)

[**3. PM2 Process manager setup**](./pm2_node_process_mgr_setup.md)


List of useful coomands for mongoDB:

```bash
# show all databases
show dbs

# show current database
db

# switch to a database
use <database>

# show all collections in the current database
show collections

# show all users in the current database
use admin
db.system.users.find().pretty()
