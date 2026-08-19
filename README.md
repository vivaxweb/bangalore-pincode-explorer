# Bangalore Pincode Explorer

![Live Demo](https://img.shields.io/badge/Live_Demo-Available-brightgreen?style=for-the-badge&logo=render)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20Ready-blue?style=for-the-badge&logo=css3)

A full-stack, **fully responsive** web application designed to explore Bangalore areas by pincode. Built for the internship assignment using a modern tech stack with a premium dashboard UI.

**🚀 Live Demo:** [https://bangalore-pincode-explorer-9lzq.onrender.com/](https://bangalore-pincode-explorer-9lzq.onrender.com/)

> ⚠️ Hosted on Render's free tier — may take ~45 seconds to wake up on the very first visit.

---

## ✨ Features

### 🗺️ Interactive Map
- Powered by `react-leaflet` with the CartoDB Positron (light) tile layer
- Custom CSS markers that highlight when a location is selected
- Smooth "fly-to" animation when clicking a result

### 🔍 Smart Search
- Real-time, debounced search across **pincode** and **area name**
- Dropdown shows Post Office name alongside the area for immediate context
- Clear (✕) button to reset instantly

### 📮 Real Post Office Data
- **Post Office Name**, **Office Type** (Head / Sub / Branch Office)
- **Delivery Status**, **District**, **State / Circle**, **Division**
- Data for **24 Bangalore pincodes** (560001–560095)

### ⚡ Working Action Buttons
- **Copy PIN** — copies pincode to clipboard with feedback
- **Google Maps** — opens the exact area in Google Maps
- **Street View** — opens Google Street View at the GPS coordinates
- **Track Mail** — links to India Post's official tracking portal

### 📖 Area Overview (Live Wikipedia)
- Fetches a real Wikipedia article summary for the selected neighborhood
- Displays the authentic Wikipedia thumbnail photo of the area
- Falls back gracefully if no article is found

### 📱 Fully Responsive Design
- **Desktop:** Two-panel dashboard — sidebar + map on top + detail cards below
- **Tablet (≤1024px):** Compact layout, adjusted grid and buttons
- **Mobile (≤768px):** Single-column layout, map on top, scrollable cards below, sidebar converts to a **fixed bottom navigation bar** (mobile-app style)
- **Small Phone (≤420px):** Single-column post office grid, full-width action buttons

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (Vite), react-leaflet, Vanilla CSS |
| Backend | Node.js, Express 4 |
| Database | SQLite3 (auto-seeded on boot) |
| Map Tiles | CartoDB Positron (OpenStreetMap) |
| External APIs | Wikipedia REST API (live area summaries & photos) |
| Deployment | Render (Single Web Service) |

---

## 💻 Local Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher

### 1. Clone & Setup Backend
```bash
git clone https://github.com/vivaxweb/bangalore-pincode-explorer.git
cd bangalore-pincode-explorer/server
npm install
npm start
```
*The server starts on `http://localhost:5000` and auto-seeds the SQLite database.*

### 2. Setup Frontend (new terminal)
```bash
cd ../client
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
bangalore-pincode-explorer/
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx      # Main component, search, Wikipedia API
│   │   ├── index.css    # All styles incl. responsive breakpoints
│   │   └── components/
│   │       ├── MapView.jsx    # react-leaflet map + markers
│   │       └── SearchBar.jsx
│   └── index.html
└── server/              # Node.js + Express backend
    ├── index.js         # REST API endpoints
    └── db.js            # SQLite init + auto-seeding
```

---

*Built as a showcase for full-stack engineering, responsive design, and third-party API integration.*
