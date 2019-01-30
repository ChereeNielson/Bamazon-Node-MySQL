let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "Sleven76",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  productSearch();
});

// First display all of the items available for sale. Include the ids, names, and prices of products for sale //
function runSearch() {
  inquirer.prompt({
    name: "product_name",
    type: "input",
    message: "What product would you like to look for?",
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
  }).then(function(answer) {
    console.log(answer.product_name);
    switch (answer.product_name) {
      case "Find products by product_name":
      productSearch();
      break;

      case "Find all "
    }
  })
}

// Ensure user can only use positive integers for input // 
function validateInput(value) {
  let integer = Number.isInteger(parseFloat(value));
  let sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return "Please enter a whole non-zero number."
  }
}

// Prompt user with two messages: 1. ask user the id of the product they would like to buy / 2. ask how many units of the product they would like to buy //
function promptUserPurchase() {
  inquirer.prompt([
    {
      name: "item_id",
      type: "input",
      message: "Please enter the Item ID of the product you would like to purchase.",
      validate: validateInput,
      filter: Number
    },
    {
      name: "quantity",
      type: "input",
      message: "How many do you need?",
      validate: validateInput,
      filter: Number
    }
  ]).then(function(input) {

  })
}



// Once order is placed check stock quantity to see if there is enough to meet the customer's request //
// If not enough in stock then display a message "Insufficient quantity!" and then prevent the order from going through //
// If there is enough product in stock then fulfill the customer's order: update the SQL database to reflect the remaining quantity / once the update goes through, show the customer the total cost of their purchase //



function queryAllProducts() {
//V
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
    }
    console.log("-----------------------------------");
  });
}

function queryDanceSongs() {
  var query = connection.query("SELECT * FROM products WHERE genre=?", ["alternative"], function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
  });

  // logs the actual query being run
  console.log(query.sql);
  connection.end();
}
