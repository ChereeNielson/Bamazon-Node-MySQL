// Create Table to display Products and Inventory. Results from a SELECT query are passed in as parameter and used //
Table = require("cli-table2");
let displayTable = function() {

    this.table = new Table({
        head: ["Item ID", "Product Name", "Department", "Price", "Stock Quantity"],
        colWidth: 30,
        align: "left",
        style: {
        head: ["blue"],
        border: ["white"]
        }
    });

    this.displayInventoryTable = function(results) {
    	this.results = results;
	    for (var i=0; i <this.results.length; i++) {
	        this.table.push(
	            [this.results[i].ItemID, this.results[i].ProductName, "$" + this.results[i].Price, this.results[i].StockQuantity] );
	    }
    	console.log("\n" + this.table.toString());
	};
}
module.exports = displayTable;

  
//   this.displayProducts
  // table.push(
  //   [1, "Earth Rated Dog Waste Bags", "Pet Supplies", 11.99, 300],
  //   [2, "Petmate Charcoal Replacement Water Filters", "Pet Supplies", 2.15, 120],
  //   [3, "Hugger Mugger Tropic Yoga Mat", "Exercise & Fitness Equipment", 25.25, 200],
  //   [4, "Hugger Mugger Batik Yoga Mat Bag", "Exercise & Fitness Equipment", 39.95, 100],
  //   [5, "Stance Women's Cream Frio Socks", "Clothing", 13.99, 125],
  //   [6, "Nag Champa Incense Sticks", "Home Fragrance", 9.99, 200],
  //   [7, "doTERRA Family Essential Oil Kit", "Home Fragrance", 140.00, 50],
  //   [8, "Stainless Steel Tea Infuser", "Home & Kitchen", 14.99, 50],
  //   [9, "Nalgene Wide Mouth Water Bottle", "Sports & Outdoors", 11.00, 150],
  //   [10, "Pepcid Complete Acid Reducer", "Pharmacy", 19.50, 100],
  //   [11, "Ibuprofen Pain Reliever", "Pharmacy", 11.99, 20],
  //   [12, "Nature's Way Raw Organic Coconut Oil", "Grocery", 8.48, 25],
  //   [13, "Vega Protein+ Chocolate Shake (12 ct.)", "Grocery", 39.95, 25],
  //   [14, "AudioQuest 4K Ultra HD HDMI Cable", "Electronics", 39.99, 80],
  //   [15, "LCR Left Center Right Dice Game", "Games", 6.97, 50]
  // );
  // console.log(table.toString());
  