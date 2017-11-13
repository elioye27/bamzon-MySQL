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
		// console.log(res);
		// connection.end();
		itemSearchbyId();
	});
}

function itemSearchbyId() {
	inquirer
		.prompt({
			name: "id",
			type: "input",
			message: "What is the Item ID of the prodcut you would like to buy?"
		})
		.then(function(answer) {
			var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?";
			connection.query(query, { item_id: answer.id }, function (err, res) {
				for(var i = 0; i < res.length; i++) {
					console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + "|| Price: " + res[i].price + "|| Items Left: " + res[i].stock_quantity);
				
				var price = res[i].price;
					inquirer
					.prompt({
						name: "quantity",
						type: "input",
						message: "How many would you like to buy?"
					})
					
					.then(function(answer) {
						console.log("Total Price: " + answer.quantity * price);
					});
				}
			});
		});
}

