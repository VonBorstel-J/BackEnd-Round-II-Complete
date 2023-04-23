global.require = require;
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user.js");
const express = require("express");
const app = express();
const mime = require("mime");
const PORT = process.env.PORT || 3000;
const path = require("path");
const productsRouter = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes.js");
const Product = require("./models/products");
const axios = require("axios");
const { createSSRApp } = require("vue");
const { renderToString } = require("@vue/server-renderer");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

require("dotenv").config();

// configure passport
passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    // query the database to find the user with the given email
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

// authentication endpoint
app.post(
  "/api/auth/login",
  passport.authenticate("local"),
  function (req, res) {
    res.json({ message: "Successfully logged in!", user: req.user });
  }
);

// logout endpoint
app.post("/api/auth/logout", function (req, res) {
  req.logout();
  res.json({ message: "Successfully logged out!" });
});


if (!process.env.MONGODB_URI) {
  console.error("MongoDB URI not found. Please check your .env file");
  process.exit(1);
}

// Set view engine to use EJS
app.set("view engine", "ejs");

// Routes for cart API
app.use("/api", cartRoutes);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
app.use('/components', express.static(path.join(__dirname, 'components')));
app.use(
  express.static("/views/ejs", {
    setHeaders: (res, path) => {
      res.setHeader("Content-Type", mime.getType(path));
    },
  })
);
app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      res.setHeader("Content-Type", mime.getType(path));
    },
  })
);
app.use("/vegas", express.static(path.join(__dirname, "vegas")));
app.use(express.static("components"));

// MIME FIXES
app.get("/css/styles.css", (req, res) => {
  res.set("Content-Type", mime.getType("css"));
  res.sendFile(path.join(__dirname, "css", "styles.css"));
});

app.get("/vegas.min.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(path.join(__dirname, "vegas", "vegas.min.js"));
});

app.get("/vegas.min.css", (req, res) => {
  res.set("Content-Type", "text/css");
  res.sendFile(path.join(__dirname, "vegas", "vegas.min.css"));
});

app.get("/public/images/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "public", "images", filename);
  const contentType = mime.getType(filePath);
  res.setHeader("Content-Type", contentType);
  res.sendFile(filePath);
});

// Set up views directory
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views", "ejs"),
]);

// Homepage route
app.get("/", async (req, res) => {
  try {
    const user = req.user; // Get the user from the request object
    const app = createSSRApp({
      data: () => ({ msg: "hello" }),
      template: `<div>{{ msg }}</div>`,
    });

    const html = await renderToString(app);
    res.render("home", { html, user }); // Pass the user variable to the template
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

// Cart page route
app.get("/cart", (req, res) => {
  res.render("cart", { user: req.user });
});

// Routes for products API
app.use("/api/products", productsRouter);

// User registration route
app.post("/users", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const user = await register(email, password, firstName, lastName);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating user" });
  }
});

// User login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await axios.post("http://localhost:3000/api/users/login", {
      email,
      password,
    });
    res.cookie("jwt", response.data.token, { httpOnly: true });
    res
      .status(200)
      .json({ message: "Logged in successfully", user: response.data.user });
  } catch (error) {
    res.status(400).json({ message: "Invalid email or password" });
  }
});

// User logout route
app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

// Error handling for 404 route
app.use((req, res, next) => {
  res.status(404).render("404");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Connect to MongoDB Atlas and start server
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database", err);
  });

module.exports = app;




