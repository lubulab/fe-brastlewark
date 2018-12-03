//Install express server
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8081;

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/bower_components'));

//add this so the browser can GET the bower files
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname });
});

// Launch app to listen to specified port
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});