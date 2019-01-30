// Required Packages //
require("dotenv").config();
const secret = require("./secret.js");

// NPM Packages //
const mysql = require("mysql");
const inquirer = require("inquirer");
// const log = console.log;
const Table = require("cli-table");
const chalk = require("chalk");
const CFonts = require("cfonts");

// Welcome! //
CFonts.say("Welcome to Bamazon!", {
  font: "chrome", // define the font face
  align: "left", // define text alignment
  colors: ["blue", "green", "magenta"], // define all colors
  background: "transparent", // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 2, // define letter spacing
  lineHeight: 5, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: "0", // define how many character can be on one line
});


// Create Table with Columns //
let table = new Table({
  head: ["ID", "Product Name", "Department", "Price", "Stock"],
  colWidth: 30,
  align: "left",
  style: {
    head: ["blue"],
    border: ["white"]
  },
});

table.push(
  [1, "Earth Rated Dog Waste Bags", "Pet Supplies", 11.99, 300],
  [2, "Petmate Charcoal Replacement Water Filters", "Pet Supplies", 2.15, 120],
  [3, "Hugger Mugger Tropic Yoga Mat", "Exercise & Fitness Equipment", 25.25, 200],
  [4, "Hugger Mugger Batik Yoga Mat Bag", "Exercise & Fitness Equipment", 39.95, 100],
  [5, "Stance Women's Cream Frio Socks", "Clothing", 13.99, 125],
  [6, "Nag Champa Incense Sticks", "Home Fragrance", 9.99, 200],
  [7, "doTERRA Family Essential Oil Kit", "Home Fragrance", 140.00, 50],
  [8, "Stainless Steel Tea Infuser", "Home & Kitchen", 14.99, 50],
  [9, "Nalgene Wide Mouth Water Bottle", "Sports & Outdoors", 11.00, 150],
  [10, "Pepcid Complete Acid Reducer", "Pharmacy", 19.50, 100],
  [11, "Ibuprofen Pain Reliever", "Pharmacy", 11.99, 20],
  [12, "Nature's Way Raw Organic Coconut Oil", "Grocery", 8.48, 25],
  [13, "Vega Protein+ Chocolate Shake (12 ct.)", "Grocery", 39.95, 25],
  [14, "AudioQuest 4K Ultra HD HDMI Cable", "Electronics", 39.99, 80],
  [15, "LCR Left Center Right Dice Game", "Games", 6.97, 50]
);
console.log(table.toString());


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


// First display all of the items available for purchasee. Include the ids, names, and prices of products for sale. //
function displayProducts() {
  stream.write([
    bold("ID"),
    bold("PRODUCT"),
    bold("DEPARTMENT"),
    bold("PRICE"),
    bold("STOCK")
  ]);
  connection.query("SELECT * FROM bamazon.products", function (err, response) {
    if (err) throw err;
    for (var i = 0; i < response.length; + ii) {
      console.log(response);

      stream.write([
        response[i].id,
        heading(response[i].product),
        response[i].price,
        response[i].stock
      ]);
    }
    // connection.end();
  })
}


// Prompt customer with two messages: 1. ask customer the id of the product they would like to purchase / 2. ask how many units of the product they would like to buy //
function customerPrompt() {
  inquirer.prompt([{
      name: "id",
      type: "input",
      message: "Please enter the Item ID of the product you would like to purchase.",
      validate: validateInput,
      filter: Number
    },
    {
      name: "stock",
      type: "input",
      message: "How many do you need?",
      validate: validateInput,
      filter: Number
    }
  ]).then(function (input) {

  })
}



function customerSelection() {
  displayProducts(function (response) {
    let selectionArr = [];
    for (var i = 0; i < response.length; i++) {
      selectionArr.push(response[i].id + " " + response[i].product);
    }
    inquirer.prompt({
      name: "product",
      type: "input",
      message: "What item would you like to purchase? (Choose ID)",
      choices: [
        "Earth Rated Dog Waste Bags",
        "Petmate Charcoal Replacement Water Filters",
        "Hugger Mugger Tropic Yoga Mat",
        "Hugger Mugger Batik Yoga Mat Bag",
        "Stance Women's Cream Frio Socks",
        "Nag Champa Incense Sticks",
        "doTERRA Family Essential Oil Kit",
        "Stainless Steel Tea Infuser",
        "Nalgene Wide Mouth Water Bottle",
        "Pepcid Complete Acid Reducer",
        "Ibuprofen Pain Reliever",
        "Nature's Way Raw Organic Coconut Oil",
        "Vega Protein+ Chocolate Shake (12 ct.)",
        "AudioQuest 4K Ultra HD HDMI Cable",
        "LCR Left Center Right Dice Game"
      ]
    }).then(function (answer) {
      console.log(answer.product);
      switch (answer.product) {
        case "Find products by product":
          productSearch();
          break;
      }
      connection.end();
    });
  })
};
customerSelection();






// Ensure user can only use positive integers for input // 
// function validateInput(value) {
//   let integer = Number.isInteger(parseFloat(value));
//   let sign = Math.sign(value);

//   if (integer && (sign === 1)) {
//     return true;
//   } else {
//     return "Please enter a whole non-zero number."
//   }
// }




// Once order is placed check stock quantity to see if there is enough to meet the customer's request //
// If not enough in stock then display a message "Insufficient quantity!" and then prevent the order from going through //
// If there is enough product in stock then fulfill the customer's order: update the SQL database to reflect the remaining quantity / once the update goes through, show the customer the total cost of their purchase //



function queryAllProducts() {
  //V
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
    }
    console.log("-----------------------------------");
  });
}

function queryDanceSongs() {
  var query = connection.query("SELECT * FROM products WHERE genre=?", ["alternative"], function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
  });

  // logs the actual query being run
  console.log(query.sql);
  connection.end();
}