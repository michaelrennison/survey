##Survey react app with express js backend

How to use:
1. import the database.sql in server/database/ to your local database driver
2. Change src/config.json database details to match your own
4. install [this](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) plugin on google chrome to allow local cross origin requests
5. enter the server directory `cd server` and run `npm install` to install the node modules for the server
6. navigate back to the main directory `cd ../` and run `npm install` to install the node modules for the application
7. run `npm start` this will run both the server and the react app

## Tools

I created a backend server in node js that uses the mysql library to connect to the database, 
I created a relational database in phpmyadmin that has a tables for: Categories, Questions, Answers and Site Options

The frontend uses axios to make HTTP Get requests to the backend server to display the required information. The responses get converted into objects which classes were defined using typescript