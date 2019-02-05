require("dotenv").config();
const secret = require("./secret.js");
let displayTable = require("./displayConstructor.js");

// NPM Required Packages //
const mysql = require("mysql");
const inquirer = require("inquirer");
let Table = require("cli-table2");
const CFonts = require("cfonts");

// Welcome to Bamazon! //
CFonts.say("Welcome to Bamazon!", {
  font: "chrome", // define the font face
  align: "left", // define text alignment
  colors: ["blue", "green", "magenta"], // define all colors
  background: "transparent", // define the background color
  letterSpacing: 3, // define letter spacing
  lineHeight: 5, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: "0", // define how many character can be on one line
});

// Connect to Database //
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: secret.pass.word,
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId + "\n");
  displayProducts();
});


// First display all of the products available for purchase using a the table made with the NPM cli-table2 package. Include the IDs, Names, and Prices of products for sale. //
function displayProducts() {
  let display = new displayTable();
  connection.query("SELECT * FROM products", function (err, results) {
    display.displayInventoryTable(results);
    purchaseItem();
  });
}


// Then prompt customer to enter the Item ID and the Quantity they wish to purchase //
function purchaseItem() {
  console.log("\n ");
  inquirer.prompt([{
      name: "id",
      type: "input",
      message: "Enter the Item ID of the product you want to purchase",
      filter: Number
    },
    {
      name: "stock",
      type: "input",
      message: "Enter the quantity you want to purchase",
      filter: Number
    }
  ]).then(function (answer) {
    // Query the DB to verify the Item ID exists with the requested quantity //
    connection.query("SELECT product, department, price, stock FROM products WHERE ?", {
      id: answer.id
    }, function (err, res) {
      console.log("\n You would like to buy " + answer.stock + " " + res[0].product + " " + res[0].department + " at $" + res[0].price + "each");
      if (res[0].stock >= answer.stock) {
        // If there is enough product in stock then fulfill the customer's order and provide the total cost of their purchase //
        let itemQuantity = res[0].stock - answer.stock;
        connection.query("UPDATE products SET ? WHERE ?", [{
            stock: itemQuantity
          },
          {
            id: answer.id
          }
        ], function (err, res) {

        });
        let cost = res[0].price * answer.stock;
        console.log("\n Your order has been placed! Your total is $" + cost.toFixed(2) + "\n");
        // Order Completed //
        customerPrompt();
      } else {
        // If not enough in stock then display a message "Insufficient quantity!" and then prevent the order from going through //
        console.log("\n Insufficient quantity! Please modify your order.\n");
        // Order Not Completed //
        customerPrompt();
      }
    })
  });
}


// Ask the Customer if they would like to continue shopping //
function customerPrompt() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: " Would you like to continue shopping?\n",
    choices: ["Yes", "No"]
  }).then(function (answer) {
    switch (answer.action) {
      case "Yes":
      purchaseItem();
        break;
      case "No":
        connection.end();
        break;
    }
  })
};

