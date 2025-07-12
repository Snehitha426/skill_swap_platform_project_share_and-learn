
📖 Skill Swap Platform — Share & Learn

A vibrant full-stack MERN (MongoDB, Express, React, Node.js) application where people connect, exchange skills, and grow together!
Whether you want to teach what you know or learn something new, this platform makes it possible with a simple, friendly interface.

🌟 Key Features & Benefits

✨ For Skill Explorers & Learners:

- 📥 Register easily and start showcasing your skills.
- ✍️ Add new skills to the global platform — grow the collective knowledge!
- 🧑‍🤝‍🧑 Browse and connect with others offering skills you’d love to learn.
- 📤 Send skill swap requests — track their status live (Pending / Accepted).
- 🔔 Get notified when your requests are accepted.

✨ For Admins & Organizers:

- 📊 Admin Dashboard with real-time platform activity and swap statistics.
- ❌ Ban users quickly in case of misuse.
- 🎛️ Control over the platform to maintain a safe and friendly environment.

✨ Why this matters:

This platform isn’t just code — it’s a meaningful way for people to learn, teach, and grow by connecting with like-minded peers. A simple way to bridge the learning gap without heavy costs or complicated setups.

🚀 Technology Stack

- Frontend: React.js, React Router DOM, Axios, Bootstrap, Lenis (for smooth scrolling)
- Backend: Node.js, Express.js, Mongoose, JWT, bcryptjs
- Database: MongoDB Atlas (secure cloud database)

📂 Project Structure

/skill-swap-platform
  /backend
    /controllers
    /models
    /routes
    /middleware
    server.js
    .env
  /frontend
    /public
    /src
      /components
      /pages
      /services
      App.js
      index.js
  README.md
  .gitignore
  package.json

📦 Installation & Setup

📌 Clone the Repository:

git clone https://github.com/Snehitha426/skill_swap_platform_project_share_and-learn.git
cd skill-swap-platform

🔧 Backend Setup:

cd backend
npm install

Create a .env file inside the backend/ directory with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Run backend:

npm start

🌸 Frontend Setup:

cd frontend
npm install
npm start

The app will be running on http://localhost:3000

📈 API Endpoints Overview

Feature               | Method | Endpoint                          | Description
----------------------|--------|-----------------------------------|------------------------------
User Registration     | POST   | /auth/register                     | Register a new user
User Login            | POST   | /auth/login                        | User login
Add Skill             | POST   | /skills                            | Add a new skill
View Skills           | GET    | /skills                            | View all skills
Browse Users          | GET    | /users                             | Browse registered users
Send Request          | POST   | /requests                          | Send a skill swap request
View User Requests    | GET    | /requests/:userId                  | View requests for a user
Accept Request        | PUT    | /requests/:requestId/accept        | Accept a skill swap request
Swap Stats (Admin)    | GET    | /admin/swap-stats                  | View platform swap statistics
Ban User (Admin)      | PUT    | /admin/ban-user/:userId            | Ban a user from platform

👑 Why This Project is Beneficial

✨ Skill Swap Platform isn’t just another app — it’s a community builder.
It empowers learners and knowledge sharers alike to:

- 🌱 Learn new skills without monetary barriers
- 🌎 Meet like-minded learners and teachers
- 🎓 Grow their network and portfolio
- 🚀 Create learning opportunities through peer-to-peer connections

Whether you're a student, hobbyist, or working professional — this platform creates opportunities to both give and gain knowledge in a friendly, safe environment.

📃 License

This project is free for educational and personal learning purposes.
For commercial use, kindly seek permission from the author.

✅ Essential Git Commands

git remote -v
git remote remove origin
git remote add origin https://github.com/Snehitha426/skill_swap_platform_project_share_and-learn.git
git add .
git commit -m "Final project upload"
git push origin main

📑 Recommended .gitignore

/node_modules
.env
/.vscode
/dist
.DS_Store

📌 Project Team members
   Karthik
   Snehitha 
   Ram Charan

