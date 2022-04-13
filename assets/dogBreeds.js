var settings = {
    async: true,
    crossDomain: true,
    url: "https://api.thedogapi.com/v1/breeds?attach_breed=0",
    method: "GET",
    headers: {
        x - api - key: "bc9bace5-c0cb-4315-a1ab-d705a4000250"
    }
}

$.ajax(settings).done(function(response) {
    console.log(response);
});