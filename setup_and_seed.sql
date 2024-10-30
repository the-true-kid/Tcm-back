-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create forms table
CREATE TABLE IF NOT EXISTS forms (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    form_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question_text VARCHAR NOT NULL,
    question_type VARCHAR NOT NULL,
    question_group VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create form_responses table
CREATE TABLE IF NOT EXISTS form_responses (
    id SERIAL PRIMARY KEY,
    form_id INT REFERENCES forms(id),
    question_id INT REFERENCES questions(id),
    answer VARCHAR NOT NULL
);

-- Create diagnoses table
CREATE TABLE IF NOT EXISTS diagnoses (
    id SERIAL PRIMARY KEY,
    form_id INT REFERENCES forms(id),
    diagnosis_text VARCHAR NOT NULL
);

-- Create recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    form_id INT REFERENCES forms(id),
    recommendation_text VARCHAR NOT NULL
);

-- Seed users table
INSERT INTO users (username, email, password) VALUES 
('john_doe', 'john@example.com', 'hashed_password_1'),
('jane_doe', 'jane@example.com', 'hashed_password_2');

-- Seed forms table
INSERT INTO forms (user_id, form_type) VALUES 
(1, 'Feedback'),
(2, 'Survey');

-- Seed questions table
INSERT INTO questions (question_text, question_type, question_group) VALUES 
('How satisfied are you with our service?', 'Rating', 'Customer Feedback'),
('Would you recommend us to others?', 'Yes/No', 'Customer Feedback');

-- Seed form_responses table
INSERT INTO form_responses (form_id, question_id, answer) VALUES 
(1, 1, 'Very Satisfied'),
(1, 2, 'Yes'),
(2, 1, 'Satisfied'),
(2, 2, 'No');

-- Seed diagnoses table
INSERT INTO diagnoses (form_id, diagnosis_text) VALUES 
(1, 'Positive Feedback'),
(2, 'Needs Improvement');

-- Seed recommendations table
INSERT INTO recommendations (form_id, recommendation_text) VALUES 
(1, 'Continue providing excellent service.'),
(2, 'Consider improving response times.');
