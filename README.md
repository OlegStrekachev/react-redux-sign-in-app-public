# Daycare sign in list printing automatization system

A web-based platform designed to manage a list of kids in a daycare setting, offering CRUD operations, and automated sign-in sheet generation with printing capabilities.

## Features

- **Frontend Dashboard:** Interactive web page to view and manage a list of kids.
- **CRUD Operations:** Allows users to Create, Read, Update, and Delete kid's data entries.
- **PDF Generation:** On-demand generation of weekly sign-in sheets in PDF format.
- **Remote Printing:** Sends generated PDFs to a remote printer.

## Technologies Used

- **Frontend:** React JS, Redux-toolkit, Vite, Typescript
- **Backend:** NodeJS, Express
- **Database:** MongoDB, Mongoose
- **Libraries & Packages:** pdfMaker, Nodemailer

**Environment Variables**
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
