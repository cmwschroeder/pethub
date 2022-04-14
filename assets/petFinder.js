var searchBtn = $("#searchBtn");
var petsSectionEl = $("#pets");
var petTypeSelect = $("#petType");
var petLocationInput = $("#petLocation")
var errorModal = $("#errorModal");
var errorText = $("#errorText");
var closeModalEl = $("#closeModal");

var petFinderUrl = "https://api.petfinder.com/v2/animals";
var apiKey = "siwywcH8smVuYkQwaTxLaU7o5ukX7sk2DJNC8VmyzQEqEeABq8";
var apiSecret = "kFtKSHvS38045Ixyzok8EtG9BdouqbfU3CMdC1iK";

var apiAuthBearer;

var petsArray = [];
var currentPage = 1;

pullPetFinderAuth();

searchBtn.on("click", pullPetFinderData);

closeModalEl.on("click", function() {
    errorModal.removeClass("modal-open");

    searchBtn.attr("class", "btn btn-primary");
    searchBtn.text("Search");
});

function displayPetCards() {
    console.log(petsArray);

    searchBtn.attr("class", "btn btn-primary");
    searchBtn.text("Search");

    for (var i = 0; i < petsArray.length; i++) {
        var tempCardEl = $("<div class='card w-96 bg-base-100 shadow-xl m-3'>");
        petsSectionEl.append(tempCardEl);

        if (petsArray[i].photo === undefined) {
            if(petsArray[i].type === "Dog") {
                petsArray[i].photo = "../assets/media/nophotoDog.png";
            } else if (petsArray[i].type === "Cat") {
                petsArray[i].photo = "../assets/media/nophotoCat.png";
            } else if (petsArray[i].type === "Bird") {
                petsArray[i].photo = "../assets/media/nophotoBird.png";
            } else {
                petsArray[i].photo = "../assets/media/nophotoRabbit.png";
            }
        }

        var tempCardImg = $("<figure class='bg-cover h-96' style='background-image: url(\"" + petsArray[i].photo + "\");'</figure>");
        tempCardEl.append(tempCardImg);

        var tempCardBody = $("<div class='card-body bg-secondary'>");
        tempCardEl.append(tempCardBody);

        var tempCardHeader2 = $("<h2 class='card-title'>");
        tempCardHeader2.text(petsArray[i].name);
        tempCardBody.append(tempCardHeader2);

        var tempCardDescription = $("<p class='primary-content'>");
        tempCardDescription.text(petsArray[i].description);
        tempCardBody.append(tempCardDescription);

        var tempCardLocation = $("<p class='primary-content'>");
        tempCardLocation.text("Location: " + petsArray[i].city + ", " + petsArray[i].state);
        tempCardBody.append(tempCardLocation);

        var tempCardType = $("<p class='primary-content'>");
        tempCardType.text("Type: " + petsArray[i].type);
        tempCardBody.append(tempCardType);

        var tempCardAction = $("<div class='card-actions justify-end'>");
        tempCardBody.append(tempCardAction);

        var tempCardBtn = $("<a href='" + petsArray[i].url + "' target='_blank'><button class='btn btn-primary'>View</button></a>");
        tempCardAction.append(tempCardBtn);
    }

}

function pullPetFinderAuth() {
    fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&client_id=' + apiKey + '&client_secret=' + apiSecret
    })
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
       apiAuthBearer = data.access_token;
    pullPetFinderData();
    });
}

function pullPetFinderData() {
    searchBtn.attr("class", "btn loading");
    searchBtn.text("loading");

    var petFinderUrl = "https://api.petfinder.com/v2/animals";

    if (petTypeSelect.children("option:selected").val() === "All" && petLocationInput.val() === "") {
        petFinderUrl = "https://api.petfinder.com/v2/animals";
    } else if (petTypeSelect.children("option:selected").val() !== "All" && petLocationInput.val() === "") {
        petFinderUrl = "https://api.petfinder.com/v2/animals?type=" + petTypeSelect.children("option:selected").val(); 
    } else if (petTypeSelect.children("option:selected").val() === "All"){
        petFinderUrl = "https://api.petfinder.com/v2/animals?location=" + petLocationInput.val();
    } else {
        petFinderUrl = "https://api.petfinder.com/v2/animals?type=" + petTypeSelect.children("option:selected").val() + "&location=" + petLocationInput.val();
    }

    fetch(petFinderUrl, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' +  apiAuthBearer
        })
    })
    .then(function (response) {
        if (response.status === 404) {
          errorText.text("There are no animals for adoption near this location.");
          errorModal.addClass("modal-open");
          return "";
        }
        else if(response.status == 400) {
          errorText.text("Please retry your search with proper formatting: City, State or Zip code.");
          errorModal.addClass("modal-open");
          return "";
        }
    return response.json();
    })
    .then(function (data) {
        setTimeout(setPetData(data), 1000);
    console.log(data);
    });

}

function setPetData(data) {
    
    if (petsArray.length > 0) {
        petsArray = [];
        petsSectionEl.children().remove();
    }

    for (var i = 0; i < data.animals.length; i++) {

        var petObj = {
            name: data.animals[i].name,
            gender: data.animals[i].gender,
            description: data.animals[i].description,
            city: data.animals[i].contact.address.city,
            state: data.animals[i].contact.address.state,
            type: data.animals[i].type,
            url: data.animals[i].url,
            photo: '../assets/media/nophotoDog.png'
        } 

        if (data.animals[i].primary_photo_cropped !== null && data.animals[i].primary_photo_cropped !== [] && data.animals[i].primary_photo_cropped !== undefined) {
            petObj.photo = data.animals[i].primary_photo_cropped.medium;
        } else if (data.animals[i].photos !== null && data.animals[i].photos !== [] &&  data.animals[i].photos !== undefined) {
            petObj.photo = data.animals[i].photos[0];
        } else {
            petObj.photo = "../assets/media/nophotoDog.png";
        }

        petsArray.push(petObj);
    }
    setTimeout(displayPetCards, 2000);
}