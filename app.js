const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
// create express app
const app = express();
const morgan = require('morgan');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('tiny'));

// Configuring the database
var dbConfig = require('./config/config.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url, {
	useMongoClient: true
});

mongoose.connection.on('error', function() {
    console.log('Não conseguiu se conectar a database. Saindo agora ...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Conectado a database com sucesso");
})


require('./routes/link.routes.js')(app);

// listen for requests
app.listen(port, function () {
    console.log("Server is listening on port " + port);
});