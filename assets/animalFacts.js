//global variables
var factCards = $("#fact-cards")
var carouselContainer = $("#carouselContainer")



//facts for both cats and dogs-alternating from cat to dog so on carousel it will alternate between the cat and dog facts
var animalFacts = [
    "A cat\’s average lifespan increased by a year over the span of time between 2002 and 2012, according to a study by Banfield Pet Hospital.",
    " A comprehensive review of studies published between 1950 and 2019 found that dog owners had a lower risk of death.",
    "Cats can spend up to a third of their waking hours grooming. Considering the average cat sleeps 15 hours per day, that means many are spending 4 to 5 hours licking some part of their body.",
    "Even just petting a familiar dog lowers blood pressure, heart rate, slows breathing, and relaxes muscle tension.",
    "If you keep your cat active during the day, he will sleep better at night. If you\’re not free-feeding your cat, you can also help her get a good night\’s sleep by providing her with a substantial evening meal.",
    "Dogs help us recover psychologically from a crisis. Animal-assisted therapy has been proposed as a treatment adjunct for traumatized patients.",
    "If you keep your cat active during the day, he will sleep better at night. If you\’re not free-feeding your cat, you can also help her get a good night\’s sleep by providing her with a substantial evening meal.",
    "Dogs help seniors with cognitive function and social interaction. Loved ones and friends move or pass away, and it becomes increasingly difficult to leave the house and participate in once-loved activities. But there is once source of comfort and companionship that benefits seniors in countless ways: pets.",
    "Kneading — which some people refer to as “making biscuits” — is a sign of contentment and happiness. Cats knead their mothers when they are nursing to stimulate the let-down of milk.",
    "A dog’s sense of smell is legendary, but did you know that his nose has as many as 300 million receptors? In comparison, a human nose has about 5 million.",
    "Meowing is a behavior that cats developed exclusively to communicate with people. Cats meow for many reasons—to say hello, to ask for things, and to tell us when something's wrong.",
    "Researchers found that dogs have similar sleep patterns and brain activity as humans, and that small breeds tend to dream more than large ones.",
    "Thieving behavior is not uncommon among cats. They will often grab objects like stuffed animals, feather dusters, and other things that remind them of prey.",
    "Puppies grow half their body weight about 4 to 5 months. This gives your Vet a good indication of how big they will be as an adult!",
    "There are about 88 million pet cats in the United States, which makes them the most popular pet in the country!",
    "Dogs have a sense of time. It's been proven that they know the difference between an hour and five. If conditioned to, they can predict future events, such as regular walk time.",
    "A 1-year-old kitten is developmentally equivalent to a 15-year-old human and the physical maturity of a two-year-old cat is roughly equivalent to a 25-year-old human. Then, for each year after the first two, equate each cat year to about four human years.",
    "Your dog is as smart as a two-year-old! Ever wonder why children around this age seem to have a special bond with the family dog? It could be because they speak the same language, roughly 250 words, and gestures in fact.",
    "Cats almost always land on their feet due to their impressive “righting” reflex. Using their sensitive ears, they are able to maintain balance and orient themselves, so they are not injured from a fall.",
    "When your dog is carefully choosing the perfect place to do his business, it is because they prefer to go poop in alignment with the Earth’s magnetic field."
]



//Images for both cats and dogs-alternating from cat to dog so on carousel it will alternate images to match with facts
var animalImages = [
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



//function for displaying the facts and images on the carousel portion of page
function displayFacts() {

    // generates every carousel slide(30)
    for(i = 0; i < animalFacts.length; i++) {
        
        //creating the carousel slide containers with unique ID at index "i"
        var carouselBody = $(" <div id='slide" + i + "'class='carousel-item relative w-full bg-secondary rounded bg-cover'>");
        var carouselBtnDiv = $('<div class="absolute justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 hidden sm:flex">');
        var buttonLeft = $('<a class="btn btn-glass">');
        var buttonRight = $('<a class="btn btn-glass">');
        var petImage = $("<img class='h-96 rounded hidden sm:inline'>");
        var factTitle = $("<h3 class= 'm-1 flex items-center mb-28'>");
        
        //needed to change button style
        factTitle.css("font-weight", "bold")
        factTitle.css("font-size", "large")
        //carouselBody.css("background-image", "url('" + animalImages[i] + "')")


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
        
        
        //for carousel to display all images within loop at the different indexes
        petImage.attr("src", animalImages[i]);
        factTitle.text(animalFacts[i]);
        buttonRight.text("❯");
        buttonLeft.text("❮")

        ///adding the container to the webpage
        carouselContainer.append(carouselBody);
        carouselBody.append(carouselBtnDiv);
        carouselBody.append(petImage, factTitle)
        carouselBtnDiv.append(buttonLeft, buttonRight);

        console.log(carouselBody)

    }
}

//want this function to run on page load
displayFacts();
