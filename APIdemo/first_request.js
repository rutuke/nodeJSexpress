var request = require('request');
request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(error, response,body){
    console.log('error:', error); // prints error if error occured
    console.log('statusCode:', response && response.statusCode );//prints repsponse status code
    console.log('body:', body); // prints the html for home page.
});