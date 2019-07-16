/**
 * Postal Rate Calculator
 */

// Required modules
var http = require('http');
var url = require('url');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

// Start server and process the data
app.get('/mail', function(req, res) {
    getWeight(req, res);
})

// Listen to the port
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
})

function getWeight(req, res) {
    var reqUrl = url.parse(req.url, true);

    // Check that data is coming through
    //console.log("getWeight got: " + reqUrl.query);

    var mailType = reqUrl.query.mailType;
    var weight = Number(reqUrl.query.weight);

    calculateWeight(res, mailType, weight);
}

function calculateWeight(res, mailType, weight) {
    var result = 0.0;
    //console.log("calculateWeight got: mailType = " + mailType, ", weight = " + weight);
    switch (mailType) {
        case "Letters (Stamped)":
            if (weight < 1) {
                result = .49;
            } else if (weight < 2) {
                result = .70;
            } else if (weight < 3) {
                result = .91;
            } else if (weight < 3.5) {
                result = 1.12;
            } 
            break;

        case "Letters (Metered)":
            if (weight < 1) {
                result = .46;
            } else if (weight < 2) {
                result = .67;
            } else if (weight < 3) {
                result = .88;
            } else if (weight < 3.5) {
                result = 1.09;
            } 
            break;

        case "Large Envelopes (Flats)":
            if (weight < 1) {
                result = .98;
            } else if (weight < 2) {
                result = 1.19;
            } else if (weight < 3) {
                result = 1.40;
            } else if (weight < 4) {
                result = 1.61;
            } else if (weight < 5) {
                result = 1.82;
            } else if (weight < 6) {
                result = 2.03;
            } else if (weight < 7) {
                result = 2.24;
            } else if (weight < 8) {
                result = 2.45;
            } else if (weight < 9) {
                result = 2.66;
            } else if (weight < 10) {
                result = 2.87;
            } else if (weight < 11) {
                result = 3.08;
            } else if (weight < 12) {
                result = 3.29;
            } else if (weight < 13) {
                result = 3.50;
            } 
            break;

        case "Parcels":
            if (weight < 1) {
                result = 2.67;
            } else if (weight < 2) {
                result = 2.67;
            } else if (weight < 3) {
                result = 2.67;
            } else if (weight < 4) {
                result = 2.67;
            } else if (weight < 5) {
                result = 2.85;
            } else if (weight < 6) {
                result = 3.03;
            } else if (weight < 7) {
                result = 3.21;
            } else if (weight < 8) {
                result = 3.39;
            } else if (weight < 9) {
                result = 3.57;
            } else if (weight < 10) {
                result = 3.75;
            } else if (weight < 11) {
                result = 3.93;
            } else if (weight < 12) {
                result = 4.11;
            } else if (weight < 13) {
                result = 4.29;
            } 
            break;
    }
    
    var result = result.toString();
    var params = {mailType: mailType, weight: weight, cost: result};

    res.render('pages/results', params);
}
