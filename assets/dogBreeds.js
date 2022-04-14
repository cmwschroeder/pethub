var apiKey = 'bc9bace5-c0cb-4315-a1ab-d705a4000250'
var urlDog = 'https://api.thedogapi.com/v1/breeds?api_key=bc9bace5-c0cb-4315-a1ab-d705a4000250'
var select = $('#dog')
    // var img = 'https://api.thedogapi.com/v1/images/search'
var breed = $("#breed")
var breedName = $('#breedName')
var infoDog = $('#infoDog')
var dogData = []



function populateList() {
    fetch(urlDog)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                var optionEl = $('<option>')
                optionEl.text(data[i].name)
                select.append(optionEl)
            }
            dogData = data
                // listSelect(data)
        })
}
populateList()

select.change(listSelect)

function listSelect() {
    breed.html("")
    breedName.html("")
    infoDog.html("")
    var notFound = true
    var i = 0
    while (notFound) {
        if (dogData[i].name === select.val()) {
            notFound = false
        } else { i++ }

    }
    var dogBreeds = {
            //selected dog name
            name: dogData[i].name,
            //what selected dog they were bred for
            bred_for: dogData[i].bred_for,
            //what selected dog bred catergory they are
            breed_group: dogData[i].breed_group,
            //selected dog height
            height: dogData[i].height.imperial,
            //selected dog average life span
            life_span: dogData[i].life_span,
            //selected dog temperament
            temperament: dogData[i].temperament,
            //where selected dog originated from
            origin: dogData[i].origin,
            //grabs image of selected dog breed
            image: dogData[i].image.url
        }
        //dog image
    var imageEl = $('<img>')
    imageEl.attr('src', dogBreeds.image)
    breed.append(imageEl)
    console.log("hello is it me youre looking for")
        // names
    var nameEl = $('<h1>')
    nameEl.text(dogBreeds.name)
    nameEl.attr("style", "font-size:60px")
    breedName.append(nameEl)
        //what they were bred for
    var bredEl = $('<p>')
    bredEl.text(dogBreeds.bred_for)
    infoDog.append(bredEl)
        //what bred group they are
    var groupEl = $('<p>')
    groupEl.text(dogBreeds.breed_group)
    infoDog.append(groupEl)
        // average life span
    var lifeSpanEl = $('<p>')
    lifeSpanEl.text(dogBreeds.life_span)
    infoDog.append(lifeSpanEl)
}