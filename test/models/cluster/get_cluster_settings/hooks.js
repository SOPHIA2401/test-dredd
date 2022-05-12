const https = require('https');
const fetch = require('node-fetch')
const hooks = require('hooks');
const fs = require('fs')

var host = "";
var protocol = "https";
var auth = "";

// Reading .txt file to set URL  
fs.readFile('url.txt', (err, data) => {
  if (err) throw err;

  text = data.toString();
  text = text.split(" ");
  host = text[0].substring(8,text[0].length);
  auth = text[1];

});

hooks.before("/_cluster/settings > GET > 200 > application/json",function(transactions,done) {
    transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";
  
    const request = async () => {
  
        var url = protocol + "://" + auth + "@" + host;

        // Create an index with non-default settings.
        const cluster = await fetch(url+'/books',{
            method: 'PUT',
            body:JSON.stringify({
            settings : {
                index: {
                    number_of_shards:1,
                    number_of_replicas:0
                }
                }    
            }),
            headers:{
                "content-type": "application/json; charset=UTF-8"
            }
        });
 
        done();
    }
    request();
});
  
hooks.after("/_cluster/settings > GET > 200 > application/json",function(transactions, done){
  
    const request = async () => {
      
        var url = protocol + "://" + auth + "@" + host;
        
        // Deleting cluster
        const del = await fetch(url+'/books',{
            method: 'DELETE'
        });

        done();
    }   
    request();
});  
