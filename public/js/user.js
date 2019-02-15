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

  $("#close-button").on("click", function() {
    $("#modal2").hide();
    $("#modal3").hide();
  });

  $(".login-form").on("submit", function(event) {
    event.preventDefault();
  });

  $("#submit").on("click", function(event) {
    event.preventDefault();
    console.log("hello");
    var newUser = {
      user_name: $("#sign-username")
        .val()
        .trim()
        .toString(),
      user_password: $("#sign-password")
        .val()
        .trim()
        .toString()
    };

    function createUser() {
      $.ajax("/api/users", {
        type: "POST",
        data: newUser
      }).then(function() {
        console.log("user added");
        console.log(newUser.id);
      });
    }

    $.get("/api/users", function(data) {
      var flag = true;

      for (var i = 0; i < data.length; i++) {
        if (
          newUser.user_name === data[i].name &&
          newUser.user_password === data[i].password
        ) {
          console.log("matched");
          window.location.href = "/user/" + data[i];
          alert("User already exist!");
          flag = false;
          break;
        }
      }
      console.log(flag);
      if (flag) {
        createUser();
        console.log(newUser.id);
        console.log(data.length);
        var ref = data.length + 1;
        window.location.href = "/user/" + ref;
        // location.reload();
      }
    });
  });
});

$("#post-submit").on("click", function(event) {
  event.preventDefault();
  var newPost = {
    title: $("#title")
      .val()
      .trim(),
    body: $("#text-post")
      .val()
      .trim()
  };

  $.ajax("/api/posts", {
    type: "POST",
    data: newPost
  }).then(function() {
    console.log("post added");
  });
});
