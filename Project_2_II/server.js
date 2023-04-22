
const mongoose = require("mongoose");
const User = require("./models/user.js");
const express = require("express");
const app = express();
const mime = require('mime');
const PORT = process.env.PORT || 3000;
const path = require("path");
const productsRouter = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes.js");
const Product = require("./models/products");


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});


// Set view engine to use EJS
app.set("view engine", "ejs");

// Routes for cart API
app.use("/api", cartRoutes);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static('/views/ejs', {
  setHeaders: (res, path) => {
    res.setHeader('Content-Type', mime.getType(path));
  }
}));
app.use(express.static('public', {
  setHeaders: (res, path) => {
    res.setHeader('Content-Type', mime.getType(path));
  }
}));
app.use('/vegas', express.static(path.join(__dirname, 'vegas')));


//MIME FIXES
app.get('/css/styles.css', (req, res) => {
  res.set('Content-Type', mime.getType('css'));
  res.sendFile(path.join(__dirname, 'css', 'styles.css'));
});

app.get('/vegas.min.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'vegas', 'vegas.min.js'));
});

app.get('/vegas.min.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'vegas', 'vegas.min.css'));
});

app.get('/public/images/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'public', 'images', filename);
  const contentType = mime.getType(filePath);
  res.setHeader('Content-Type', contentType);
  res.sendFile(filePath);
});


// Set up views directory
app.set("views", path.join(__dirname, "views"));

// Homepage route
app.get("/", (req, res) => {
  res.render("home");
});

// Products page route
app.get("/products", (req, res) => {
  res.render("products");
});

// Cart page route
app.get("/cart", (req, res) => {
  res.render("cart");
});

// Routes for products API
app.use("/api/products", productsRouter);

// User registration route
app.post("/users", (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const newUser = new User({
    email,
    password,
    firstName,
    lastName,
  });
  newUser
    .save()
    .then(() => {
      res.status(201).json({ message: "User created successfully" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "An error occurred while creating user", error });
    });
});

// Connect to MongoDB Atlas and start server
mongoose
  .connect(
    "mongodb+srv://j:jvb123@project2.p88qgof.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database", err);
  });

