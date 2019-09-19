mongoose = require('mongoose');
//our data schema
const thingSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    price: {type: Number, required: true},
});

//by using mongoose, we model 'Thing' using the 'thingSchema' model:
module.exports = mongoose.model('Thing', thingSchema);