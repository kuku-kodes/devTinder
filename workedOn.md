- Create a repository
- Initialize the repository
- node_module, package.json, package-lock.json
- Install express
- Create a server
- Listin to port 3030
- Write request handlers foe /test, /hello
- inatall nodemone and update scripts inside package.json 
- What are dependencies
- What is the use of "-g" while npm install - g stands for -> global or on the whole syatem in simpler terms -> installing any package or liberary on the system
- Difference between caret and tilda ( ^ vs ~ )

- Initialize git 
- Create .gitignore file
- Create a remote repo on github
- Push all code to remote origin

# Both package.json and package-lock.json are important in a Node.js project, and here's why you should push both to Git:

- 📦 package.json
This file:

Lists all your project dependencies (e.g., React, Express)

Contains project metadata (name, version, scripts, etc.)

Allows others (or you) to install dependencies using: npm install

- 🟢 Think of it as a shopping list of what packages your project needs.

- 🔒 package-lock.json
This file:

Locks the exact version of each package and all nested dependencies

Ensures consistent installs across all environments (your machine, your teammate’s, production)

Helps avoid “works on my machine” bugs

🛠️ Think of it as the actual receipt showing exactly what was bought, including all sub-dependencies.

# Orders of the rouets matters a lot in backend 

- Install Postman app and make a workshop/collection > test api call 
- write logic to handle GET, POST, DELETE API calls and test them on Postman
- Explore routing and use of ?, +, (), * in the route / while making use of (req.query)
- use the regex in routes /a/ , /.*fly$/ 
- Reading the query, params in the routes
- Reading the dynamic routes.

- This code runs on V8 engine which executes codes line by line because java is syncronous single threaded languange.
- Multiple routes can be handled.
- Making use of next() function will let us help to execute the next route handler.
- we can also put the multiple req(),res() router handler in array and mix and match it according to our choice.
- The functions which are written in the middle of the route handlers are basically called the "middlewares" which a lingo basically used by the developers.

- Create a free cluster on MongoDB official webSite (MongoDB Atlas)
- Install "mongoose" liberary
- connet your application to the database "Connnection url"/devTinder
- Call the connectDB function and connect to dataBase before starting application on port 3030
- Create a userSchema & user Model 
- Create POST signup API to add data to database 
- push some document using API calls from postman
- Error handling using try and catch

# JS object vs JSON (difference)
- JSON is a data format (a string), while a JavaScript object is an actual object in memory used in code execution.
- Key Differences:

Feature	   JavaScript Object	                                            JSON Object

Type	   Native object (in-memory structure)	                            String (data format)
Usage	   Used directly in JavaScript code to store and manipulate data	Used to transmit data (e.g., between client and server)
Quotes	   Keys can be unquoted	                                            Keys must be in double quotes
Functions  Can contain functions and methods	                            Cannot contain functions or undefined values
Example	   { name: "Alice", age: 25 }	                                    { "name": "Alice", "age": 25 }

- Add the expreess JSON middleware to yore app
- make your signup API dyanimac to receive data from the end user
- User.findOne() with duplicate emailId , which object returned 
- API - get user by email
- API - Feed API - GET /feed - get all the user from the database 
- API - get user by id
- Create a delete user API
- DIfference between PATCH & PUT 
- API - update a user 
- Explore the mongoose Documentation for Model methords
- what are the options in a Model.findOneAndUpdate method, explore more about it 
- API - Update the user with email ID

- Explore schematype options from the documentation 
- Add required , unique, lowercase , min , minLength, trim
- Add default 
- Create a custom made validation for gender
- Improve the DB schema - PUT all the appropriate validations on each field in the schema 
- Add timestamps to the userSchema 
- Add API level validation on patch request & signUp POST API 
# Data Sanitization
- Add API valaditation for each field
- Install validator 
- Explore validatore liberary function and use validator function for password, email, photoURL, 
- NEVER TRUST req.body

- Validate data in signUp API
- Install bcrypt package 
- Create passwordHash using bcrypt.hash & save the user in excrupted password
- Create login API 
- Compare password and throw error if email or passwor is invalid 

- Install coolie-parser
- just send a dummy cookie to the user 
- create GET /profile API and check if u get the coolie back
- Install jsonwebtoken
- In /login API , after email and password validatiion , create a JWT toke and send it to the user in coolies 
- read the cookies in side your proflie API and find the logged in user 
- userAuth Middleware
-

# Pre-hook or pre-middleware
In Express.js, "pre" typically refers to pre-middleware or pre-hooks, which are functions or sets of functions executed before a specific operation or route handler. This concept is most commonly associated with:
Mongoose Pre-Hooks: When working with Mongoose (an ODM for MongoDB and Node.js), schema.pre() allows you to define middleware that runs before certain Mongoose operations, such as 'save', 'validate', 'remove', or 'find'. This is useful for tasks like data validation, hashing passwords before saving, or logging.