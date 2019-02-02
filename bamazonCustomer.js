// Required Packages //
require("dotenv").config();
const secret = require("./secret.js");
const displayTable = require("./displayConstructor.js");

// NPM Packages //
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table2");
// const chalk = require("chalk");
const CFonts = require("cfonts");

// Welcome to Bamazon! //
CFonts.say("Welcome to Bamazon!", {
  font: "chrome", // define the font face
  align: "left", // define text alignment
  colors: ["blue", "green", "magenta"], // define all colors
  background: "transparent", // define the background color
  letterSpacing: 2, // define letter spacing
  lineHeight: 5, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: "0", // define how many character can be on one line
});


// Connect to Database //
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: secret.pass.word,
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
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
      name: "quantity",
      type: "input",
      message: "Enter the quantity you want to purchase",
      filter: Number
    }
  ]).then(function (answer) {
    // Query the DB to verify the Item ID exists with the requested quantity //
    connection.query("SELECT product, department, price, stock FROM products WHERE ?", {
      id: answer.id
    }, function (err, response) {
      console.log("\n You would like to buy " + answer.quantity + " " + response[0].product + " " + response[0].department + " at $" + response[0].price + "each");
      if (response[0].stock >= answer.quantity) {
        // If there is enough product in stock then fulfill the customer's order and provide the total cost of their purchase //
        let itemQuantity = response[0].stock - answer.quantity;
        connection.query("UPDATE products SET ? WHERE ?", [{
            stock: itemQuantity
          },
          {
            id: answer.id
          }
        ], function (err, response) {

        });
        let cost = response[0].price * answer.quantity;
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


// Ask the customer if they would like to continue shopping //
function customerPrompt() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: " Would you like to continue shopping?\n",
    choices: ["Yes", "No"]
  }).then(function (answer) {
    switch (answer.action) {
      case "Yes":
        break;
      case "No":
        connection.end();
        break;
    }
  })
};


// Start app by prompting the customer //
customerPrompt();











// connection.query(queryStock, {id: item}, function(err, data) {
//   if (err) throw err;
//   console.log("data = " + JSON.stringify(data));
//   // If customer selects an invalid Item ID then data field will be empty //
//   if (data.length === 0) {
//     console.log("ERROR: Invalid Item ID. Please select a valid Item ID.");
//     displayStock();
//   } else {
//     let productData = data[0];
//     if (quantity <= productData.stock) {
//       console.log("The Item ID you requested is in stock. Placing order!");

//       // Update the Products //
//       let updateProducts = "UPDATE products SET stock = " + (productData.stock - quantity) + "WHERE id = " + item;

//       // Update the SQL DB to reflect the remaining Quantity //
//       connection.query(updateProducts, function(err, data) {
//         if (err) throw err;
//         // If there is enough product in stock then fulfill the customer's order and provide the total cost of their purchase //
//         console.log("Your order has been placed! Your total is $" + productData.price * quantity);
//         console.log("Thank you for shopping with Bamazon!");
//         console.log("\n-------------------------------------------------------------------\n");

//         connection.end();
//       })
//     } else {
//       // If not enough in stock then display a message "Insufficient quantity!" and then prevent the order from going through //
//       console.log("Insufficient quantity! Please modify your order.");
//       console.log("\n---------------------------------------------------------------------\n");

//       displayProducts();
//     }
//   }
// })

// function customerSelection() {
//   displayProducts(function (response) {
//     let selectionArr = [];
//     for (var i = 0; i < response.length; i++) {
//       selectionArr.push(response[i].id + " " + response[i].product);
//     }
//     inquirer.prompt({
//       name: "product",
//       type: "input",
//       message: "What item would you like to purchase? (Choose ID)",
//       choices: [
//         "Earth Rated Dog Waste Bags",
//         "Petmate Charcoal Replacement Water Filters",
//         "Hugger Mugger Tropic Yoga Mat",
//         "Hugger Mugger Batik Yoga Mat Bag",
//         "Stance Women's Cream Frio Socks",
//         "Nag Champa Incense Sticks",
//         "doTERRA Family Essential Oil Kit",
//         "Stainless Steel Tea Infuser",
//         "Nalgene Wide Mouth Water Bottle",
//         "Pepcid Complete Acid Reducer",
//         "Ibuprofen Pain Reliever",
//         "Nature's Way Raw Organic Coconut Oil",
//         "Vega Protein+ Chocolate Shake (12 ct.)",
//         "AudioQuest 4K Ultra HD HDMI Cable",
//         "LCR Left Center Right Dice Game"
//       ]
//     }).then(function (answer) {
//       console.log(answer.product);
//       switch (answer.product) {
//         case "Find products by product":
//           productSearch();
//           break;
//       }
//       connection.end();
//     });
//   })
// };
// customerSelection();





// Once order is placed check stock quantity to see if there is enough inventory to meet the customers request //
// function displayStock() {
//   queryStock = "SELECT * FROM products";
//   connection.query(queryStock, function(err, data) {
//     if (err) throw err;
//     console.log("Current Inventory: ");
//     console.log("................................\n");

//     let outStock = " ";
//     for (var i = 0; i < data.length; i++) {
//       outStock = " ";
//       outStock += "Item ID: " + data[i].id + " // ";
//       outStock += "Product Name: " + data[i].product + " // ";
//       outStock += "Department: " + data[i].department + " // ";
//       outStock += "Price: $" + data[i].price + "\n";
//       console.log(outStock);
//     }
//     console.log("------------------------------------------------\n");
//     customerPrompt();
//   })
// }