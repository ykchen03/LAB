var mymap = L.map('map').setView([24.807308150450645, 120.96901512688065], 13);
var markers = L.layerGroup().addTo(mymap);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
}).addTo(mymap);

function showRoute(){
    markers.clearLayers();
    fetch('https://worker-dry-wind-ac0b.ykchen03.workers.dev/?route='+ $("#selection").val())
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        L.geoJSON(data).addTo(markers);
    })
    .catch(error => console.error('Error:', error));
}