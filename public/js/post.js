$(document).ready(function () {


    $("body").on("click", "#update", function (event) {
        event.preventDefault();
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        // deletePost(currentPost.id);
        console.log(currentPost);
        $.ajax({
            method: "PUT",
            url: "/api/posts/" + id,
            // data: newPost
        }).then(function () {
            // window.location.href = "/blog";
            // location.reload();
        });
    });

    $("#delete").on("click", function (event) {
        event.preventDefault();

        var id = $(this).data("id");
        console.log("e");

        $.ajax({
            method: "DELETE",
            url: "/api/posts/" + id
        }).then(function () {
            console.log("Your post with an ID: " + id + "has been deleted.");
        });
    });
});
