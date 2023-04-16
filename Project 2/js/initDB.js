const { connect, connection } = require('mongoose'); /* This will start the connection to mongo */

const { config } = require('dotenv'); /* This is a destructured version of require('dotenv').config() */


/* The following codes purpose is to create a reusable block of code so that we can import it into another portion of the Project, for example the start.js file */

module.exports = () => {
 config(); // calling the dotenv config from above here (allowing us to use the .env file information now)

const uri = process.env.DB_URI; // this line of code is calling the URI variable from the .env file 

connect(uri, {                                  //This is a Mongoose method that will allow us to connect to and define options within Mongoose
        dbName: process.env.DB_NAME,           //now that the variable is called, there needs to be a connection established, with that we can add options in as well as call 
        user: process.env.DB_USER,            //multiple variables within those options.
        pass: process.env.DB_PASS,
        useNewUrlParser: true,                  // the following codes are set to TRUE or FALSE to avoid deprecation warnings
        useUnifiedTopology: true,           
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => {                                                   // The connect method further utilizes the *Promise Method* which allows us to prepare for outcomes 
            console.log('Connection estabislished with MongoDB');       // of code that will run in succession or asynchronously
        })                                                              // so to fulfill the requirements for the connection method the use of .then() & .catch() will be used to
        .catch(error => console.error(error.message));                  // show whether or not the connection to Mongo has been created. 
    }