let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "Sleven76",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  queryAllProducts();
  queryDanceSongs();
});

// First display all of the items available for sale. Include the ids, names, and prices of products for sale //
function runSearch() {
  inquirer.prompt({

  })
}

// Prompt users with two messages: ask user the id of the product they would like to buy / ask how many units of the product they would like to buy //


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
