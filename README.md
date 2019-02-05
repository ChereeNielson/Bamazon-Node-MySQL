# Bamazon-Node-MySQL

## Node + MySQL Overview
This is a Command Line Node app that mimics a beloved online retailer. A digital Amazon-like storefront using Node + MySQL. 
This project is comprised of two apps - one for customer orders and one for manager actions. Uses basic functions of persistant storage. All 4 CRUD database operations used - INSPECT, SELECT, UPDATE and DELETE SQL queries. Used an exported constructor file to display the inventory in both bamazonCustomer.js and bamazonManager.js.

BamazonCustomer:
* Displays a Table of Products Available for Purchase
* Takes a Customer's Order
* Computes the Cost of the Order
* Depletes the Stock from the Store's Inventory

BamazonManager - allows a manager to:
* View Products for Sale 
* View Low Inventory 
* Add to Inventory
* Add New Product
* Delete a Product

### Welcome to Bamazon!

![Alt text](/images/Bamazon.PNG)

# Screenshots
#### Bamazon schema in MySQL Workbench

![Alt text](/images/schema.PNG?raw=true "Photo of the MySQL Workbench showing the schema and initial inventory")

## Bamazon Customer App
#### Screenshot 1 - Command Line Interface showing:
* initial inventory when database created - SELECT query used,
* initial user prompt - inquirer npm used,
* order fulfilled message - SELECT query used
* cost of items calculated and displayed - UPDATE query used,
* customer prompted to continue shopping,
* when customer selects "yes" the table is displayed with updated stock quantities - cli-table2 npm used,
* customer is prompted to continue shopping,
* order is fulfilled and cost is calculated
* customer is prompted again


![Alt text](/images/customer1.PNG?raw=true "Photo of the command line interface showing table with initial inventory and customer prompts")

#### Screenshot 2 - Demonstate failure to fill an order due to insufficient quantity in inventory:
* show current inventory after purchases, 
* customer prompted to order an item, 
* response to customer's request for quantity of items not in stock,
* customer prompted for desire to order again - connection.end() used for clean end to node.js app


![Alt text](/images/customer2.PNG?raw=true "Photo of the command line interface showing table with inventory and customer prompts")

## Bamazon Manager App
#### Screenshot 1 - Node command line interface showing:
* View Products for Sale option - Inventory Table displayed, SELECT query used
* View Low Inventory option - Inventory Table displayed only with items with stock quantity less than 5, SELECT WHERE query used
* Prompt Manager to determine if desires to continue 

![Alt text](/images/manager1.PNG?raw=true "Photo of the command line interface showing manager option selected and response")

#### Screenshot 2 - 
* Add New Product option - prompt Manager to input product name, department, price, and quantity, INSERT and SELECT queries used
* Add to Inventory option - prompt Manager to input Item id and quantity to add, display Inventory Table, SELECT and UPDATE queries used

![Alt text](/images/manager2.PNG?raw=true "Photo of the command line interface showing manager option selected and response")

#### Screenshot 3 -
* Delete a product option - prompt Manager for Id of product to delete, DELETE query used 
* All Done option - terminates connection to database using connection.end() for a clean end to database connection and Node.js app (no need for cntl C)

![Alt text](/images/manager3.PNG?raw=true "Photo of the command line interface showing final manager option - All Done. With this option connection ends cleanly")

#### Screenshot 4 - 
* Prompt Manager to determine if desires to continue, "No" is selected which invokes connection.end() for a clean end to database connection and Node.js app (no need for cntl C)

![Alt text](/images/manager4.PNG?raw=true "Photo of the command line interface showing manager choosing to finish and connection ends cleanly")

# Technologies Used
#### The following technologies and tools were used
* **JavaScript**
* **Node.js**
* **MySQL Workbench**

#### The following npm packages were used 
* **npm dotenv**
* **npm mysql**
* **npm inquirer**
* **npm cli-table2**
* **npm cfonts**

# Getting Started
#### The Bamazon node.js app is maintained in GitHub with the SQL file to use in the MySQL workbench. You will need to add your password in the bamazonCustomer.js file to run on your local machine.

```javascript
let connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "your password",
	database:  "bamazon"
});
```