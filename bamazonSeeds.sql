CREATE DATABASE bamazonCustomer;

USE bamazonCustomer;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR (30) NULL,
	department_name VARCHAR (30) NULL,
	price DECIMAL (10,2) NULL,
	stock_quantity INT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Television", "Vidoe & Audio", 399.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Speaker", "Vidoe & Audio", 199.95, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Computer", 799.99, 180);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desktop", "Computer", 399.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mattress", "Home & Kicthen", 999.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cooker", "Home & Kicthen", 79.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soccer Gears", "Toys & Games", 45.89, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo360", "Toys & Games", 299.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Watch", "Fashion", 75.89, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coats", "Fashion", 99.99, 85);