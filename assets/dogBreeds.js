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
        name: dogData[i].name,
        bred_for: dogData[i].bred_for,
        breed_group: dogData[i].breed_group,
        height: dogData[i].height.imperial,
        life_span: dogData[i].life_span,
        temperament: dogData[i].temperament,
        origin: dogData[i].origin,
        image: dogData[i].image.url
    }
    var imageEl = $('<img>')
    imageEl.attr('src', dogBreeds.image)
    breed.append(imageEl)
    console.log("hello is it me youre looking for")
    var nameEl = $('<h1>')
    nameEl.text(dogBreeds.name)
    nameEl.attr("style", "font-size:60px")
    breedName.append(nameEl)
    var bredEl = $('<p>')
    bredEl.text(dogBreeds.bred_for)
    infoDog.append(bredEl)
    var lifeSpanEl = $('<p>')
    lifeSpanEl.text(dogBreeds.life_span)
    infoDog.append(lifeSpanEl)

}