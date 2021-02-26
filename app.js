const express = require('express');
const mongoose = require('./db/connection');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Upload routes files
const project_routes = require('./routes/projects');

// Middlewares
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes
app.use('/api', project_routes);

// Start server
app.listen(app.get('port'), () => {
    console.log(`App listening on port ${ app.get('port') }`);
});