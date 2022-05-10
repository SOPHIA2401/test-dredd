// Connecting to the server.
var host = "search-movies-hqrmd5q7cqb7ru7tbypeicwsy4.us-east-1.es.amazonaws.com";
var protocol = "https";
var auth = "sofigarg:T@rget2023";

var url = protocol + "://" + auth + "@" + host;

const https = require('https');

var hooks  = require('hooks');
const fetch = require("node-fetch");

const fs = require('fs')
  
fs.readFile('url.txt', (err, data) => {
    if (err) throw err;
    console.log("><><><><><><><><><><><");
    console.log(data.toString());
    text = data.toString()
    text = text.split(" ");
    console.log("><><><><><><><><><><><");
    host = text[0];
    protocol = "https";
    auth = text[1]+":"+text[2];

});

var url = protocol + "://" + auth + "@" + host;
console.log(url);

// PING API

hooks.before("/ > GET > 200 > application/json",function(transactions,done){
  transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";
  done();
});