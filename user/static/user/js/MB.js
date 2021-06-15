
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

});



//--------Mapbox--------
  L.mapbox.accessToken = 'pk.eyJ1IjoidGFubWF5c2FsdW5rZSIsImEiOiJja29oNHI1eTQwNzR2MnZqendkeGw2eHdyIn0.ILVdEga_8iXsY3NksJd9Pw';
  var map = L.mapbox.map('map', 'ianjennings.l896mh2e');
  var channel = 'pubnub-mapbox';
  var tacos = new pubnub_mapbox({
    map: map,
    channel: channel,
    init: init
  });
  //////////////
  function init() {
    var point = {
      latlng: [37.370375, -97.756138]
    };
    var pn = PUBNUB.init({
      publish_key: 'demo'
    });
    setInterval(function(){
      var new_point = JSON.parse(JSON.stringify(point));
      new_point.latlng = [
        new_point.latlng[0] + (Math.floor(Math.random()) * 0.1),
        new_point.latlng[1] + (Math.floor(Math.random()) * 0.2)
      ];
      pn.publish({
        channel: channel,
        message: [new_point]
      });
    }, 500);
  };