const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user:"root",
	password:"",
	database:"bamazoncustomer"
});

connection.connect(function(err) {
	if (err) throw err;
	// console.log("connection as id " + connection.threadId + "\n");
	readProduct();
	console.log(" ");
	console.log("Hello and welcome to Bamazon Online Shopping!!!");
	console.log(" ");
});

function readProduct() {
	connection.query("SELECT * FROM products", function(err, res) {
		console.log("Item# 	  |" + "Product Name 	|" + "Department Name        |" + "Price 	          |" + "Quantity");
		console.log("-------------------------------------------------------------------------------------");
		for (var i = 0; i < res.length; i++) {
			console.log (res[i].item_id + "         |" + res[i].product_name +	"		|" + res[i].department_name + "		|$"	+ res[i].price + "          |"	+ res[i].stock_quantity);
		}	
		console.log("-------------------------------------------------------------------------------------");
		if (err) throw err;
		console.log(" ");
		itemSearchbyId();
	});
}

function itemSearchbyId() {
	inquirer
		.prompt({
			name: "id",
			type: "input",
			message: "What is the Item ID of the product you would like to buy?"
		})
		.then(function(answer) {
			var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?";
			connection.query(query, { item_id: answer.id }, function (err, res) {
				for(var i = 0; i < res.length; i++) {
					console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + "|| Price: " + res[i].price + "|| Items Left: " + res[i].stock_quantity);
					console.log(" ");

					var price = res[i].price;
					var quantityLeft = res[i].stock_quantity;
					var item_id = res [i].item_id;
					
					inquirer
					.prompt({
						name: "quantity",
						type: "input",
						message: "How many would you like to buy?"
					})
						
					.then(function(answer) {
						if (answer.quantity > quantityLeft) {
							console.log("Insufficient quantity!");
							console.log(" ");
							readProduct();
						}

						else {
								console.log("Total Cost: " + answer.quantity * price);
								
								console.log("------------------------------------------------------------------------------------");
								
								console.log(" ");
								var newStockQ = quantityLeft - answer.quantity;
								console.log("Updating Stock quantities...\n");
							  var query = connection.query(
							    "UPDATE products SET ? WHERE ?",
							    [
							      {
							        stock_quantity: newStockQ
							      },
							      {
							        item_id: item_id
							      }
							    ],
							    function(err, res) {
							      console.log(res.affectedRows + " products updated!\n");
						    
						    }
						  );
								// logs the actual query being run
				  			console.log(query.sql);
								connection.end();
						}
				});
			}
		});
	});
}

