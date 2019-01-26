DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
      item_id INT NOT NULL AUTO_INCREMENT,
      product_name VARCHAR (50) NULL,
      department_name VARCHAR (50) NULL,
      price DECIMAL(10,2) NULL,
      stock_quantity INT NULL,
      PRIMARY KEY (id)
  );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("vanilla", 2.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chocolate", 3.10, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("strawberry", 3.25, 75);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
