var request = require('request');
request('http://www.google.com', function(error, response,body){
    console.log('error:', error); // prints error if error occured
    console.log('statusCode:', response && response.statusCode );//prints repsponse status code
    console.log('body:', body); // prints the html for home page.
});