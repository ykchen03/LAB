const mymap = L.map('map').setView([24.807308150450645, 120.96901512688065], 13);
const markers = L.layerGroup().addTo(mymap);
const greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41], // size of the icon
    shadowSize: [41, 41], // size of the shadow
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
}).addTo(mymap);

const Operator = {
    13 : "<a href=\"http://www.hcbus.com.tw\">新竹客運</a>",
    14 : "<a href=\"http://www.mlbus.com.tw\">苗栗客運</a>",
    18 : "<a href=\"http://www.yosemite-bus.com.tw\">科技之星交通</a>",
    45 : "<a href=\"http://www.kingbus.com.tw\">國光客運</a>",
    67 : "<a href=\"http://www.gobus.com.tw\">金牌客運</a>"
};

function showRoute(){
    markers.clearLayers();
    fetch('https://worker-dry-wind-ac0b.ykchen03.workers.dev/?route='+ $("#selection").val())
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        L.geoJSON(data.route).addTo(markers);
        data.bus.forEach(item => {
            L.marker([item.BusPosition.PositionLat, item.BusPosition.PositionLon], {icon: greenIcon})
            .bindPopup(`<b>車號:</b> ${item.PlateNumb}<br><b>車速:</b> ${item.Speed}<br><b>營運者:</b> ${Operator[item.OperatorID]}<br><b>更新時間:</b> ${item.UpdateTime}`)
            .addTo(markers);
        });
    })
}