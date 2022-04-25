
// Connecting to the server.
var host = "search-movies-hqrmd5q7cqb7ru7tbypeicwsy4.us-east-1.es.amazonaws.com";
var protocol = "https";
var auth = "sofigarg:T@rget2023";

// Using Client in JS
var { Client } = require("@opensearch-project/opensearch");

// Creating Client
var client = new Client({
    node: protocol + "://" + auth + "@" + host,
  });
  
console.log ("connected: " + client);

// Hooks 

var hooks = require('hooks');

// PING API

hooks.before("/ > GET > 200 > application/json",function(transactions){
    transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";
});

// Cat Indices without Index

hooks.before("/_cat/indices > GET > 200 > application/json",function(transactions){
    transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";
});


// Cat Indices with Index: "books"

hooks.before("/_cat/indices/{index} > GET > 200 > application/json",function(transactions,done) {
    transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";

     // Create an index with non-default settings.
        var index_name = "books";
        var settings = {
          settings: {
            index: {
              number_of_shards: 4,
              number_of_replicas: 3,
            },
          },
        };
      
        var response = client.indices.create({
          index: index_name,
          body: settings,
        });
      
        console.log("Creating Index: Before Cat-Indices with Index");

        var document = {
            title: "The Outsider",
            author: "Stephen King",
            year: "2018",
            genre: "Crime fiction",
        };

        var id = "1";


        var response = client.index({
            id: id,
            index: index_name,
            body: document,
            refresh: true,
        });

        console.log("Adding document: Before Cat-Indices with Index");
    done();

});

hooks.after("/_cat/indices/{index} > GET > 200 > application/json",function(transactions){


        var index_name = "books";
      
        // Delete the index.
        var response = client.indices.delete({
            index: index_name,
        });
  
        console.log("Deleting index: After Cat-Indices with Index");
        

});

// Cat Nodes

hooks.before("/_cat/nodes > GET > 200 > application/json",function(transactions){
    transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";
});


// Get cluster Settings

hooks.before("/_cluster/settings > GET > 200 > application/json",function(transactions){
    transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";
    // Create an index with non-default settings.
    var index_name = "books";
    var settings = {
      settings: {
        index: {
          number_of_shards: 4,
          number_of_replicas: 3,
        },
      },
    };
  
    var response = client.indices.create({
      index: index_name,
      body: settings,
    });
  
    console.log("Creating Index: Before GET cluster stettings:");
});

hooks.after("/_cluster/settings > GET > 200 > application/json",function(transactions){


    var index_name = "books";
  
    // Delete the index.
    var response = client.indices.delete({
        index: index_name,
    });

    console.log("Deleting index: After GET cluster settings. ");

});


// Put cluster settings

hooks.before("/_cluster/settings > PUT > 200 > application/json",function(transactions){
    transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";

    // Create an index with non-default settings.
    var index_name = "books";
    var settings = {
      settings: {
        index: {
          number_of_shards: 4,
          number_of_replicas: 3,
        },
      },
    };
  
    var response = client.indices.create({
      index: index_name,
      body: settings,
    });
  
    console.log("Creating Index: Before PUT cluster stettings:");

    var requestBody = transactions.request.body;

    var persistent = {
        persistent: {
            cluster: {
                max_shards_per_node: 500,
          },
        },
      };
    
    // hooks.log(persistent);
    transactions.request.body = JSON.stringify(persistent);

});

hooks.after("/_cluster/settings > PUT > 200 > application/json",function(transactions){


    var index_name = "books";
  
    // Delete the index.
    var response = client.indices.delete({
        index: index_name,
    });

    console.log("Deleting index: After PUT cluster settings ");

});

// Put mapping

// 
//   currently commented.


// search post

// 
//    currently commented


// Delete Index

hooks.before("/{index} > DELETE > 200 > application/json",function(transactions){
    transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";
      
        // Create an index with non-default settings.
        var index_name = "books";
        var settings = {
          settings: {
            index: {
              number_of_shards: 4,
              number_of_replicas: 3,
            },
          },
        };
      
        var response = client.indices.create({
          index: index_name,
          body: settings,
        });
      
        console.log("Creating Index: Before Delete Index Api.");


});


// Create Index API

hooks.before("/{index} > PUT > 200 > application/json",function(transactions){
    transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";
});

hooks.after("/{index} > PUT > 200 > application/json",function(transactions){


    var index_name = "books";
  
    // Delete the index.
    var response = client.indices.delete({
        index: index_name,
    });

    console.log("Deleting index: After creating index ");

});

// Get document with type: _doc

hooks.before("/{index}/_doc/{id} > GET > 200 > application/json",function(transactions) {
    transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";

     // Create an index with non-default settings.
        var index_name = "books";
        var settings = {
          settings: {
            index: {
              number_of_shards: 4,
              number_of_replicas: 3,
            },
          },
        };
      
        var response = client.indices.create({
          index: index_name,
          body: settings,
        });
      
        console.log("Creating Index: Before get document");

        var document = {
            title: "The Outsider",
            author: "Stephen King",
            year: "2018",
            genre: "Crime fiction",
        };

        var id = "1";


        var response = client.index({
            id: id,
            index: index_name,
            body: document,
            refresh: true,
        });

        console.log("Adding document: Before get document");


});

hooks.after("/{index}/_doc/{id} > GET > 200 > application/json",function(transactions){


        var index_name = "books";
      
        // Delete the index.
        var response = client.indices.delete({
            index: index_name,
        });
  
        console.log("Deleting index: After get document ");

});

// Get document with type: _source

hooks.before("/{index}/_source/{id} > GET > 200",function(transactions) {
    transactions.expected.headers['Content-Type'] =  "application/json; charset=UTF-8";

     // Create an index with non-default settings.
        var index_name = "books";
        var settings = {
          settings: {
            index: {
              number_of_shards: 4,
              number_of_replicas: 3,
            },
          },
        };
      
        var response = client.indices.create({
          index: index_name,
          body: settings,
        });
      
        console.log("Creating Index: Before get document");

        var document = {
            title: "The Outsider",
            author: "Stephen King",
            year: "2018",
            genre: "Crime fiction",
        };

        var id = "1";


        var response = client.index({
            id: id,
            index: index_name,
            body: document,
            refresh: true,
        });

        console.log("Adding document: Before get document");


});

hooks.after("/{index}/_source/{id} > GET > 200",function(transactions){

        var index_name = "books";
      
        // Delete the index.
        var response = client.indices.delete({
            index: index_name,
        });
  
        console.log("Deleting index: After get document ");

});


// put index mapping 

//
//  currently commented:



//  post index search.

//
//    currently commented