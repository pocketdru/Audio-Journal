var db = require("../models");

module.exports = function(app) {
  // Get all posts
  // app.get("/api/posts", function(req, res) {
  //   var query = {};
  //   if (req.query.user_id) {
  //     query.UserId = req.query.user_id;
  //   }

  //   db.Post.findAll({
  //     where: query,
  //     include: [db.User]
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  app.get("/api/users", function(req, res) {
    db.User.findAll({
      include: [db.Post]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  app.post("/api/users", function(req, res) {
    db.User.create({
      name: req.body.user_name,
      password: req.body.user_password
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  //posts not working
  app.get("/api/posts", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.post("/api/posts", function(req, res) {
    db.Post.create({
      title: req.body.title,
      body: req.body.body
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  // // Create a new post
  // app.post("/api/posts", function(req, res) {
  //   db.Post.create(req.body).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  // // Delete post by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  // // update posts
  // app.put("/api/posts", function(req, res) {
  //   db.Post.update(req.body, {
  //     where: {
  //       id: req.body.id
  //     }
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });
};
