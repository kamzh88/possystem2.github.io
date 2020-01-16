DROP DATABASE IF EXISTS restaurants_db;
CREATE DATABASE restaurants_db;

USE restaurants_db;

CREATE TABLE menu (
    id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    selected VARCHAR(255) NOT NULL,
    price DECIMAL(18,2) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    employee_position VARCHAR(255) NOT NULL,
    employee_firstName VARCHAR(255) NOT NULL,
    employee_lastName VARCHAR(255) NOT NULL,
    employee_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    itemize_id VARCHAR(255) NOT NULL,
    subtotal  DECIMAL(18,2) NOT NULL,
    taxes DECIMAL(18,2) NOT NULL,
    total DECIMAL(18,2) NOT NULL,
    time VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

-- CREATE TABLE customers (
--     id INT NOT NULL AUTO_INCREMENT,
--     customer_number VARCHAR(255) NOT NULL,
--     customer_name VARCHAR(255) NOT NULL,
--     PRIMARY KEY (id)
-- );

