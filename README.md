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

## 🚀 Getting Started

### Prerequisites

```bash
# Node.js v14+ required
node --version

# MySQL v8.0+ required
mysql --version

##Installation Steps

Clone Repository

git clone https://github.com/BrianKachumba/Group22.git
cd Group22


Install Dependencies

npm install

## Environment Setup

# Create .env file

DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=event_manager_db
PORT=3000

📊 Database Setup
MySQL Setup Commands

-- Create Database
CREATE DATABASE event_manager_db;
USE event_manager_db;

-- Create Events Table
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

-- Create Index for Better Performance
CREATE INDEX idx_event_date ON events(event_date);
CREATE INDEX idx_category ON events(category);

📡 API Documentation
Event Endpoints
Get All Events

GET /api/events

Create Event

POST /api/events
Content-Type: application/json

{
    "title": "Example Event",
    "description": "Event description",
    "event_date": "2025-01-30",
    "time": "22:02:00",
    "location": "Nairobi",
    "organizer": "John Doe",
    "max_attendees": 100,
    "category": "party"
}

Update Event

PUT /api/events/:id

Delete Event

DELETE /api/events/:id

Toggle Favorite

PUT /api/events/:id/favorite

Toggle Archive

PUT /api/events/:id/archive

🌐 Deployment Guide


🖼 UI Screenshots


📈 Performance Optimizations

Minified assets
Optimized database queries
Caching implementation
Lazy loading images
Debounced search

👥 Contributing

Fork the repository
Create feature branch (git checkout -b feature/AmazingFeature)
Commit changes (git commit -m 'Add AmazingFeature')
Push to branch (git push origin feature/AmazingFeature)
Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE.md file for details.
🙏 Acknowledgments

S-Hook Hackathon organizers
FontAwesome for icons
Open source community

## 📞 Support

For any questions or support, please reach out to our team via our plp communication channels or contact us

Made with ❤️ by Group 22
