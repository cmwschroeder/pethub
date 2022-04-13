var apiKey = 'bc9bace5-c0cb-4315-a1ab-d705a4000250'
var url = 'https://api.thedogapi.com/v1/breeds?api_key=bc9bace5-c0cb-4315-a1ab-d705a4000250'
var select = $('#dog')
var img = 'https://api.TheDogAPI.com/images/search?breed_id={{selected_breed.id}} '


function populateList() {
    fetch(url)
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
        })
}
populateList()