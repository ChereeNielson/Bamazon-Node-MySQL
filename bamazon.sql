-- Drop any preexisting "bamazon" Databases --
DROP DATABASE IF EXISTS bamazon;

-- Create a MySQL Database called "bamazon" --
CREATE DATABASE bamazon;
USE bamazon;

-- Create a table called "products" which will contain the store inventory --
CREATE TABLE products (
      item_id INT (11) AUTO_INCREMENT NOT NULL ,
      product_name VARCHAR (50) NOT NULL,
      department_name VARCHAR (50) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      stock_quantity INT (11) NOT NULL,
      PRIMARY KEY (id)
  );

-- Insert data into the "products" table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Earth Rated Dog Waste Bags", "Pet Supplies", 11.99, 300),
  ("Petmate Charcoal Replacement Water Filters", "Pet Supplies" 2.17, 120),
  ("Hugger Mugger Tropic Yoga Mat", "Exercise & Fitness Equipment" 25.23, 200),
  ("Hugger Mugger Batik Yoga Mat Bag", "Exercise & Fitness Equipment" 39.95, 90),






-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
