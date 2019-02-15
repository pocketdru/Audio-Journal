var db = require("../models");
// var name = require("../public/js/user");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/new", function(req, res) {
    res.render("partials/new");
  });


  app.get("/home", function(req, res) {
    console.log("get route");
    var d = db.Post;
    d.findAll({
      include: [db.User]
    }, function(data) {
      console.log("hello" + data);
    }).then(test => {
      res.render("partials/home", {test});
    })
  });

  app.get("/user/:id", function(req, res) {
    db.User.findAll({
      where: {id: req.params.id},
      include: [db.Post]
    }).then(data => {
      console.log(data[0].Posts[0].dataValues.title);
      var data1 = data[0].Posts;
      res.render("partials/user-homepage", {data1});
    })
  });

  // app.get("/post", function(req, res) {
  //   res.render("partials/post-page", {name});
  // })

  app.get("/user-homepage", function(req, res) {
    res.render("partials/user-homepage");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
