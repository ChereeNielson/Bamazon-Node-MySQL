-- Drop any preexisting "bamazon" Databases --
DROP DATABASE IF EXISTS bamazon;

-- Create a MySQL Database called "bamazon" --
CREATE DATABASE bamazon;
USE bamazon;

-- Create a table called "products" which will contain the store inventory --
CREATE TABLE products (
    id INT AUTO_INCREMENT NOT NULL,
    product VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT(11) DEFAULT 0,
    PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (product, department, price, stock)
VALUES ("Earth Rated Dog Waste Bags", "Pet Supplies", 11.99, 300),
  ("Petmate Charcoal Replacement Water Filters", "Pet Supplies", 2.15, 120),
  ("Hugger Mugger Tropic Yoga Mat", "Exercise & Fitness Equipment", 25.25, 200),
  ("Hugger Mugger Batik Yoga Mat Bag", "Exercise & Fitness Equipment", 39.95, 100),
  ("Stance Women's Cream Frio Socks", "Clothing", 13.99, 125),
  ("Nag Champa Incense Sticks", "Home Fragrance", 9.99, 200),
  ("doTERRA Family Essential Oil Kit", "Home Fragrance", 140.00, 50),
  ("Stainless Steel Tea Infuser", "Home & Kitchen", 14.99, 50),
  ("Nalgene Wide Mouth Water Bottle", "Sports & Outdoors", 11.00, 150),
  ("Pepcid Complete Acid Reducer", "Pharmacy", 19.50, 100),
  ("Ibuprofen Pain Reliever", "Pharmacy", 11.99, 20),
  ("Nature's Way Raw Organic Coconut Oil", "Grocery", 8.48, 25),
  ("Vega Protein+ Chocolate Shake (12 ct.)", "Grocery", 39.95, 25),
  ("AudioQuest 4K Ultra HD HDMI Cable", "Electronics", 39.99, 80),
  ("LCR Left Center Right Dice Game", "Games", 6.97, 50)
