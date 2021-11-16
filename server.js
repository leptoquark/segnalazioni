const express = require("express");
const https = require("https");
const fs = require("fs");
const history = require("connect-history-api-fallback");
const jsonServer = require("json-server");
const bodyParser = require('body-parser');
const auth = require("./authMiddleware");
const router = jsonServer.router("serverdata.json");

const enableHttps = false;

const ssloptions = {}

if (enableHttps) {
    ssloptions.cert =  fs.readFileSync("./ssl/anticorruzione.crt");
    ssloptions.key = fs.readFileSync("./ssl/anticorruzione.pem");
}

const app = express();


var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(auth);
app.use("/api", router);
app.use(history());
app.use("/", express.static("./dist/segnalazioni"));

app.listen(8080, 
    () => console.log(
        "Progetto: Segnalazioni Vigilanza\n"+
        "Autore: <c.biancalana@anticorruzione.it>\n\n"+
        "Il server delle Segnalazioni risponde sulla porta 8080"));

if (enableHttps) {
    https.createServer(ssloptions, app).listen(8443,
        () => console.log("HTTPS Server running on port 8443"));
} else {
    console.log("HTTPS disabled")
}