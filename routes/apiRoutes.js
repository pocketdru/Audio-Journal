var db = require("../models");

module.exports = function(app) {
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

  // Delete post by id
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // update posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
