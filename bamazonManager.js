var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
});

console.log("Welcome to Bamazon!");
start();

//Function at the beginning to prompt question.
function start() {
    inquirer.prompt ([
        {
            type: "list",
            name: "task",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Products", "Quit"]
        }
    ]).then(function (answer) {
       // Use switch/ case for different function to run based on different answers.
       switch (answer.task) {
           case "View Products for Sale":
               display();
               break;

           case "View Low Inventory":
                viewLowInv();
                break;

           case "Add to Inventory":
               addInv();
               break;

           case "Add New Products":
                addProduct();
                break;

           case "Quit":
               quitbamazon();
               break;
       } 
    });
}


//Function to "View Products for Sale". Select table from Database and display the table using cli-table.
function display() {
    //Query database to list items with an inventory count lower than five.
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;

        //Display the table using cli-table.
        var table = new Table({
            head: ["ID", "Product Name", "Department", "Price", "Stock Qty"],
            colWidths: [6, 45, 16, 11, 11]
        });

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity],            );
        }
        console.log(table.toString());
        start()
    });
};


//Function to View Low Inventory.
function viewLowInv() {

    //Query database to list items with an inventory count lower than five.
    var query = "SELECT * FROM products WHERE stock_quantity <=5";
    connection.query(query, function(err, res) {
        if (err) throw err;

        //Display the table using cli-table.
        var table = new Table({
            head: ["ID", "Product Name", "Department", "Price", "Stock Qty"],
            colWidths: [6, 45, 16, 11, 11]
        });

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity],            );
        }
        console.log(table.toString());
        start()
    });
};

//Function to Add to Inventory
function addInv() {
    //Prompt questions to get selected item id and quantity
    inquirer.prompt([
        {
            type: "input",
            name: "itemID",
            message: "What is the ID of the item you would like to add more quantity?",
            //Users need to enter number
            validate: function(inputID) {
                if (!isNaN(inputID)) {
                    return true;
                }
                console.log("Please enter a valid ID.");
                return false;
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to add to the inventory?",
            //Users need to enter number
            validate: function(inputQ) {
                if (!isNaN(inputQ)) {
                    return true;
                }
                console.log("Please enter a valid quantity.");
                return false;
            }
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;

            //If users enter an ID outside total items range, then throw error message.
            if((parseInt(answer.itemID)>res.length) || (parseInt(answer.itemID)<=0)) {
            }

            //Otherwise, proceed to loop through the data and find matched item id as the selected item
            var chosenItem = "";
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(answer.itemID)) {
                    chosenItem = res[i];
                }
            }

            //Update the quantity for selected item id
            connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: chosenItem.stock_quantity += parseInt(answer.quantity)
                },
                {
                    item_id: chosenItem.item_id
                }
            ],
            function(error) {
                if (error) throw err;
                //Show message that certain product and its quantity has been updated in the inventory.
                console.log("Successfully updated/added " + answer.quantity + " " + chosenItem.product_name + " to the inventory.");
                display();
            }
           );

        });
    });
    
};

//Function to Add New Product
function addProduct() {
    //Prompt questions to get product name, department, cost, and quantity for the new product
    inquirer.prompt([
        {
            type: "input",
            name: "newProductName",
            message: "What is the name of the product you would like to add?"
        },
        {
            type: "list",
            name: "department",
            message: "Which department does this product fall into?",
            choices: ["Books", "Electronics", "Movies", "Home", "Beauty", "Sports", "Grocery", "Shoes", "Jewerly"]
        },
        {
            type: "input",
            name: "cost",
            message: "How much does it cost?",
            validate: function(cost) {
                if (!isNaN(cost)) {
                    return true;
                }
                console.log("Please enter a valid cost.");
                return false;
            }
        },
        {
            type: "input",
            name: "iniQuantity",
            message: "How many do we have?",
            validate: function(iniQuantity) {
                if (!isNaN(iniQuantity)) {
                    return true;
                }
                console.log("Please enter a valid quantity.");
                return false;
            }
        }
    ]).then(function (answers) {

    //Grab the new product info from answer and add to (insert into) the database table
    var queryString = "INSERT INTO products SET ?";
    connection.query(queryString, {
        product_name: answers.newProductName,
        department_name: answers.department,
        price: answers.cost,
        stock_quantity: answers.iniQuantity,
    })

    //Show message that the product has been added.
    console.log(answers.newProductName + " has been added to Bamazon.");

    display();
    });
};


//Function to quit the program
function quitbamazon() {
    connection.end();
};