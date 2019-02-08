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

  $(".sign-form").on("submit", function(event) {
    event.preventDefault();

    var newUser = {
      name: $("#sign-user")
        .val()
        .trim(),
      password: $("#sign-password")
        .val()
        .trim()
    };
  });
});
