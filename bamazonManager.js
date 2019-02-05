require("dotenv").config();
const secret = require("./secret.js");
let displayTable = require("./displayConstructor.js");

// NPM Required Packages //
const mysql = require("mysql");
const inquirer = require("inquirer");
let Table = require("cli-table2");
const CFonts = require("cfonts");

let TASKS = 6;

// Connect to Database //
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: secret.pass.word,
    database: "bamazon"
  });
  
  connection.connect(function (err) {
    if (err) {
        console.log("connected as id " + connection.threadId + "\n");
    }
    throw err;
  });


// Ask the Manager if they would like to continue or end connection to DB //
function promptManager() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Would you like to continue?",
        choices: ["Yes", "No"]
    }).then(function(answer) {
        switch(answer.action) {
            case "Yes":
                askManager();
            break;

            case "No":
                connection.end();
            break;
        }
    });
}

// Display all product information for Manager //
function displayProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
        managerDisplay(results);
        promptManager();
    })
}

// Select products in DB whose quantity is less than 5 items and display in the table //
function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock < 5", function(err, results) {
        console.log("All products with quantity less than 5 shown in Inventory Table");
        managerDisplay(results);
        promptManager();
    })
}

// Update the quantity of items in DB and display the updated value in the table //
function addInventory() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Enter the Item ID of the product",
    },
    {
        name: "quantity",
        type: "input",
        message: "Enter quantity you wish to add",
    }]).then(function(answer) {
        connection.query("SELECT * FROM products WHERE ?", {id: answer.id}, function(err, response) {
            itemQuantity = response[0].stock + parseInt(answer.quantity);

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock: itemQuantity
            },
            {
                id: answer.id
            }], function(err, results) {});

            connection.query("SELECT * FROM products WHERE ?", {id: answer.id}, function(err, results) {
                console.log("The stock quantity was updated in the Inventory Table");
                managerDisplay(results);
                promptManager();
            });
        });
    });
}

// Add new product into the DB and display the Inventory Table //
function addProduct() {
    inquirer.prompt([{
        name: "product",
        type: "input",
        message: "Enter the name of the new product",
    },
    {
        name: "department",
        type: "input",
        message: "Enter the department of the product",
    },
    {
        name: "price",
        type: "input",
        message: "Enter the price of the new product",
    },
    {
        name: "quantity",
        type: "input",
        message: "Enter the quantity",
    }]).then(function(answer) {
        connection.query("INSERT INTO products SET ?", {
            product: answer.product,
            department: answer.department,
            price: answer.price,
            stock: answer.quantity
        }, function(err, response) {
            console.log("The new product was added to the Inventory Table");
            connection.query("SELECT * FROM products", function(err, results) {
                managerDisplay(results);
                promptManager();
            });
        });
    });
}

// Delete products from the DB and update the Inventory Table //
function deleteProduct() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Enter the Item ID of the product you wish to delete",
    }]).then(function(answer) {
        connection.query("DELETE FROM products WHERE ?", {
            id: answer.id
        }, function(err, results) {
            console.log("The product was deleted from the Inventory Table");
            connection.query("SELECT * FROM products", function(err, results) {
                managerDisplay(results);
                promptManager();
            });
        });
    });
}

// Give Manager options to view, update, or terminate the DB //
function askManager() {
    let managerOptions = [
        "\nSelect the Option Number for the Desired Task:\n",
        "1. View Products Available for Purchase\n",
        "2. View Low Inventory\n",
        "3. Add to Inventory\n",
        "4. Add New Product\n",
        "5. Delete Product\n",
        "6. All Done\n",
    ];

    for (i = [0]; i < askManager.length; i++) {
        console.log(askManager[i]);
    }

    inquirer.prompt({
        name: "option",
        type: "input",
        message: "Which option would you like to perform?",
    }).then(function(answer) {
        
        let choice = parseInt(answer.option);

        if (choice > 0 && choice <= TASKS) {
            switch(answer.option) {
                case "1":
                displayProducts();
                break;

                case "2":
                lowInventory();
                break;

                case "3":
                addInventory();
                break;

                case "4":
                addProduct();
                break;

                case "5":
                deleteProduct();
                break;

                case "6":
                connection.end();
                break;
            }
        } else {
            console.log("Please select a number between 1 and " + TASKS);
            askManager();
        }
    });
}

// Display Inventory Table for Manager //
let managerDisplay = function(results) {
    let display = new displayTable();
    display.displayInventoryTable(results);
}

// Start the Bamazon Manager Function //
askManager();