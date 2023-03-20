const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


const fruitSchema = new mongoose.Schema ({ 
    name: String
}); 

const Fruit = mongoose.model('Fruit', fruitSchema);


const apple = new Fruit({ name: 'apple' }); 
console.log(apple.name); //apple 