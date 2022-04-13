var searchBtn = $("#searchBtn");
var petsSectionEl = $("#pets");

var petFinderUrl = "https://api.petfinder.com/v2/animals";
var apiKey = "siwywcH8smVuYkQwaTxLaU7o5ukX7sk2DJNC8VmyzQEqEeABq8";
var apiSecret = "kFtKSHvS38045Ixyzok8EtG9BdouqbfU3CMdC1iK";

var apiAuthBearer;

var petsArray = [];
var animalCount = 20;

pullPetFinderAuth();



// searchBtn.on("click", displayPetCards());

function displayPetCards() {
    console.log(petsArray);
    for (var i = 0; i < 9; i++) {
        var tempCardEl = $("<div class='card w-96 bg-base-100 shadow-xl m-3'>");
        petsSectionEl.append(tempCardEl);

        if (petsArray[i].photo === undefined) {
            if(petsArray[i].type === "Dog") {
                petsArray[i].photo = "../assets/nophotoDog.png";
            } else {
                petsArray[i].photo = "../assets/nophotoCat.png";
            }
        }

        var tempCardImg = $("<figure><img class='h-96' src='" + petsArray[i].photo + "' alt='" + petsArray[i].name + "' /></figure>");
        tempCardEl.append(tempCardImg);

        var tempCardBody = $("<div class='card-body bg-secondary'>");
        tempCardEl.append(tempCardBody);

        var tempCardHeader2 = $("<h2 class='card-title'>");
        tempCardHeader2.text(petsArray[i].name);
        tempCardBody.append(tempCardHeader2);

        var tempCardDescription = $("<p>");
        tempCardDescription.html(petsArray[i].description);
        tempCardBody.append(tempCardDescription);

        var tempCardLocation = $("<p>");
        tempCardLocation.text("Location: " + petsArray[i].city + ", " + petsArray[i].state);
        tempCardBody.append(tempCardLocation);

        var tempCardType = $("<p>");
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
    console.log(data);
    pullPetFinderDataGeneric();
    });
}

function pullPetFinderDataGeneric() {
    fetch("https://api.petfinder.com/v2/animals", {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' +  apiAuthBearer
        })
    })
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        setTimeout(setPetData(data), 1000);
    console.log(data);
    setTimeout(displayPetCards, 2000);
    });

}

function setPetData(data) {
            
    for (var i = 0; i < 20; i++) {

        var petObj = {
            name: data.animals[i].name,
            gender: data.animals[i].gender,
            description: data.animals[i].description,
            city: data.animals[i].contact.address.city,
            state: data.animals[i].contact.address.state,
            type: data.animals[i].type,
            url: data.animals[i].url,
            photo: '../assets/nophotoDog.png',
            tags: data.animals[i].tags
        } 

        if (data.animals[i].primary_photo_cropped !== null && data.animals[i].primary_photo_cropped !== [] && data.animals[i].primary_photo_cropped !== undefined) {
            petObj.photo = data.animals[i].primary_photo_cropped.medium;
        } else if (data.animals[i].photos !== null && data.animals[i].photos !== [] &&  data.animals[i].photos !== undefined) {
            petObj.photo = data.animals[i].photos[0];
        } else {
            petObj.photo = "../assets/nophotoDog.png";
        }

        if(petObj.description === null) {
            petObj.description = "No description.";
            if(petObj.tags !== null) {
                petObj.description = "";
                for (var j = 0; j < petObj.tags.length; j++) {
                    if (j !== petObj.tags.length - 1) {
                        petObj.description.concat(tags[j] + ", ");
                    } else {
                        petObj.description.concat(tags[j]);
                    }
                }
            }
        }
        petsArray.push(petObj);
    }

}