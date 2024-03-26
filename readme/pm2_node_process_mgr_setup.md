# Setting up PM2 for Your Node.js Project

In this guide, you will learn how to set up PM2 (Process Manager 2) to manage and monitor your Node.js application on a server. PM2 provides convenient tools for process management, automatic restarts, and monitoring.

## Prerequisites

Before you begin, make sure you have the following:

- [Node.js](https://nodejs.org/) installed on your server
- [npm](https://www.npmjs.com/) (Node Package Manager) or [yarn](https://yarnpkg.com/) for installing packages

## Installation

1. Install PM2 globally on your server:

    npm install pm2 -g

    This command installs PM2 globally, making it available as a command-line tool.

## Starting Your Node.js Application with PM2

2. Navigate to the directory where your Node.js application is located:

    cd /path/to/your/nodejs/app

3. Start your Node.js application using PM2. Replace `your_script.js` with the name of your script:

    pm2 start your_script.js

    This command starts your application and adds it to PM2's process list.

## Automatic Restarts

PM2 provides automatic restart options to ensure your application remains available and responsive.

### On Server Load or High Resource Usage

To restart your application if it consumes too much CPU or memory, use the following command:

    pm2 start your_script.js --max-memory-restart 512M --max-restarts 3 --restart-delay 10000

    - `--max-memory-restart`: Specifies the maximum memory usage (e.g., 512M).
    - `--max-restarts`: Limits the number of restarts (e.g., 3).
    - `--restart-delay`: Sets the delay between restarts in milliseconds (e.g., 10 seconds).

### On Crash

PM2 automatically restarts your application on crash without additional configuration.

## Saving the Process List

After configuring your application and restart policies, save the process list:

    pm2 save

This ensures that PM2 remembers your settings, even after a server restart.

**!IMPORTANT**

Dotenv uses the current working directory (CWD) to look for and load your .env file. When you start your Node.js application, it uses the CWD as the reference point for finding the .env file. If you start your app from a different directory (e.g., from the root directory), it may not find the .env file if it's located elsewhere.

The .env file path is by default path.resolve(process.cwd(), '.env'). cwd is the current working directory: this means that dotenv looks for the file in the directory from which the code is run.

**CERTBOT**
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/strekachev.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/strekachev.com/privkey.pem
   Your cert will expire on 2024-03-04. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
 - If you like Certbot, please consider supporting our work by: