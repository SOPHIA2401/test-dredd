const https = require('https');
const fetch = require('node-fetch')
const hooks = require('hooks');
const fs = require('fs')

var host = "";
var protocol = "https";
var auth = "";

// Reading .txt file to set URL  
const data = fs.readFileSync('url.txt', {encoding:'utf8', flag:'r'});

hooks.before("/{index} > DELETE > 200 > application/json",function(transactions,done){
    transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";

    const request = async () => {
        text = data.toString();
        text = text.split(" ");
        host = text[0].substring(8,text[0].length);
        auth = text[1];

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
