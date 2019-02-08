$(document).ready(function() {
  var loginName = $("#login-username");
  var loginPassword = $("#login-password");
  var signName = $("#sign-username");
  var signPassword = $("#sign-password");

  $(document).on("submit", userFormSubmit);

  function userFormSubmit(event) {
    event.preventDefault();

    if (
      !signName
        .val()
        .trim()
        .trim()
    ) {
      return;
    }

    upsertUser({
      name: signName.val().trim(),
      password: signPassword.val().trim()
    });
  }

  function upsertUser(userData) {
    $.post("/api/users", userData).then(getUsers);
  }

  //   function createUserRow(userData) {
  //       var new Tr = $("");
  //   }

  // function getUsers() {
  //     $.get("/api/users", function(data){
  //         var = rowsToAdd = [];
  //         for (var i = 0; i < data.length; i++) {
  //             rowsToAdd.push(create)
  //         }
  //     })
  // }
});
