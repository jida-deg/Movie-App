Movie App
A full-stack web application for browsing, searching, and discovering movies. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this app allows users to explore movie information, view details, and manage their favorite movies.

=> Technologies Used

Frontend: React.js, HTML5, CSS3, JavaScript
Backend: Node.js, Express.js
Database: MongoDB (NoSQL)
Authentication: JWT (JSON Web Tokens) for user login & registration
Other: Axios for API calls, dotenv for environment variables


=>Features

User registration and login
Browse popular movies and search by title
View detailed movie information (release date, rating, description)
Add movies to favorites (optional feature)
Responsive design for desktop and mobile
Full CRUD operations for user data (if applicable)


=>Dependencies/packge install

Frontend (React)
npm install axios,react,react-dom,react-icons,react-router-dom

axios – for making API requests to the backend
react & react-dom – core React libraries
react-icons – for adding vector icons to the UI
react-router-dom – for handling client-side routing


Backend (Node.js / Express) /packge install

npm install bcrypt,bcryptjs,cors,express,express-session,jsonwebtoken
mongodb,mongoose,nodemailer,passport,passport-google-oauth20,socket.io




bcrypt & bcryptjs – for hashing passwords
cors – to handle Cross-Origin requests
dotenv – to manage environment variables
express – server framework
express-session – session management for authentication
jsonwebtoken (JWT) – token-based authentication
mongodb & mongoose – database connection and modeling
nodemailer – sending emails for verification/password reset
passport & passport-google-oauth20 – Google OAuth authentication
socket.io – real-time notifications

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
