#Survey react app with express js backend

How to use:
1. import the database.sql in server/database/ to your local database driver
2. Change src/config.json database details to match your own
3. Install concurrently on your machine using `npm install -g concurrently`
4. run `npm run initialize` to install the applications required dependencies
5. run `npm start` this will run both the server and the react app

## Tools

I created a backend server in node js that uses the mysql library to connect to the database, 
I created a relational database in phpmyadmin that has a tables for: Categories, Questions, Answers and Site Options

The frontend uses axios to make HTTP Get requests to the backend server to display the required information.