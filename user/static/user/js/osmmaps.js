
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBBB8HAy-SPKss-z3bgJ-7dazelM1KV1LY",
  authDomain: "lts-10-05.firebaseapp.com",
  databaseURL: "https://lts-10-05-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lts-10-05",
  storageBucket: "lts-10-05.appspot.com",
  messagingSenderId: "759329553214",
  appId: "1:759329553214:web:390be8dfffc959fb28ca6f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database=firebase.database();
  var rootRef = firebase.database().ref();
  rootRef.on("child_added", snap =>{
  var latitude = snap.child("latitude").val();
  var longitude = snap.child("longitude").val();
  //console.log(latitude, longitude)
  initialize_map(latitude, longitude);
  add_map_point(parseFloat(latitude), parseFloat(longitude));
});
//console.log(getLatLong())



// Initialising map
var map;
var mapLat = 19.2167930;
    var mapLng = 72.9590893;
var mapDefaultZoom = 10;

function initialize_map(lat, long) {
  map = new ol.Map({
    target: "map",
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM({
                  url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
            })
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([long, lat]),
        zoom: mapDefaultZoom
    })
  });
}

function add_map_point(lati, long) {
  var vectorLayer = new ol.layer.Vector({
    source:new ol.source.Vector({
      features: [new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([parseFloat(long), parseFloat(lati)], 'EPSG:4326', 'EPSG:3857')),
        })]
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg"
      })
    })
  });

  map.addLayer(vectorLayer); 
}
