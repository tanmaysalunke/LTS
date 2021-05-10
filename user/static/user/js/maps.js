// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 19.2167930,
      lng: 72.9590893
    },
    zoom: 8,
  });


  // <!-- TODO: Add SDKs for Firebase products that you want to use
  //  https://firebase.google.com/docs/web/setup#available-libraries

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
  //Linking Firebase 2
  // var script = document.createElement('script');
  // script.type = 'text/javascript';
  // script.src = 'https://www.gstatic.com/firebasejs/3.4.0/firebase.js';
  // document.body.appendChild(script);

  //defining the database
  /*var config = {
    apiKey: " ",
    authDomain: " ",
    databaseURL: " ",
    storageBucket: " ",
  };
  firebase.initializeApp(c);*/
  //initialising lat and lng
  var database=firebase.database();
  var rootRef = firebase.database().ref();
  rootRef.on("child_added", snap =>{
  var latitude = snap.child("latitude").val();
  var longitude = snap.child("longitude").val();
  initMap(latitude,longitude);
  //$("#table_body").append("<tr><td>" + latitude + "</td><td>" + longitude + "</td></tr>");
});

  //testing firebase linking
  alert (latitude + " " + longitude);

  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: parseFloat(position.coords.latitude),
            lng: parseFloat(position.coords.longitude),
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation ?
    "Error: The Geolocation service failed." :
    "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
