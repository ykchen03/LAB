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
  fetch('https://tdx.transportdata.tw/api/basic/V3/Map/Bus/Network/StopOfRoute/City/Hsinchu/RouteName/'+ $("#selection").val() +'?%24format=GEOJSON', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJER2lKNFE5bFg4WldFajlNNEE2amFVNm9JOGJVQ3RYWGV6OFdZVzh3ZkhrIn0.eyJleHAiOjE2OTk0MDg3MTIsImlhdCI6MTY5OTMyMjMxMiwianRpIjoiMDVjMDdiMGQtZTRlNy00NDI1LWE4YjktYzNlNzNiNDllYjk4IiwiaXNzIjoiaHR0cHM6Ly90ZHgudHJhbnNwb3J0ZGF0YS50dy9hdXRoL3JlYWxtcy9URFhDb25uZWN0Iiwic3ViIjoiY2ZkZDE5ZTItZjlhYS00MTU3LWIwN2YtZDdlMjYwNTVlOWY2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYjExMDAyMDg5LWI3NmM0NGZiLTQxMzktNDdkZiIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsic3RhdGlzdGljIiwicHJlbWl1bSIsInBhcmtpbmdGZWUiLCJtYWFzIiwiYWR2YW5jZWQiLCJ2YWxpZGF0b3IiLCJoaXN0b3JpY2FsIiwiYmFzaWMiXX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInVzZXIiOiJiZWQ0MjllNyJ9.Cc6grgMFEVdq6FQj5876RfGCXLUPugncujzvhf9BzzGeoDHOAXcmR6QoH6uZZqgdnCaOQ9flEY-eSQRm4-2nB64KH5fNM3QwS6H09uGc3av4OPHETp4_NkYxzzjUf0ZJIN2x57IYGuzoNrza64GZbgjnYFA5atKV74hTrYvYWLj2XIj5jPI5daZPMpXyKllc_AqKHfqv8Aat1CMqu7v9fakAD6U2oBOInx8QFR62Sx5T6ZWe7_McZH7G7dNmhL6YdTnHYuLlnKENVhOsAyrxo7wPqHKqAyzC5Jbg94BSslV5QJKEsu1bT5AooT0YeYPI-7drIv5GunzmwLOpV_C10A'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    L.geoJSON(data).addTo(markers);
  })
  .catch(error => console.error('Error:', error));
}