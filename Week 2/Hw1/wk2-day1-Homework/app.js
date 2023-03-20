/*var stats = [
    {
        'city': 'San Juan', 
        'zip': '00926', 
        'state': 'PR', 
        'income': '34781',
        'age': '44'
    },
    {
        'city': 'Corona', 
        'zip': '11368', 
        'state': 'NY', 
        'income': '50797',
        'age': '32'
    },
    {
        'city': 'Chicago', 
        'zip': '60629', 
        'state': 'IL', 
        'income': '42019',
        'age': '31'
    },
    {
        'city': 'El Paso', 
        'zip': '79936', 
        'state': 'TX', 
        'income': '54692',
        'age': '31'
    },
    {
        'city': 'Los Angeles', 
        'zip': '90011', 
        'state': 'CA', 
        'income': '36954',
        'age': '28'
    },
    {
        'city': 'Norwalk', 
        'zip': '90650', 
        'state': 'CA', 
        'income': '66453',
        'age': '35'
    }
] */



var MongoClient = require('mongodb').MongoClient; 
var dbo = db.db("statsdb");
var url = "mongodb://localhost:27017/nodemongo";


MongoClient.connect(url,{ 
    useNewUrlParser: true, useUnifiedTopology: true
}); 

dbo.collection("uscensus").find({income:{$gt:0}})

db.uscensus.update({"state":"AK"},{$set:{"income":38910}})

db.uscensus.find().sort({"state": 1})