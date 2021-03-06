# **PetHub**

![jsBadge](https://img.shields.io/github/languages/top/cmwschroeder/pethub?style=plastic)
![languages](https://img.shields.io/github/languages/count/cmwschroeder/pethub)
![License](https://img.shields.io/github/license/cmwschroeder/pethub)


![PetHubLogo](./assets/media/PetHubLogo.png)

For All Your Pet Lovin' Needs

Visit [PetHub](https://cmwschroeder.github.io/pethub/)

## **Table Of Contents**
1. [Description](#description)
2. [Features](#features)
    - [Pet Finder](#pet-finder)
    - [Charities](#charities)
    - [Breed Info](#breed-information)
    - [Animal Facts](#animal-facts)
3. [Technologies Used](#technologies-used)
4. [Authors](#author)
5. [License](#license)

## **Description**

Pethub is a web app for anyone interested in responsibly adopting a pet. On our webapp you can find pets in all areas to adopt. Even if you do not want to make the committment yet in adopting an animal, but still want to contribute to animals in need, we have a charity page that brings you to charities in all locations. If you are unsure of where to donate, there is a recommended list of charities available and much more.

## **Features**

We have four main features on our site: 
* Pet Finder
* Charities
* Breed Information
* Animal Facts

### **Pet Finder**

The PetFinder feature is where our users will look for their future fur baby. To view this page you can click [here](https://cmwschroeder.github.io/pethub/pages/petFinder.html).

![Mobile view of the gallery of pets for adoption](./assets/media/petFinderScroll.gif)

Pictured above you can see the mobile view of our pet finder feature. As you scroll you will be presented with animals who are looking for homes. Upon your initial visit the pag. If you would like to find a pet in a certain location, you should use the search form at the top of the page.

![User clicks cats from dropdown to see cats for adoption in San Francisco](./assets/media/petFinderSearch.gif)

As pictured in the above animation, to choose which type of animal you would like to search for, you can choose options from a dropdown list. The option to add a location is also available, allowing users to enter their city and state or zip code to present results from within 100 miles of that location.

There is also a return to top button so the user can be brought back to the top of the page and adjust their search results if they would like.

### **Charities**

We have a charity search page for all of the animal lovers out there. Have a pet already but still want to put some money in helping other animals? Not interested in a pet right now but still want to help? Maybe you don't have enough to take care of a pet full time but enough to help out a little. Any reason you may have to donate to a charity is a good one. On this page you can put in a state, city, or zipcode to narrow down your charity searches. You will the be shown results from Charity Navigator. Don't want to search at a certain place? No problem, just don't fill in any of the search inputs and you'll get a list of charities not specified by location. You can visit our search page by going [here](https://cmwschroeder.github.io/pethub/pages/charity.html).

Our search in action:

![Search results on a page](./assets/media/search-charities.gif)

The list will be populated with short snippets about each charity, showing the charities name, address, and Charity Navigator rating. There will also be a button with read more. When this button is clicked you will be shown another menu with the charities name, mission, and a link to go and visit their website. Here is what that would look like:

![Read more charity button in action](./assets/media/view-charity-info.gif)

If you don't want to search there will also be four suggested charities at the bottom of the page. These will be shown with their logo as the backgournd image, the charity name, and a link to their respective websites. This page won't be bland either. The elements on this page are animated through AniJS. Scrolling through the search results will show an animation of them coming in from the side, while the suggested charities on bottom will appear with a little bit of flare. You won't be bored looking at this website!

![Gif showing the animation of the page](./assets/media/animated-charity-page.gif)

This page also has local storage functionality, if you want to save your last search so that on a page reload it searches that search and displays the result again then keep the toggle checked and it will happen. If you don't want that then just untick the toggle and your last search will not be redone on page load.

![Gif showing page reload with redone search and no search](./assets/media/local-storagecharity.gif)

### **Breed Information**
So you're ready to adopt a dog or you want to adopt just not sure which breed is right for you. Well you came to the right place. Here at PetHub we have many valuable resources but this specific page will help identify dog breeds and their characteristics simply follow this<a href='https://cmwschroeder.github.io/pethub/pages/dogBreeds.html' target='_blank'> link</a> after your walkthrough. 

First lets direct ourselves to the breed information page which you can select on the navigation bar on the top right on any page you are on. Then select the drop-down menu which will populate over 100+ breeds to select from. Once you have decided which breed to find more information about select the breed and a card will populate with the characteristics of the selected breed. Here is a visual walk through of the process.

![visual walk through of using breed info](assets/media/dogbreedtut.gif)

### **Animal Facts**

The animal facts page is made for the last bit of convincing you may need to commit to adopting a new pet. In this section learn the fun and interesting things that pets do for us each day. After going through this carousel of facts and reading the creators of PetHubs testimonials to why we love and appreciate our pets, you will want to have one of your own!

PetHub Web App was developed with innovative technologies to make the layout and design appeal to a modern user. Animal facts page specifically was designed heavily with [daisyUI](https://daisyui.com/) and features from its parent [Tailwind CSS](https://tailwindcss.com/docs/installation). Animal Facts page has a carousel that displays facts of cats and dogs as you scroll through. The carousel was dynamically generated to present a different picture and fact as you scroll through the list. 
If you were to click from the starting picture, it will either scroll to the next fact and image, or it will scroll to the last page depending on the button clicked.
```
if(i === 0) {
            buttonLeft.attr("href", "#slide" + (animalFacts.length -1)); 
            buttonRight.attr("href", "#slide1")
```
If you are at the end of the carousel and you click the right button, it will go back to the start, and if you click the left button, it will just go back one.
```
 } else if (i === animalFacts.length -1) {
            buttonLeft.attr("href", "#slide" + (i - 1));
            buttonRight.attr("href", "#slide0");
```

The other significant features of this page was implementation of the Box Alignment feature, using [daisyUI](https://daisyui.com/). DaisyUI made it incredibly easy to align cards or text throughout the web app. The simple syntax made it easy to remember the code without having to scroll through documentation multiple times.
```
<section class="flex flex-wrap justify-center mt-6">
          <div class="card w-96 bg-base-100 shadow-xl justify-end mt-6">
```
The example above shows how the simple syntax for justifying an item to the center is: justify-center. The specifics for margin or height as well is: m-# or h-#. This simplified and shortened the code making it easier to go back and read.

Altogether, these new technologies made it easier to style the page and make it unique, but simple to navigate.

![animal facts layout](./assets/media/animal-facts-gif.gif)

## **Technologies Used**
* [Tailwind CSS](https://tailwindcss.com/docs/installation)
* [daisyUI](https://daisyui.com/)
* [AniJS](https://anijs.github.io/)
* [PetFinder API](https://www.petfinder.com/developers/v2/docs/)
* [TheDogAPI](https://docs.thedogapi.com/)
* [Charity Navigator API](https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1397)

## **Author**
* [Joey Bennett](https://github.com/coderbennett)
* [Kylie Shinn](https://github.com/kyliemshinn/)
* [Krystopher Quintero](https://github.com/KrystopherQ)
* [Christian Schroeder](https://github.com/cmwschroeder)

## **License**
PetHub is available under the MIT license. For licensing details see [LICENSE](LICENSE.txt) document.