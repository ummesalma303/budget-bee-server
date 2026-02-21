CREATE DATABASE expenseDB;

CREATE TABLE expense (
    id VARCHAR(30) PRIMARY KEY,
    name VARCHAR(30),
    description VARCHAR(255)
);