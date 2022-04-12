var searchBtn = $("#searchBtn");
var petsSectionEl = $("#pets");

// fetch("https://api.petfinder.com/v2/animals", {
//     method: 'GET',
//     headers: new Headers({
//         'Authorization': 'Bearer ' +  petFinderKey
//     })
// })
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   console.log(data);
// });

searchBtn.on("click", displayPetCards());

function displayPetCards() {

    for (var i = 0; i < 9; i++) {
        var tempCardEl = $("<div class='card w-96 bg-base-100 shadow-xl m-3'>");
        petsSectionEl.append(tempCardEl);

        var tempCardImg = $("<figure><img src='https://api.lorem.space/image/shoes?w=400&h=225' alt='Shoes' /></figure>");
        tempCardEl.append(tempCardImg);

        var tempCardBody = $("<div class='card-body bg-secondary'>");
        tempCardEl.append(tempCardBody);

        var tempCardHeader2 = $("<h2 class='card-title'>");
        tempCardHeader2.text("Animal Name");
        tempCardBody.append(tempCardHeader2);

        var tempCardDescription = $("<p>");
        tempCardDescription.text("If a dog chews shoes whose shoes does he choose?");
        tempCardBody.append(tempCardDescription);

        var tempCardAction = $("<div class='card-actions justify-end'>");
        tempCardBody.append(tempCardAction);

        var tempCardBtn = $("<button class='btn btn-primary'>View</button>");
        tempCardAction.append(tempCardBtn);
    }

}