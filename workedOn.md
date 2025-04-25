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

