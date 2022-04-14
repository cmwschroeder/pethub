// initialize all the pointers to HTML elements we will manipulate
var searchBtn = $("#searchBtn");
var petsSectionEl = $("#pets");
var petTypeSelect = $("#petType");
var petLocationInput = $("#petLocation")
var errorModal = $("#errorModal");
var errorText = $("#errorText");
var closeModalEl = $("#closeModal");
var toTopBtn = $("#toTopBtn");

// initialize variables related to the fetch requests
var petFinderUrl = "https://api.petfinder.com/v2/animals";
var apiKey = "siwywcH8smVuYkQwaTxLaU7o5ukX7sk2DJNC8VmyzQEqEeABq8";
var apiSecret = "kFtKSHvS38045Ixyzok8EtG9BdouqbfU3CMdC1iK";
var apiAuthBearer;

//we will store pets in this array
var petsArray = [];

//this will keep track of what page number we are on
var currentPage = 1;

// call the petfinder authentication function
pullPetFinderAuth();

//this event listener listens for clicks on the search button
searchBtn.on("click", pullPetFinderData);

//this event listener listens for when we click to close the error modal
closeModalEl.on("click", function() {
    //remove the modal-open class so it goes off the screen
    errorModal.removeClass("modal-open");

    //set the button back so it is not in the loading state anymore
    searchBtn.attr("class", "btn btn-primary");
    searchBtn.text("Search");
});

//this function displays all the cards with pets available for adoption
function displayPetCards() {

    //set the search button back to normal now that the pet cards are done loading
    searchBtn.attr("class", "btn btn-primary");
    searchBtn.text("Search");

    //this for loop creates the cards for all the pet objects
    for (var i = 0; i < petsArray.length; i++) {
        
        //using jquery we can create the div with all the classes in one line
        var tempCardEl = $("<div class='card w-96 bg-base-100 shadow-xl m-3'>");
        petsSectionEl.append(tempCardEl);

        //this conditional statement sets a photo for animals without one
        if (petsArray[i].photo === undefined) {
            if(petsArray[i].type === "Dog") {
                petsArray[i].photo = "../assets/media/nophotoDog.png";
            } else if (petsArray[i].type === "Cat") {
                petsArray[i].photo = "../assets/media/nophotoCat.png";
            } else if (petsArray[i].type === "Bird") {
                petsArray[i].photo = "../assets/media/nophotoBird.png";
            } else if (petsArray[i].type === "Rabbit"){
                petsArray[i].photo = "../assets/media/nophotoRabbit.png";
            } else {
                petsArray[i].photo = "../assets/media/nophotoOther.png";
            }
        }

        //the following temp elements are used to place all the
        //proper data/images to the card for this pet object
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
    ScrollReveal().reveal('.card');

}

//this function uses my apikey and apisecret to get an access token
function pullPetFinderAuth() {
    fetch('https://api.petfinder.com/v2/oauth2/token', {
        //we are using the post method because we are submitting
        //a form to the server (requesting an oath2 token)
    method: 'POST',
    headers: {
        //basically here we are setting the content type as one big query string
        //because the data we're sending is urlencoded
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    //here we are setting the body data in the fetch to the 
    //url the petfinder api uses to generate a api access token
    body: 'grant_type=client_credentials&client_id=' + apiKey + '&client_secret=' + apiSecret
    })
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        //here we store the access token so we can use it
        //in our other fetch request
       apiAuthBearer = data.access_token;
    pullPetFinderData();
    });
}

//this function pulls data from the petfinder api based on what
//we're looking for
function pullPetFinderData() {
    //set the button to loading so the user doesn't click it again
    searchBtn.attr("class", "btn loading");
    searchBtn.text("loading");

    //set the generic/default url so we always have a url
    var petFinderUrl = "https://api.petfinder.com/v2/animals";

    //these conditionals check what the user chose in their form
    if (petTypeSelect.children("option:selected").val() === "All" && petLocationInput.val() === "") {
        petFinderUrl = "https://api.petfinder.com/v2/animals?limit=100";
    } else if (petTypeSelect.children("option:selected").val() !== "All" && petLocationInput.val() === "") {
        petFinderUrl = "https://api.petfinder.com/v2/animals?type=" + petTypeSelect.children("option:selected").val() + "&limit=100"; 
    } else if (petTypeSelect.children("option:selected").val() === "All"){
        petFinderUrl = "https://api.petfinder.com/v2/animals?location=" + petLocationInput.val() + "&limit=100";
    } else {
        petFinderUrl = "https://api.petfinder.com/v2/animals?type=" + petTypeSelect.children("option:selected").val() + "&location=" + petLocationInput.val() + "&limit=100";
    }

    //here we fetch the data for the pets using the URL we generated above
    fetch(petFinderUrl, {
        method: 'GET',
        //we have to use these headers to pass our oath2 key
        headers: new Headers({
            'Authorization': 'Bearer ' +  apiAuthBearer
        })
    })
    .then(function (response) {
        //we set conditionals to put up a modal alerting the user
        //either they made a mistake or there are no results
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
        //we are calling the setpetdata function but with a delay
        //to allow the api call to fully process
        setTimeout(setPetData(data), 1000);
    });

}

//here we are setting the pet data to an object and pushing
//the object to the pet array
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
    displayPetCards();
}

//set an event listener on the to top button to call the function
//that sends the user back to the top of the page
toTopBtn.on("click", returnTopFunction);

//this function checks if the user has scrolled down the page
//at least 50px and then makes the button visible
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
        toTopBtn.fadeIn(200);
    } else {
        toTopBtn.fadeOut(200);
    }
});

//this function will scroll the user to the top of the page
function returnTopFunction() {
    window.scrollTo(0,0);
}