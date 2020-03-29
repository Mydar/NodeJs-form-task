//Assign the modules to Variables
var http = require('http');
var fs = require('fs');
let { parse } = require('querystring')


http.createServer(function(req, res) {
// when the form page is loaded, the else block is ran because them method will be "GET" and not "POST" which is when the form is submitted.
  
if (req.method === "POST") {
// Passing the input value (message) to the body variable so it can be passed into the writfile function.
  
  let body = "";  
  req.on('data', (chunk) => {
  // convert data to string and add to the body variable.
            
    body += chunk.toString();
             
    //The fs.writeFile function, creates a file message.txt, and the content of the second parameter is written into the file.

    fs.writeFile('message.txt', body, (err) => {
      if (err) throw err;
      console.log('Data has been been written to message.txt!');
    })
  }); 
  
  req.on('end', () => {
    console.log(parse(body));
  })
        
  // res.end ensures that the program stops running and the end content, is displayed.
  
  res.end('Your Message Has Been Sent! Thank you.');
} else {
  // This is displayed when the localhost:8080 is loaded to allow user input.
      
  res.writeHead(200, {'content-type': 'text/html'});
  res.write(`
    <!DOCTYPE html>
    <html>
    	<form action="/message" method="POST">
    		<input type="text" name="message" placeholder="Please Enter your message here"><br>
    		<button type="submit">SEND MESSAGE</button>
    	</form>
   	</html>
  `);
      
  res.end();
}   

}).listen(8080);
    
