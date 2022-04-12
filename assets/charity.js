// References for user text input elements from html page
var cityEl = $("#city-input");
var stateEl = $("#state-input");
var zipEl = $("#zipcode-input");
// Reference to button for event listener
var subButEl = $("#submit-button");

// Section to add the charity resultes to
var charitySectEl = $("#charities-section");

function getResults() {
    var city = cityEl.val();
    var state = stateEl.val();
    var zip = zipEl.val();

    var apiKey = "936fdb7979c2cbede08758d1d96e0f9b";
    var apiId = "6f67cffa";
    var requestUrl = "";

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
        requestUrl = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + apiId + "&app_key=" + apiKey + "&categoryID=1"
    }

    fetch(requestUrl)
    .then(function (response) {
      //check if we get 404 back from the api request and tell user
      if (response.status === 404) {
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

subButEl.on("click", getResults);