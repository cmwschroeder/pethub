// References for user text input elements from html page
var cityEl = $("#city-input");
var stateEl = $("#state-input");
var zipEl = $("#zipcode-input");
// Reference to button for event listener
var subButEl = $("#submit-button");

// References for modal
var noResultsEl = $('#404-modal');
var closeNoResultsEl = $('#close-modal');
var searchErrorText = $('#error-text');

// Section to add the charity resultes to
var charitySectEl = $("#charities-section");

function getResults() {
    //user inputs from page
    var city = cityEl.val();
    var state = stateEl.val();
    var zip = zipEl.val();

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
        console.log(response);
        return "";
      }
      else if(response.status == 400) {
        //open up a modal that will tell the user that the inputs weren't in the correct form
        searchErrorText.text("Search was not accepted as the search inputs were not valid");
        noResultsEl.addClass("modal-open");
        console.log(response);
        return "";
      }
      return response.json();
    })
    .then(function (data) {
        //don't try to access data that doesn't exist
        if(data == "") {
          return;
        }
        console.log(data);
    });

}

//For when the user clicks on the button to search for charities
subButEl.on("click", getResults);
//For when the modal opens telling the user that there was an error searching for results
closeNoResultsEl.on("click", function() {
    noResultsEl.removeClass("modal-open");
});