var SERVER_NAME = 'product-api'
var PORT = 3009;
var HOST = '127.0.0.1'

//https://www.npmjs.com/package/restify
var restify = require('restify');

// https://www.npmjs.com/package/save
var save = require('save')
var productsSave = save('products')

var requestCounterGet = 0;
var requestCounterPost = 0;

var server = restify.createServer();

// configure request body parser
server.use(restify.plugins.bodyParser({ mapParams: false }));

// starting server
server.listen(3009, function() {
  console.log('%s listening at %s', server.name, server.url);

});


// GET request
server.get('/products', getAllProducts);

// POST request
server.post('/products', addNewProducts);
server.del('/products',deleteAllProducts);


// callback function mapped to GET request
function getAllProducts(req, res, next) {
    productsSave.find({},null, function(err, foundUsers){
        // send 200 HTTP response code and array of found users
        res.send(200, foundUsers);
        next();
    })
}

// callback function mapped to POST request
function addNewProducts(req, res, next) {
    // json payload of the request
    var newUser =  req.body;

    productsSave.create(newUser, function(err, user){
        // send 201 HTTP response code and created user object
        res.send(201, user);
        next();
    })
}
// callback function mapped to DELEte request
function deleteAllProducts(req, res, next) {
    // json payload of the request

    console.log("Deleting All products");

    productsSave.deleteMany({}, function(err, Products){
           console.log("error"+ err);
           console.log("Deleted products")
        // send 201 HTTP response code and created user object
        res.send(201, Products);
        next();
    })
}

