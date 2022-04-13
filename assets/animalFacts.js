//global variables
var factCards = $("#fact-cards")

//next two functions need to generate on page load

//will need function to fetch api for cat facts

var catFacts = {
    fact: "A cat\’s average lifespan increased by a year over the span of time between 2002 and 2012, according to a study by Banfield Pet Hospital.",
    fact: "Cats can spend up to a third of their waking hours grooming.",
    fact: "If you keep your cat active during the day, he will sleep better at night. If you\’re not free-feeding your cat, you can also help her get a good night\’s sleep by providing her with a substantial evening meal.",
    fact: "If you keep your cat active during the day, he will sleep better at night. If you\’re not free-feeding your cat, you can also help her get a good night\’s sleep by providing her with a substantial evening meal.",
    fact: "Kneading — which some people refer to as “making biscuits” — is a sign of contentment and happiness. Cats knead their mothers when they are nursing to stimulate the let-down of milk.",
    fact: "Meowing is a behavior that cats developed exclusively to communicate with people.",
    fact: "Thieving behavior is not uncommon among cats. They will often grab objects like stuffed animals, feather dusters, and other things that remind them of prey.",
    fact: "There are about 88 million pet cats in the United States, which makes them the most popular pet in the country!",
    fact: "A 1-year-old kitten is developmentally equivalent to a 15-year-old human",
    fact: "Cats almost always land on their feet due to their impressive “righting” reflex"
}



//will need api to fetch dog facts

var dogFacts = {
    fact: " A comprehensive review of studies published between 1950 and 2019 found that dog owners had a lower risk of death.",
    fact: "Even just petting a familiar dog lowers blood pressure, heart rate, slows breathing, and relaxes muscle tension.",
    fact: "Dogs help us recover psychologically from a crisis.",
    fact: "Dogs help seniors with cognitive function and social interaction",
    fact: "A dog’s sense of smell is legendary, but did you know that his nose has as many as 300 million receptors? In comparison, a human nose has about 5 million.",
    fact: "Researchers found that dogs have similar sleep patterns and brain activity as humans, and that small breeds tend to dream more than large ones.",
    fact: "A Greyhound would actually beat a Cheetah in a long distance race",
    fact: "Dogs have a sense of time. It's been proven that they know the difference between an hour and five. If conditioned to, they can predict future events, such as regular walk time.",
    fact: "Your dog is as smart as a two-year-old! Ever wonder why children around this age seem to have a special bond with the family dog? It could be because they speak the same language, roughly 250 words, and gestures in fact.",
    fact: "When your dog is carefully choosing the perfect place to do his business, it is because they prefer to go poop in alignment with the Earth’s magnetic field."
}


//will need to dynamically generate card-like features to append the dog facts and pictures

function displayFacts() {

    // for(i = 0; i < 10; i++) {    
    // }
    var cardContainer = $("<div class=card card-side bg-base-100 shadow-xl>")
    var cardBody = $("<div class=card-body>")
    var numberHeader = $("<h2 class='card-title'>")
}

//decide between hard coding and  api generate pictures for animal pictures
        //pros hard coding- can select which picture goes with which fact so it will go together better inflow
        //cons- having a bunch of pictures generated for a bunch of facts

//going to generate certain APIs- some are not as useful, willuse a select few of some for dogs, and cats
