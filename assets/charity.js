// References for user text input elements from html page
var cityEl = $("#city-input");
var stateEl = $("#state-input");
var zipEl = $("#zipcode-input");
// Reference to button for event listener
var subButEl = $("#submit-button");

// References for modals
var noResultsEl = $('#404-modal');
var closeNoResultsEl = $('#close-modal');
var searchErrorText = $('#error-text');

var charityModal = $('#charity-info-modal');
var closeCharityModal = $('#close-charity-modal');
var charityMessageEl = $('#charity-message');
var charityModalHeadEl = $('#modal-header');
var charityLinkEl = $('#charity-link');

// Section to add the charity resultes to
var charitySectEl = $("#charities-section");

var gottenData = [];

function getResults() {
    //user inputs from page
    var city = cityEl.val();
    var state = stateEl.val();
    var zip = zipEl.val();

    // reset vals in input and remove current cards from page
    cityEl.val("");
    stateEl.val("");
    zipEl.val("");
    charitySectEl.html("");

    //used for requesting from api
    var apiKey = "936fdb7979c2cbede08758d1d96e0f9b";
    var apiId = "6f67cffa";
    var requestUrl = "";

    //checks for what we need to send the api, allows user to input all fields or no fields and still get back results
    //fills in user input into api request URL
    if(city && state && zip) {
        requestUrl = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + apiId + "&app_key=" + apiKey + "&categoryID=1&state=" + state + "&city=" + city +"&zip=" + zip;
    }
    else if(city && state) {
        requestUrl = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + apiId + "&app_key=" + apiKey + "&categoryID=1&state=" + state + "&city=" + city;
    }
    else if(city && zip) {
        requestUrl = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + apiId + "&app_key=" + apiKey + "&categoryID=1&city=" + city + "&zip=" + zip;
    }
    else if(state && zip) {
        requestUrl = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + apiId + "&app_key=" + apiKey + "&categoryID=1&state=" + state + "&zip=" + zip;
    }
    else if(city) {
        requestUrl = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + apiId + "&app_key=" + apiKey + "&categoryID=1&city=" + city;
    }
    else if(state) {
        requestUrl = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + apiId + "&app_key=" + apiKey + "&categoryID=1&state=" + state;
    }
    else if(zip) {
        requestUrl = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + apiId + "&app_key=" + apiKey + "&categoryID=1&zip=" + zip;
    }
    else {
        requestUrl = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + apiId + "&app_key=" + apiKey + "&categoryID=1";
    }

    //fetch results from gathered user input
    fetch(requestUrl)
    .then(function (response) {
      //check if we get 404 back from the api request and tell user
      if (response.status === 404) {
        //open up a modal that will tell the user that no results were found
        searchErrorText.text("No results were found for your search");
        noResultsEl.addClass("modal-open");
        return "";
      }
      else if(response.status == 400) {
        //open up a modal that will tell the user that the inputs weren't in the correct form
        searchErrorText.text("Search was not accepted as the search inputs were not valid");
        noResultsEl.addClass("modal-open");
        return "";
      }
      return response.json();
    })
    .then(function (data) {
        //don't try to access data that doesn't exist
        if(data == "") {
          return;
        }if(data.length != 0) {
            gottenData = [];
            for(var i = 0; i < data.length; i++) {
                gottenData[i] = data[i];
            }
            console.log(data);
            //loop through the results and make a card for each result
            //*TODO* Probably only show like 10 results at a time so we don't have 100 loaded on the page
            //and add buttons to go to the next 10
            for(var i = 0; i < data.length; i++) {
                //create a div to hold the entire card
                var cardEl = $('<div>');
                cardEl.addClass("card w-5/6 bg-base-100 shadow-xl mx-auto my-3");
                //create a div that will be styled as the card body
                var cardBodyEl = $('<div>');
                cardBodyEl.addClass("card-body");
                //create the content of the card, header and all paragraph information
                var header = $('<h4>');
                header.addClass("card-title");
                header.text(data[i].organization.charityName);
                var cardTaglineEl = $('<p>');
                cardTaglineEl.text(data[i].tagLine);
                var cardMailingEl = $('<p>');
                cardMailingEl.text("Mailing address: " + data[i].mailingAddress.streetAddress1 + ", " + data[i].mailingAddress.city + 
                ", " + data[i].mailingAddress.stateOrProvince + ", " + data[i].mailingAddress.postalCode);
                var textRatingEl = $('<p>');
                textRatingEl.text("Current Charity Navigator rating: ");
                //create an image to hold the rating stars image
                var ratingImgEl = $('<img>');
                ratingImgEl.attr("src", data[i].currentRating.ratingImage.large);
                //set these so the image doesn't become super huge and stays at normal dimensions
                ratingImgEl.addClass("w-max h-max");
                //create a div for the button so we can keep the button to the bottom left of the card
                var btnDiv = $('<div>');
                btnDiv.addClass("card-actions justify-end");
                //create a readmore button that should open up a modal with the charities messaage and a link to the charities webpage
                var readMoreBtn = $('<button>')
                readMoreBtn.addClass("btn btn-secondary readMoreBtn");
                readMoreBtn.attr("data-num", i);
                readMoreBtn.text("Read More");

                //append all of the elements together and then append them to the page
                btnDiv.append(readMoreBtn);
                cardBodyEl.append(header);
                cardBodyEl.append(cardTaglineEl);
                cardBodyEl.append(cardMailingEl);
                cardBodyEl.append(textRatingEl);
                cardBodyEl.append(ratingImgEl);
                cardBodyEl.append(btnDiv);
                cardEl.append(cardBodyEl);
                charitySectEl.append(cardEl);
            }
            ScrollReveal().reveal('.card');
        }
    });
}

/*
 * This function will open up a modal with info on the charity, including the charity name, the mission, and a link to the charities website
 */
function readMore(event) {
    //Get the index for the charity we want to see, button will have a index number in its data.
    var index = $(event.currentTarget).attr("data-num");
    //Charity name in modal
    charityModalHeadEl.text(gottenData[index].organization.charityName);
    //Set html and not text because the mission return in api request includes <br> for formatting
    charityMessageEl.html(gottenData[index].mission);
    charityLinkEl.attr("href", gottenData[index].websiteURL);
    charityModal.addClass("modal-open");
}

//For when the user clicks on the button to search for charities
subButEl.on("click", getResults);
//For when the modal opens telling the user that there was an error searching for results
closeNoResultsEl.on("click", function() {
    noResultsEl.removeClass("modal-open");
});
//For when the charity modal is open and we want to close it
closeCharityModal.on("click", function() {
    charityModal.removeClass("modal-open");
});
//Clicking on any read more button will open up with more info on the charity and a link to the charities website
charitySectEl.on("click", ".readMoreBtn", readMore);
