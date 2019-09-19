//Mongdb connection: mongodb+srv://bjwealthy:<password>@cluster0-odz6x.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');

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

//post route for creating a thing
app.post('/api/stuff', (req, res, next) => {
    const thing = new Thing({
        //id field is generated automatically by mongo
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
//the save() method returns a promise so we can have a then() block 
//that will send the response back to the frontend.   
    });
    thing.save().then(
        () => { //bcos this is sending an http request, we always need to send a response back to prevent the request from timing out 
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        } 
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//route for one thing: id is a variable/dynamic part of the path, so we do :id
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({
        _id: req.params.id //to access a dynamic variable we use 'params'
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});

//modify a thing: using a 'put' request:
app.put('/api/stuff/:id', (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing).then(
        () => {
            res.status(201).json({
                message: 'Thing updated successfully!'
            });
        }
    ).catch(
        (eror) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//delete a thing:
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Item Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

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
//read a single thing
app.use('/api/stuff', (req, res, next) => {
    Thing.find().then(
        (things) => {
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error   
            });
        }
    );
});

module.exports = app;

//you can upload iamges here:
//https://commons.wikimedia.org/wiki/Main_Page

//https://upload.wikimedia.org/wikipedia/commons/e/e3/Canon_EOS_60D_01.jpg