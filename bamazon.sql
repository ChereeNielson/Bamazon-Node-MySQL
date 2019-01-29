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
VALUES ("Earth Rated Dog Waste Bags", "Pet Supplies", 12.00, 300),
  ("Petmate Charcoal Replacement Water Filters", "Pet Supplies" 2.20, 120),
  ("Hugger Mugger Tropic Yoga Mat", "Exercise & Fitness Equipment" 25.25, 200),
  ("Hugger Mugger Batik Yoga Mat Bag", "Exercise & Fitness Equipment" 40.00, 100),
  ("Stance Women's Cream Frio Socks", "Clothing", 14.00, 25),
  ("Foot Peel Mask Exfoliant", "Beauty & Personal Care", 16.00, 50),
  ("Nag Champa Incense Sticks", "Home Fragrance", 10.00, 200),
  ("doTERRA Essential Oil Kit", "Home Fragrance", 26.00, 50),
  ("Stainless Steel Tea Infuser", "Home & Kitchen", 15.00, 50),
  ("Nalgene Wide Mouth Water Bottle", "Sports & Outdoors", 11.00, 150)







-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
