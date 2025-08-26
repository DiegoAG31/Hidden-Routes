DROP DATABASE IF EXISTS hidden_routes;
CREATE DATABASE hidden_routes;
USE hidden_routes;

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100),
    email VARCHAR(100),
    password_hash VARCHAR(255),
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id)
        REFERENCES roles (role_id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

DROP TABLE IF EXISTS experiences;
CREATE TABLE experiences (
	experience_id INT AUTO_INCREMENT PRIMARY KEY,
    experience_title VARCHAR(150),
    experience_description TEXT,
    price DECIMAL(15 , 2 ),
    capacity INT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

DROP TABLE IF EXISTS booking_status;
CREATE TABLE booking_status (
    booking_status_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_status_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS bookings;
CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    experience_id INT,
    quotes INT,
    booking_status_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (experience_id)
        REFERENCES experiences (experience_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (booking_status_id)
        REFERENCES booking_status (booking_status_id)
        ON DELETE SET NULL ON UPDATE CASCADE
);