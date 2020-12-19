#### Exercise Tracker App

This project is intended to facilitate my learning and understanding of various technologies and concepts. It involves the use of:

 - React.js (front-end)
 - MongoDB (nosql database)
 - MongoDB Atlas (cloud-based centralized management for MongoDB data)
 - Mongoose (simplifies interacting with mongodb)
 - Node.js (run JavaScript outside of a browser/package management/back-end services)
 - Express.js (Web Application Framework)
 - Bootstrap CSS library
 - React Router

Credit goes to FreeCodeCamp as I coded along their tutorial. Comments have been added throughout the code to explain functionality, and the general process is broken down in this readme.

---
### Database
The db schema is created using Mongoose.
There are two entities: *exercises* and *users*.


--- 
### Testing
We use *Insomnia* to test the server API. This functions similarly to *postman*.

---
### React
We use components (React.Component) to tell React what we want to render.
Components take in "props", and return a hierarchy of views to display using ender methods.
React utilizes JSX, which looks like HTML but can use JavaScript in {curly braces}.

---
### Connecting the front-end to the back-end
The front-end sends HTTPS requests to the back end. This is done via the *Axios* library.


