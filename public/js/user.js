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

  // var newUser;

  // $("#submit").on("click", function(event) {
  //   event.preventDefault();
  //   console.log("hello");

  //   newUser = {
  //     user_name: $("#sign-username")
  //       .val()
  //       .trim(),
  //     user_password: $("#sign-password")
  //       .val()
  //       .trim()
  //   };

  //   $.get("/api/users", function(data) {
  //     // if (!data.length) {
  //     //   createUser();
  //     // }

  //     for (var i = 0; i < data.length; i++) {
  //       if (
  //         newUser.user_name === data[i].name &&
  //         newUser.user_password === data[i].password
  //       ) {
  //         console.log("matched");
  //         window.location.href = "/user/" + data[i].id;
  //       }
  //     }

  //     createUser();
  //   });
  // });

  // function createUser() {
  //   $.ajax("/api/users", {
  //     type: "POST",
  //     data: newUser
  //   }).then(function() {
  //     console.log("user added");
  //   });
  // }
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
          window.location.href = "/user/" + data[i].id;
          alert("User already exists!");
          flag = false;
          break;
        }
      }
      console.log(flag);
      if (flag) {
        var id = data.length + 1;
        createUser();
        window.location.href = "/user/" + id;
      }
    });
  });

  $("#login-submit").on("click", function() {
    var user = {
      user_name: $("#login-username")
        .val()
        .trim(),
      user_password: $("#login-password")
        .val()
        .trim()
    };
    $.get("/api/users", function(data) {
      var flag = true;
      for (var i = 0; i < data.length; i++) {
        var currentUser = data[i].id;
        if (
          user.user_name === data[i].name &&
          user.user_password === data[i].password
        ) {
          window.location.href = "/user/" + data[i].id;

          flag = false;
          break;
        }
      }

      console.log(flag);
      if (flag) {
        console.log("Wrong login");
        alert("Wrong login!");
        window.location.reload();
      }

      sessionStorage.setItem("user-id", currentUser);
    });
  });

  //posting new post to api.
  $("#post-submit").on("click", function(event) {
    event.preventDefault();
    post();
    window.location.href = "/user/" + sessionStorage.getItem("user-id");
  });

  function post() {
    var newPost = {
      new_title: $("#new-title")
        .val()
        .trim(),
      new_body: $("#text-post")
        .val()
        .trim(),
      image: $("#image").val(),
      user_id: sessionStorage.getItem("user-id")
    };
    console.log(newPost);
    $.ajax("/api/posts", {
      type: "POST",
      data: newPost
    }).then(function() {
      console.log("post added");
    });
  }

  $("#table1 tr").on("click", function(event) {
    event.preventDefault();
    var postTitle = $(this).children()[1].innerHTML;
    window.location.href = "/post/" + postTitle;
  });
  $("#table2 tr").on("click", function(event) {
    event.preventDefault();
    var postTitle = $(this).children()[0].innerHTML;
    window.location.href = "/post/" + postTitle;
    console.log($(this).children()[0].innerHTML);
    console.log("hello");
  });
  function animate() {
    $(".page-title").hover(function() {
      $(this).addClass("animated fadeIn");
    });
    $(".page-title").removeClass("animated fadeIn");
  }
  animate();
});
