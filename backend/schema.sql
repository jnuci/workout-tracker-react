CREATE DATABASE WorkoutTracker

USE WorkoutTracker

CREATE TABLE Workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    date TIMESTAMP DEFAULT NOW()
);