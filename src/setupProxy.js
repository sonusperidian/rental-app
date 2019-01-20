const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/api/v1/user/*', 
{ target: 'http://localhost:3001/' }
));
    app.use(proxy('/api/v1/*', 
        { target: 'http://localhost:3001/' }
    ));
    app.use(proxy('/api/v1/booking/*', 
    { target: 'http://localhost:3001/' }
    ));
    app.use(proxy('/api/v1/rentals/*', 
    { target: 'http://localhost:3001/' }
));
app.use(proxy('/api/v1/rentals/rentals/*', 
{ target: 'http://localhost:3001/' }
));

}