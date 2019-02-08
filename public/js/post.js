$(document).ready(function() {
  var bodyInput = $("#body");
  var titleInput = $("#title");

  $("#submit").on("click", handlePostSubmit);

  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var userId;

  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  }

  handlePostSubmit(event) {
      event.preventDefault();

      if(!titleInput.val().trim() || !bodyInput.val().trim()) {
          return;
      }

      var newPost = {
          title: titleInput.val().trim(),
          body: bodyInput.val().trim()
      };

      if(updating) {
          newPost.id = postId;
          updatePost(newPost);
      } else {
          submitPost(newPost);
      };
  };

  function submitPost(post) {
    $.post("/api/posts", post, function() {
      window.location.href = "/blog";
    });
  }

  function getPostData(id, type) {
      var queryUrl;
      if (type === "post") {
          queryUrl = "/api/posts/" + id;
          break;
      } else {
          return;
      }

      $.get(queryUrl, function(data) {
          if (data) {
              console.log(data.postId || data.id);

              titleInput.val(data.title);
                bodyInput.val(data.body);

                updating = true;
          }
      })
  }

  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
      .then(function() {
        window.location.href = "/blog";
      });
  }
});
