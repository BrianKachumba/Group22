-- create the database 

create database event_mabager;

-- Create the events table
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
    is_archived BOOLEAN DEFAULT 0
);