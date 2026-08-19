# Bangalore Pincode Explorer

![Live Demo](https://img.shields.io/badge/Live_Demo-Available-brightgreen?style=for-the-badge&logo=render)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

A full-stack web application designed to explore Bangalore areas and pincodes. This project satisfies the internship assignment requirements using a modern tech stack, a highly interactive map, and a premium "soft-UI" aesthetic.

**🚀 Live Demo:** [https://bangalore-pincode-explorer-9lzq.onrender.com/](https://bangalore-pincode-explorer-9lzq.onrender.com/)

---

## ✨ Features

- **Premium Soft-UI Dashboard:** Built with modern design principles featuring clean typography, glassmorphism cards, and soft dynamic shadows.
- **Interactive Map Integration:** Powered by `react-leaflet` with a custom light theme (CartoDB Positron) and pure CSS HTML markers.
- **Geolocated Data:** Click on any location card and the map smoothly animates and flies directly to the precise GPS coordinates.
- **Full-Stack Architecture:** 
  - **Frontend:** React (Vite) for blazing fast performance.
  - **Backend:** Node.js / Express REST API serving static files in production.
  - **Database:** SQLite3 with an automated initialization and seeding script (`db.js`).

## 🛠️ Tech Stack

- **Frontend:** React.js, React-Leaflet, Vanilla CSS
- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Deployment:** Render (Single Service Web App)

---

## 💻 Local Installation

If you would like to run this project locally on your machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### 1. Setup Backend
Open a terminal and navigate to the `server` directory:
```bash
cd server
npm install
npm start
```
*Note: The server automatically initializes and seeds the SQLite database (`pincodes.db`) upon startup.*

### 2. Setup Frontend
Open a new terminal window and navigate to the `client` directory:
```bash
cd client
npm install
npm run dev
```
The React frontend will be available at `http://localhost:5173`. Open this URL in your browser to explore the app!

---
*Built as a showcase for full-stack engineering and UX/UI design.*
