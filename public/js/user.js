$(document).ready(function() {
  $("#modal1").show();
  console.log("hi");

  $("#login").on("click", function() {
    $("#modal1").hide();
    $("#modal2").show();
  });

  $("#sign-up").on("click", function() {
    $("#modal1").hide();
    $("#modal3").show();
  });

  $(".close-button").on("click", function() {
    $("#modal2").hide();
    $("#modal3").hide();
    $("#modal1").show();
  });

  $(".login-form").on("submit", function(event) {
    event.preventDefault();
  });

  var newUser;

  $("#submit").on("click", function(event) {
    event.preventDefault();
    console.log("hello");

    newUser = {
      user_name: $("#sign-username")
        .val()
        .trim(),
      user_password: $("#sign-password")
        .val()
        .trim()
    };

    $.get("/api/users", function(data) {
      // if (!data.length) {
      //   createUser();
      // }

      for (var i = 0; i < data.length; i++) {
        if (
          newUser.user_name === data[i].name &&
          newUser.user_password === data[i].password
        ) {
          console.log("matched");
          window.location.href = "/user/" + data[i].id;
        }
      }

      createUser();
    });
  });

  function createUser() {
    $.ajax("/api/users", {
      type: "POST",
      data: newUser
    }).then(function() {
      console.log("user added");
    });
  }

  var currentUser;

  $("#login-submit").on("click", function() {
    $.get("/api/users", function(data) {
      var user = $("#login-username").val().trim();
      var password = $("#login-password").val().trim();
      for (var i=0; i < data.length; i++) {
        if (user === data[i].name && password === data[i].password) {
          currentUser = data[i].id;
          window.location.href= "/user/" + currentUser;
          console.log("logged in as " + currentUser);
        } else {
          console.log("wrong login");
        }
      }
      sessionStorage.setItem("user-id", currentUser);
    });
  });

  //posting new post to api.
  $("#post-submit").on("click", function(event) {
    event.preventDefault();
    var newPost = {
      new_title: $("#new-title").val().trim(),
      new_body: $("#text-post").val().trim(),
      user_id: sessionStorage.getItem("user-id")
    };
    console.log(newPost);
    // $.ajax("/api/posts", {
    //   type: "POST",
    //   data: newPost
    // }).then(function() {
    //   console.log("post added");
    // });
    $.post("/api/posts", newPost, function() {
      window.location.href = "/user/" + sessionStorage.getItem("user-id");
    });

  });

  function allPosts() {
    $.get("/api/posts", function(data) {
      for(var i=0; i < data.length; i++) {
        var newRow = $("<tr>").append(
          $("<td>").text(data[i].UserId),
          $("<td>").text(data[i].title),
          $("<td>").text(data[i].body),
          $("<td>").text(data[i].createdAt)
        );
        $("#table-body").append(newRow);
      }
    });
  }

  allPosts();

  $("tr").on("click", function() {
    console.log("working");
  });

});
