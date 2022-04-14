//global variables
var factCards = $("#fact-cards")
var carouselContainer = $("#carouselContainer")

//next two functions need to generate on page load

//will need function to fetch api for cat facts

var animalFacts = [
    "A cat\’s average lifespan increased by a year over the span of time between 2002 and 2012, according to a study by Banfield Pet Hospital.",
    " A comprehensive review of studies published between 1950 and 2019 found that dog owners had a lower risk of death.",
    "Cats can spend up to a third of their waking hours grooming.",
    "Even just petting a familiar dog lowers blood pressure, heart rate, slows breathing, and relaxes muscle tension.",
    "If you keep your cat active during the day, he will sleep better at night. If you\’re not free-feeding your cat, you can also help her get a good night\’s sleep by providing her with a substantial evening meal.",
    "Dogs help us recover psychologically from a crisis.",
    "If you keep your cat active during the day, he will sleep better at night. If you\’re not free-feeding your cat, you can also help her get a good night\’s sleep by providing her with a substantial evening meal.",
    "Dogs help seniors with cognitive function and social interaction",
    "Kneading — which some people refer to as “making biscuits” — is a sign of contentment and happiness. Cats knead their mothers when they are nursing to stimulate the let-down of milk.",
    "A dog’s sense of smell is legendary, but did you know that his nose has as many as 300 million receptors? In comparison, a human nose has about 5 million.",
    "Meowing is a behavior that cats developed exclusively to communicate with people.",
    "Researchers found that dogs have similar sleep patterns and brain activity as humans, and that small breeds tend to dream more than large ones.",
    "Thieving behavior is not uncommon among cats. They will often grab objects like stuffed animals, feather dusters, and other things that remind them of prey.",
    "A Greyhound would actually beat a Cheetah in a long distance race",
    "There are about 88 million pet cats in the United States, which makes them the most popular pet in the country!",
    "Dogs have a sense of time. It's been proven that they know the difference between an hour and five. If conditioned to, they can predict future events, such as regular walk time.",
    "A 1-year-old kitten is developmentally equivalent to a 15-year-old human",
    "Your dog is as smart as a two-year-old! Ever wonder why children around this age seem to have a special bond with the family dog? It could be because they speak the same language, roughly 250 words, and gestures in fact.",
    "Cats almost always land on their feet due to their impressive “righting” reflex",
    "When your dog is carefully choosing the perfect place to do his business, it is because they prefer to go poop in alignment with the Earth’s magnetic field."
]



//will need api to fetch dog facts

var animalImages = [
///link all picture refs
"../assets/media/animal-carousel/cat-1.jpg",
"../assets/media/animal-carousel/dog-1.jpg",
"../assets/media/animal-carousel/cat-2.jpg",
"../assets/media/animal-carousel/dog-2.jpg",
"../assets/media/animal-carousel/cat-3.jpg",
"../assets/media/animal-carousel/dog-3.jpg",
"../assets/media/animal-carousel/cat-4.jpg",
"../assets/media/animal-carousel/dog-4.jpg",
"../assets/media/animal-carousel/cat-5.jpg",
"../assets/media/animal-carousel/dog-5.jpg",
"../assets/media/animal-carousel/cat-6.jpg",
"../assets/media/animal-carousel/dog-6.jpg",
"../assets/media/animal-carousel/cat-7.jpg",
"../assets/media/animal-carousel/dog-7.jpg",
"../assets/media/animal-carousel/cat-8.jpg",
"../assets/media/animal-carousel/dog-8.jpg",
"../assets/media/animal-carousel/cat-9.jpg",
"../assets/media/animal-carousel/dog-9.jpg",
"../assets/media/animal-carousel/cat-10.jpg",
"../assets/media/animal-carousel/dog-10.jpg"


]


//will need to dynamically generate card-like features to append the dog facts and pictures

function displayFacts() {

    // generates every carousel slide(30)
    for(i = 0; i < animalFacts.length; i++) {
        //creating the carousel slide containers with unique ID at index "i"
    
        var carouselBody = $(" <div id='slide" + i + "'class='carousel-item relative w-full bg-secondary rounded'>");
        var carouselBtnDiv = $('<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">');
        var buttonLeft = $('<a class="btn btn-glass">');
        var buttonRight = $('<a class="btn btn-glass">');
        var petImage = $("<img class='h-96 rounded'>");
        var factTitle = $("<h3 class= 'm-1 flex items-center mb-28'>");

        factTitle.css("font-weight", "bold")
        factTitle.css("font-size", "large")


        //when the button right or left is setting conditions for where the carousel is currently at-beginning, end, middle
        if(i === 0) {
            buttonLeft.attr("href", "#slide" + (animalFacts.length -1)); 
            buttonRight.attr("href", "#slide1")
        } else if (i === animalFacts.length -1) {
            buttonLeft.attr("href", "#slide" + (i - 1));
            buttonRight.attr("href", "#slide0");
        } else {
            buttonLeft.attr("href", "#slide" + (i - 1));
            buttonRight.attr("href", "#slide" +(i + 1))
        }
        
        
        petImage.attr("src", animalImages[i]);
        factTitle.text(animalFacts[i]);
        buttonRight.text("❯");
        buttonLeft.text("❮")

        ///adding the container to the webpage
        carouselContainer.append(carouselBody);
        carouselBody.append(carouselBtnDiv);
        carouselBody.append(petImage, factTitle)
        carouselBtnDiv.append(buttonLeft, buttonRight);
    }
}
    
displayFacts();
