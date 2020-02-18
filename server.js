var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.post("/encrypt", function(req, res) {
  var payload = req.body;
  const PBFPubKey = "FLW-PUBfKey-12345667889";
  // Ideally you will fetch the public key from req.body
  var client = encrypt("28bbd87cef95423a40761d4a", JSON.stringify(payload));
  res.json({
    PBFPubKey: PBFPubKey,
    client: client,
    alg: "3DES-24"
  });
});

function encrypt(key, text) {
  var forge = require("node-forge");
  var cipher = forge.cipher.createCipher(
    "3DES-ECB",
    forge.util.createBuffer(key)
  );
  cipher.start({ iv: "" });
  cipher.update(forge.util.createBuffer(text, "utf-8"));
  cipher.finish();
  var encrypted = cipher.output;
  return forge.util.encode64(encrypted.getBytes());
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//start server
app.listen(3311, function() {
  console.log("Node server running on port 3311");
});

module.exports = app;
