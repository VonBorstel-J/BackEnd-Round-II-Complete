const mongoose = require("mongoose");
const User = require("./models/user.js");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const productsRouter = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes.js");
const Product = require("./models/products");

app.use("/api", cartRoutes);
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/css/styles.css", (req, res) => {
  res.set("Content-Type", "text/css");
  res.sendFile(path.join(__dirname, "css", "styles.css"));
});

app.get("/js/addCart.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(path.join(__dirname, "public", "js", "addCart.js"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "cart.html"));
});
app.get('/vegas.min.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'node_modules/vegas/dist/vegas.min.js'));
});

app.get('/vegas.min.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'node_modules/vegas/dist/vegas.min.css'));
});


app.use("/api/products", productsRouter);

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

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
