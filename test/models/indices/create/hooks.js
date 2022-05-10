const https = require('https');
const fetch = require('node-fetch')
const hooks = require('hooks');
const fs = require('fs')

// Connecting to the server.
var host = "";
var protocol = "https";
var auth = "";

// Reading .txt file to set URL  
fs.readFile('url.txt', (err, data) => {
  if (err) throw err;

  text = data.toString();
  text = text.split(" ");
  host = text[0].substring(8,text[0].length);;
  auth = text[1]+":"+text[2];
  console.log("host: "+host+"  auth: "+auth);

});

hooks.before("/{index} > PUT > 200 > application/json",function(transactions,done){
  transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";
  
  var settings = {
    settings : {
      index: {
        number_of_shards:1,
        number_of_replicas:0
      }
    }
  }  
  
  transactions.request.body = JSON.stringify(settings);
  done();
});
  
hooks.after("/{index} > PUT > 200 > application/json",function(transactions,done){
  
  const request = async () => {
    var url = protocol + "://" + auth + "@" + host;
      
    hooks.log("DELETE CLUSTER AFTER COMPLETE VALIDATION CREATE INDEX API.");
  
    const response = await fetch(url+'/books',{
      method: 'DELETE'
    });
    const json = await response.json();
    hooks.log(json);
    done();
  } 
    
  request(); 
});
