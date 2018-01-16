module.exports = function (app) {

    var link = require('../controllers/link.controller.js');

    // define a simple route
    app.get('/', function (req, res) {
        res.json({ "message": "Bem vindo a api de linkagens" });
    });

    // Create a new short_url
    app.get('/new/:url*', link.createShort);

    // Redirect to the FUll url 
    app.get('/:hash', link.redirectUrl);

}