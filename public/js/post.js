$(document).ready(function () {


    $("[id='update']").on("click", function (event) {
        event.preventDefault();
        var id = $(this).parent().attr("id");

        // console.log($(this).parent().attr("id"));
        // var data = {
        //     ti: $(this).parent();
        // }
        var t = $(this).parent().parent().text();
        var r = "ddd";
        console.log(t);
        $.ajax({
            method: "PUT",
            url: "/api/posts/" + id,
            data: r
        }).then(function () {
            console.log("Your post with an ID: " + id + " has been updated.");

        });
    });

    $("[id='delete']").on("click", function (event) {
        event.preventDefault();

        var id = $(this).parent().attr("id");
        console.log(id);
        $.ajax({
            method: "DELETE",
            url: "/api/posts/" + id
        }).then(function () {
            console.log("Your post with an ID: " + id + " has been deleted.");
        });
    });
});