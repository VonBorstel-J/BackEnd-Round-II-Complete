const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true},
    createdAt: {
    type: Date,
    default: Date.now,
    },
    });

    UserSchema.pre("save", function (next) {
      const user = this;
      
      if (!user.isModified("password")) {
      return next();
      }
      
      bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) {
      return next(err);
      }
      
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
      
        user.password = hash;
        next();
      });
      });
      });
      UserSchema.methods.comparePassword = function (candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
        return callback(err);
        }
        callback(null, isMatch);
        });
        };
        
        const User = mongoose.model("User", UserSchema);
        module.exports = User;










// const User = mongoose.model('User', userSchema, "users");

// module.exports = User;

// // Authentication System

// // Use bcrypt to hash & salt the password
// const bcrypt = require("bcrypt");

// // Create a new user
// app.post("/signup", (req, res) => {
//   let user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 10)
//   });

//   user.save(err => {
//     if (err) return res.status(500).send("Error saving user");

//     res.status(200).send("User created successfully");
//   });
// });

// Authenticate user
// app.post("/login", (req, res) => {
//   User.findOne({ email: req.body.email }, (err, user) => {
//     if (err) return res.status(500).send("Error on the server.");
//     if (!user) return res.status(404).send("No user found.");

//     let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//     if (!passwordIsValid) return res.status(401).send("Wrong password.");

//     // If credentials are correct, generate a token
//     let token = jwt.sign({ id: user._id }, config.secret, {
//       expiresIn: 86400 // expires in 24 hours
//     });

//     res.status(200).send({ auth: true, token: token });
//   });
// });