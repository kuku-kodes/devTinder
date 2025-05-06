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