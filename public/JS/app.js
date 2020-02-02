$(document).ready(() => {
  console.log("ready!");

  $(".scrape").on("click", () => {
    console.log("fire");
    $.ajax({
      method: "GET",
      url: "/scrape"
    }).then(function(data) {
      location.reload();
    });
  });
});
