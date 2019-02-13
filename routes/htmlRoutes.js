var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });

    // db.Posts.findAll({}).then(function(data) {
    //   var post = {
    //     posts: data
    //   };
    //   res.render("index");
    // });
    res.render("index");
  });

  app.get("/new", function(req, res) {
    res.render("partials/new");
  });
  app.get("/home", function(req, res) {
    res.render("partials/home");
  });
  // app.get("/user", function(req, res) {
  //   res.render("partials/user-homepage");
  // });
  app.get("/user/:id", function(req, res) {
    console.log(req.params.id);
    db.User.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
      res.render("partials/user-homepage", {
        id: dbUser
      });
    });
  });
  app.get("/user-homepage", function(req, res) {
    res.render("partials/user-homepage");
  });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
