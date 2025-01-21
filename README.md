# 🎉 Eventify - Modern Event Management System

> A streamlined event management solution built with vanilla JavaScript and Node.js

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
node --version
- MySQL v8.0+ required
  mysql --version
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
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=event_manager_db
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

### Create Index for Better Performance
CREATE INDEX idx_event_date ON events(event_date);
CREATE INDEX idx_category ON events(category);


## 🌐 Deployment Guide


## 🖼 UI Screenshots


## 📈 Future Implementations


## 👥 Contributing

### Fork the repository.

### Create a feature branch
git checkout -b feature/AmazingFeature

### Commit changes
git commit -m 'Add AmazingFeature'

### Push to the branch
git push origin feature/AmazingFeature

### Open a Pull Request.

## 🙏 Acknowledgments

### S-Hook Hackathon organizers

## 📞 Support

-- For any questions or support, please reach out via our communication channels or contact us directly.

Made with ❤️ by Group 22

---
© 2025 Event Manager Hackathon. All rights reserved. 
