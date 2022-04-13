//global variables
var factCards = $("#fact-cards")

//next two functions need to generate on page load

//will need function to fetch api for cat facts

function catFacts() {
    fetch('https://cat-fact.herokuapp.com/facts')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

}


//will need api to fetch dog facts

function dogFacts() {
    fetch('https://dog-facts-api.herokuapp.com/api/v1/resources/dogs/all')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  

}

//will want to store these facts to local storage

function storeFacts() {

}

//will need to dynamically generate card-like features to append the dog facts and pictures

function displayFacts() {

}

//decide between hard coding and  api generate pictures for animal pictures
        //pros hard coding- can select which picture goes with which fact so it will go together better inflow
        //cons- having a bunch of pictures generated for a bunch of facts

//going to generate certain APIs- some are not as useful, willuse a select few of some for dogs, and cats