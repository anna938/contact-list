//const mongodb = require('mongodb');
//const MogoClient = mongodb.MongoClient;

//MongoClient.connect('mongodb+srv://ContactListDBUser:<password>@cluster0.birwd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
//    .then(result => {
//        console.log(result);
//    })
//    .catch(error => {
//        console.log(error);
//    })

const mongoose = require("mongoose");



const mongoConnect = (callback => {
    mongoose.connect("mongodb+srv://ContactListDBUser:Annatomituni@cluster0.birwd.mongodb.net/contactlistDB?retryWrites=true&w=majority")
        .then(result => {
            console.log('connected');;
            callback(result)
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = mongoConnect;



