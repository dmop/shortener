const Link = require('../models/link.model.js');

exports.createShort = function (req, res) {
    // Create and Save a new Link

    if (!req.url) {
        res.status(400).send({ message: "Link can not be empty" });
    }

    var url = req.url.slice(5);

    var hash = Math.floor(Math.random() * (9000 - 100 + 1) + 100);

    var link = new Link({ original_url: url, short_url: req.headers.host + "/" + hash, hash: hash });

    link.save(function (err, data) {
        console.log(data);
        if (err) {
            console.log(err);
            // res.status(500).send({ message: "Some error ocuured while creating the Post." });
        } else {
            // res.status(200).send(data);
        }
    });

    res.status(200).send({
        "original_url": link.original_url,
        "short_url": link.short_url
    });
};


exports.redirectUrl = function (req, res) {

    Link.findOne({ "hash": req.params.hash }, function (err, data) {
        if (err) {
            res.status(500).send({ message: "Could not retrieve link with id " + req.params.hash });
        } else {
            res.redirect(301, data.original_url);
        };
    });

};

