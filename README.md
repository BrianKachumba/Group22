# 🎉 Eventify - Modern Event Management System

## Live Demo

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://event-manager-p021.onrender.com/)

[![Live Demo site](https://plus.unsplash.com/premium_vector-1705741561584-511335729706)](https://event-manager-p021.onrender.com/)

**_A streamlined event management solution built with vanilla JavaScript and Node.js_**

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Deployment Guide](#deployment-guide)
- [UI Screenshots](#ui-screenshots)

## 🌟 Overview

Eventify transforms event management with a modern, intuitive interface designed for seamless event organization. Built as part of the S-Hook Hackathon challenge, it demonstrates full-stack development capabilities using pure HTML, CSS, and JavaScript.

## ✨ Features

### Core Features

- **Event Management**

  - Create and edit events with rich details
  - Upload event images
  - Set attendee limits
  - Add locations and time details

- **Smart Organization**

  - Favorite events system
  - Archive functionality
  - Calendar view
  - Grid/List view toggle

- **Advanced UI/UX**
  - Dark/Light mode
  - Responsive design
  - Real-time search
  - Custom animations
  - Date-based sorting

## 🛠 Technology Stack

- **Frontend**

  - HTML5
  - CSS3 (Pure CSS animations)
  - Vanilla JavaScript
  - FontAwesome icons

- **Backend**
  - Node.js
  - Express.js
  - MySQL
  - RESTful API

## Project Structure 📁

```
event-manager/
├── public/
│   ├── index.html
│   ├── add-event.html
│   └── view-event.html
    └── help.html
    └── favorites.html
    └── calendar.html
    └── archive.html
    └── styles.css
    └── main.js
├── server.js
├── event_manager.sql
├── package.json
└── README.md
```

## Getting Started 🚀

### Prerequisites

- Node.js v14+ required
  `node --version`
- MySQL v8.0+ required
  `mysql --version`
- Git

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/BrianKachumba/Group22.git
   cd Group22
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   ```bash
   mysql -u root -p < db.sql
   ```

4. Configure environment variables:

   ```env
   DB_HOST=<YOUR_DB_HOST>
   DB_PORT=<YOUR_DB_PORT>
   DB_NAME=<YOUR_DB_NAME>
   DB_USER=<YOUR_USERNAME>
   DB_PASSWORD=<YOUR_PASSWORD>
   PORT=3000
   ```

   Create a `.env` file in the root directory and add the above configuration.

5. Start the server:

   ```bash
   node server.js
   ```

6. Access the application at `http://localhost:3000`

## API Endpoints 🛣️

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get specific event
- `POST /add-event` - Create new event
- `DELETE /api/events/:id` - Delete event

## 📊 Database Setup

### MySQL Setup Commands

```sql
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  organizer VARCHAR(255) NOT NULL,
  max_attendees INT,
  category VARCHAR(100),
  image_url VARCHAR(255),
  is_favorite BOOLEAN DEFAULT 0,
  is_archived BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Create Index for Better Performance

```sql
CREATE INDEX idx_event_date ON events(event_date);
CREATE INDEX idx_category ON events(category);
```

## 🌐 Deployment Guide

- Ensure Setup online database and connect it with your application.You can use host providers like aiven.io.
- Push Your Code to GitHub:
  Make sure your code is in a GitHub repository.
- Connect Render(hosting service provider) to GitHub:
  In the Render dashboard, create a new web service.
- Connect it to your GitHub repository and select the branch you want to deploy.
- Configure Build Settings:
- Ensure the build command is set (if needed) and that the start command in your package.json is defined, e.g.:

```json
"scripts": {
    "start": "node app.js"
}
```

- Deploy:
  Click on the deploy button or wait for Render to automatically deploy upon detecting changes in your repository.
- Verify Deployment
  Once deployed, visit the URL provided by Render to ensure that your application is running and can connect to the Aiven MySQL database.

## 🖼 UI Screenshots

## 📈 Future Implementations

## 👥 Contributing

### 1.Fork the repository.

### 2.Create a feature branch

`git checkout -b feature/AmazingFeature`

### 3.Commit changes

`git commit -m 'Add AmazingFeature'`

### 4.Push to the branch

`git push origin feature/AmazingFeature`

### Open a Pull Request.

## 🙏 Acknowledgments

### S-Hook Hackathon organizers

## 📞 Support

-- For any questions or support, please reach out via our communication channels or contact us directly.

Made with ❤️ by Group 22

---

© 2025 [Event Manager Hackathon.](https://event-manager-p021.onrender.com/) All rights reserved.
