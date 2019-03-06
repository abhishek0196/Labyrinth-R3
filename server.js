var http = require('http');
var url = require('url')

const admin = require('firebase-admin');

var serviceAccount = require('./yourkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

var server = http.createServer ( function(request,response){

    response.writeHead(200,{"Content-Type":"text/html"});
    if(request.method == "GET")
        {
            response.end("received GET request.")
        }
    else if(request.method == "POST")
        {            
            console.log("Yes ::");
		    var q = url.parse(request.url, true).query;
  		    var txt = q.year + " " + q.month;
            response.end("received POST request.  "+txt);        
            var cityRef = db.collection('cities').doc('DC');
            // Set the 'capital' field of the city
            var updateSingle = cityRef.update({capital: true});
        }
    else
        {
            response.end("Undefined request .");
        }
});

server.listen(8000);
console.log("Server running on port 8000");
