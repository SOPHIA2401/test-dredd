// Connecting to the server.
var host = "search-movies-hqrmd5q7cqb7ru7tbypeicwsy4.us-east-1.es.amazonaws.com";
var protocol = "https";
var auth = "sofigarg:T@rget2023";

var url = protocol + "://" + auth + "@" + host;

const https = require('https');
// const fetch = require('node-fetch')

var hooks = require('hooks');

// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const fetch = require("node-fetch");

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
      
      hooks.log("DELETE CLUSTER AFTER COMPLETE VALIDATION CREATE INDEX API.");
  
      const response = await fetch(url+'/books',{
        method: 'DELETE'
      });
      hooks.log("=====================");
      const json = await response.json();
      hooks.log(json);
      done();
    } 
    
    request();
  
});