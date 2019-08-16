DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(500) NOT NULL,
    department_name VARCHAR(500) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cracking the Coding Interview", "Books", 33.00, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone XS Max", "Electronics", 1099.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("John Wick: Chapter 3", "Movies", 19.96, 149);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iRobot Roomba 960 Robot Vacuum", "Home", 597.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Neutrogena Wet Skin Kids Sunscreen Spray", "Beauty", 10.50, 145);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NordicTrack Commercial Treadmill", "Sports", 2699.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pepperidge Farm Goldfish Cheddar Crackers", "Grocery", 9.98, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo (2nd Generation) - Smart speaker", "Electronics", 99.99, 450);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("CSIMARI Womens and Mens Water Shoes", "Shoes", 22.00, 130);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Solid 14K Yellow Gold 4mm  Necklace ", "Jewerly", 2745.00, 65);

SELECT * FROM products;