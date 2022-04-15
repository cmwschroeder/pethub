// References for user text input elements from html page
var cityEl = $("#city-input");
var stateEl = $("#state-input");
var zipEl = $("#zipcode-input");
// Reference to button for event listener
var subButEl = $("#submit-button");
var eggButEl = $("#egg-button");

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
var printedStart;
var printedFinish;
var pageNum;

//array of state abbreviations for filling so we don't clutter up html
var states = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
             'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
             'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];

function getResults(city, state, zip) {
    //make the submit button into a loading symbol
    subButEl.addClass("loading btn-disabled");
    subButEl.text("Loading")

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
        requestUrl = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + apiId + "&app_key=" + apiKey + "&categoryID=1&pageSize=200";
    }

    //fetch results from gathered user input
    fetch(requestUrl)
    .then(function (response) {
      //remove loading animation from button
      subButEl.removeClass("loading btn-disabled");
      subButEl.text("Submit");
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
        }
        //Only show 20 results per page
        var resultNum;
        if(data.length > 20) {
            resultNum = 20;
        } else {
            resultNum = data.length;
        }
        if(resultNum != 0) {
            gottenData = [];
            for(var i = 0; i < data.length; i++) {
                gottenData[i] = data[i];
            }
            //pass how many we want printed to the loadResults function
            loadResults(0, resultNum);
            printedStart = 0;
            printedFinish = resultNum;
            if(data.length > 20) {
                var cycleBtnDiv = $('<div class="grid grid-cols-5 gap-0 m-3">');
                var prevButEl = $('<button class="btn btn-primary w-full hidden" id="prev-button">');
                prevButEl.text("Previous");
                var nextButEl = $('<button class="btn btn-secondary w-full col-start-5" id="next-button">');
                nextButEl.text("Next");
                var pageEl = $('<p class="col-start-3 text-center text-xl">');
                pageEl.text("Page 1");
                pageNum = 1;
                cycleBtnDiv.append(prevButEl);
                cycleBtnDiv.append(pageEl);
                cycleBtnDiv.append(nextButEl);
                charitySectEl.append(cycleBtnDiv);
            }
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

/*
 * This function will fill the state select with options for each state abbreviation
 */
function fillStates() {
    //Loop through the states array and add an option in the select tag for each state abbreviation
    //Since the states have to be inputted in the abbreviated form for API request
    for(var i = 0; i < states.length; i++) {
        var option = $('<option>');
        option.text(states[i]);
        stateEl.append(option);
    }
}

/*
 * This function will take the starting point and the ending point of the results that should be printed, will look at the stored data
 * and print results from the start index to one below the finish index
 */
function loadResults(start, finish) {
    for(var i = start; i < finish; i++) {
        //create a div to hold the entire card
        var cardEl = $('<div>');
        cardEl.addClass("card w-5/6 bg-base-100 shadow-xl mx-auto my-3");
        cardEl.attr("data-anijs", "if: scroll, on: window, do: fadeInRight animated, before: scrollReveal");
        //create a div that will be styled as the card body
        var cardBodyEl = $('<div>');
        cardBodyEl.addClass("card-body");
        //create the content of the card, header and all paragraph information
        var header = $('<h4>');
        header.addClass("card-title");
        header.text(gottenData[i].organization.charityName);
        var cardTaglineEl = $('<p>');
        cardTaglineEl.text(gottenData[i].tagLine);
        var cardMailingEl = $('<p>');
        cardMailingEl.text("Mailing address: " + gottenData[i].mailingAddress.streetAddress1 + ", " + gottenData[i].mailingAddress.city + 
        ", " + gottenData[i].mailingAddress.stateOrProvince + ", " + gottenData[i].mailingAddress.postalCode);
        var textRatingEl = $('<p>');
        textRatingEl.text("Current Charity Navigator rating: ");
        //create an image to hold the rating stars image
        var ratingImgEl = $('<img>');
        ratingImgEl.attr("src", gottenData[i].currentRating.ratingImage.large);
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
    // ScrollReveal().reveal('.card');
    AniJS.run();
}

/*
 * Function that will load the past 20 results, used so that we can have more results from API request without flooding the users screen
 * with 100+ charities.
 */
function loadPastResults() {
    //scroll back to the top of the page on click of this button
    window.scroll(0, 0);
    //clear html so that we can populate with other results
    charitySectEl.html("");
    //set the new printed finish = to the start of what we just printed to screen
    printedFinish = printedStart;
    //check to see if we are at 0 so we can basically refresh the search from the beginning printing the first 20 results
    if(0 >= (printedFinish - 20)) {
        printedStart = 0;
        printedFinish = 20;
    }
    else {
        printedStart -= 20;
    }
    //print the new results from the new start point to the new endpoint
    loadResults(printedStart, printedFinish);

    //create the buttons at the bottom as well as text showing what page number is printed
    var cycleBtnDiv = $('<div class="grid grid-cols-5 gap-0 m-3">');
    var prevButEl = $('<button class="btn btn-primary w-full" id="prev-button">');
    prevButEl.text("Previous");
    var nextButEl = $('<button class="btn btn-secondary w-full col-start-5" id="next-button">');
    nextButEl.text("Next");
    var pageEl = $('<p class="col-start-3 text-center text-xl">');
    pageEl.text("Page " + (pageNum - 1));
    pageNum--;
    //if we are back at the start of the search results then remove the prev button from view since there are no
    //previous elements
    if(printedStart == 0) {
        prevButEl.addClass("hidden");
    }
    //append all buttons and the p tag to page
    cycleBtnDiv.append(prevButEl);
    cycleBtnDiv.append(pageEl);
    cycleBtnDiv.append(nextButEl);
    charitySectEl.append(cycleBtnDiv);
}

function loadNextResults() {
    //scroll back to the top of the page on click of this button
    window.scroll(0, 0);
    //clear html so that we can populate with other results
    charitySectEl.html("");
    //set the new printed start = to the finish of what we just printed to screen
    printedStart = printedFinish;
    //check to see if we are nearing the end so we don't try to print more results than we have
    if(gottenData.length < (printedFinish + 20)) {
        printedFinish = gottenData.length;
    }
    else {
        printedFinish += 20;
    }
    loadResults(printedStart, printedFinish);

    //create the buttons at the bottom as well as text showing what page number is printed
    var cycleBtnDiv = $('<div class="grid grid-cols-5 gap-0 m-3">');
    var prevButEl = $('<button class="btn btn-primary w-full" id="prev-button">');
    prevButEl.text("Previous");
    var nextButEl = $('<button class="btn btn-secondary w-full col-start-5" id="next-button">');
    nextButEl.text("Next");
    var pageEl = $('<p class="col-start-3 text-center text-xl">');
    pageEl.text("Page " + (pageNum + 1));
    pageNum++;
    //if there are no more results after the end of what we just printed then hide the next button so we don't show
    //more results than there are
    if(printedFinish == gottenData.length) {
        nextButEl.addClass("hidden");
    }
    //append all buttons and the p tag to page
    cycleBtnDiv.append(prevButEl);
    cycleBtnDiv.append(pageEl);
    cycleBtnDiv.append(nextButEl);
    charitySectEl.append(cycleBtnDiv);
}

function loadLastSearch() {
    //search local storage for a past search to populate page with
    var pastState = localStorage.getItem("pastState");
    var pastCity = localStorage.getItem("pastCity");
    var pastZip = localStorage.getItem("pastZip");
    var hasSearched = localStorage.getItem("hasSearched");
    //first time loading the page, just initialize local storage variables and don't search
    if(pastState == null) {
        pastState = "";
        pastCity = "";
        pastZip = "";
        hasSearched = "false";
        localStorage.setItem("pastState", pastState);
        localStorage.setItem("pastCity", pastCity);
        localStorage.setItem("pastZip", pastZip);
        localStorage.setItem("hasSearched", hasSearched);
    }
    // we have had a past search so we will redo it  
    else if(hasSearched != "false") {
        getResults(pastCity, pastState, pastZip);
    }
}

//For when the user clicks on the button to search for charities
subButEl.on("click", function() {
        //user inputs from page
        var city = cityEl.val();
        var state = stateEl.val();
        var zip = zipEl.val();

        // reset vals in input and remove current cards from page
        cityEl.val("");
        stateEl.val("State");
        zipEl.val("");
        charitySectEl.html("");

        //we have now searched so mark that in local storage for page reloads
        var hasSearched = "true";
        localStorage.setItem("hasSearched", hasSearched);

        //save the rest of the search items in local storage to search again on reload
        if(state == null) {
            state = "";
        }
        localStorage.setItem("pastState", state);
        localStorage.setItem("pastCity", city);
        localStorage.setItem("pastZip", zip);

        //pass the values into the search function
        getResults(city, state, zip);
});
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

eggButEl.on("click", function() {
    var html = $('html');
    if(html.attr("data-theme") === "synthwave") {
        html.attr("data-theme", "cyberpunk");
    } else if(html.attr("data-theme") === "cyberpunk") {
        html.attr("data-theme", "luxury");
    } else {
        html.attr("data-theme", "synthwave");
    }
});

//Clicking on the buttons that exist after the charity if there are enough results, will move to the next page of charities
charitySectEl.on("click", "#prev-button", loadPastResults);
charitySectEl.on("click", "#next-button", loadNextResults);

fillStates();
loadLastSearch();