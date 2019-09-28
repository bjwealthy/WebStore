//Mongdb connection: mongodb+srv://bjwealthy:<password>@cluster0-odz6x.mongodb.net/test?retryWrites=true&w=majority

/*we cut all our routes from app.js and 
paste them in the router, as we register 
the routes to the router
NOTE: we replace all occurrences of app with router
*/
const express = require('express');
var router = express.Router()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
//expose the router
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();



mongoose.connect('mongodb+srv://bjwealthy:sokot777so18599@cluster0-odz6x.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((eror) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);     
    });


//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//convert the body into a usable json object:
app.use(bodyParser.json());

/***
 * we need to serve up our static images directory - tell 
 * our express app how to handle requests giong to /images
 */
app.use('/images', express.static(path.join(__dirname, 'images')));

//use the exposed router: any request sent to /api/stuff'
//will be sent to the router stuffRoutes
app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes);

//make app.js available outside
module.exports = router;
module.exports = app;




























/*
//create hardcoded things
//api
app.use('/api/stuff', (req, res, next) => {    
   
   
    const stuff = [
        {
            _id: 'qwerty',
            title: 'Bread',
            description: 'Morning food',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Canon_EOS_60D_01.jpg',
            price: 600,
            userId: 'asdf',
        },
        {
            _id: 'lkjhg',
            title: 'Milk',
            description: 'poytfgh',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Canon_EOS_60D_01.jpg',
            price: 0987,
            userId: 'ethbj',  
        },
        {
            _id: 'dfghj',
            title: 'Milo',
            description: 'vbntyu',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Canon_EOS_60D_01.jpg',
            price: 4567,
            userId: 'tyufgh',  
        },
    ];
});
*/


//you can upload images here:
//https://commons.wikimedia.org/wiki/Main_Page

//https://upload.wikimedia.org/wikipedia/commons/e/e3/Canon_EOS_60D_01.jpg