const mqtt = require('mqtt')
const topic = '/hfp/v2/journey/ongoing/vp/tram/+/+/+/+/+/+/+/+/60;24/19/62/01/#';
const HSLclient  = mqtt.connect('mqtts://mqtt.hsl.fi:8883');

// Function that ends connection to HSL client. Called when setTimeout reaches 15mins
function stopClient() {
  console.log("Timeout, closing connection automatically...");
  HSLclient.end();
}
// /<prefix>/<version>/<journey_type>/<temporal_type>/<event_type>/<transport_mode>/<operator_id>/<vehicle_number>/<route_id>/<direction_id>/<headsign>/<start_time>/<next_stop>/<geohash_level>/<geohash>/<sid>/#

// Connect to HSL client
HSLclient.on('connect', function () {
  HSLclient.subscribe(topic, function (err) {
    if (!err) {
        console.log('Connection established to HSL client!');
    } else {
        console.log(err);
    }
  })
});

// Subscribe to various topics consisting of selected locations near tram stops at Huutokonttori, Jätkäsaari
HSLclient.subscribe("/hfp/v2/journey/ongoing/vp/tram/+/+/+/+/+/+/+/+/60;24/19/61/09/#");
HSLclient.subscribe("/hfp/v2/journey/ongoing/vp/tram/+/+/+/+/+/+/+/+/60;24/19/52/91/#");
HSLclient.subscribe("/hfp/v2/journey/ongoing/vp/tram/+/+/+/+/+/+/+/+/60;24/19/62/00/#");
HSLclient.subscribe("/hfp/v2/journey/ongoing/vp/tram/+/+/+/+/+/+/+/+/60;24/19/62/00/#");
HSLclient.subscribe("/hfp/v2/journey/ongoing/vp/tram/+/+/+/+/+/+/+/+/60;24/19/51/98/#");

// Set automatic timeout to close client after 15 minutes
setTimeout(stopClient, 900000);

// When message comes from some of the subscribed topics
HSLclient.on('message', function (topic, message) {
  // Create timestamp
  var currentdate = new Date(); 
  var datetime =    "<"+currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds() + ">";
  // json object of each message, message parsed to json object
  let json = JSON.parse(message.toString());
  // Different attributes of message, incl. line number, speed, direction, and door status
  let line = json.VP.desi;
  let speed = Math.round(json.VP.spd * 3.6);
  let direction = json.VP.dir;
  let doors = json.VP.drst;

  // Conditional statement for different tram lines
  switch (line) {

    case "9":
      if (direction === "1") {
        console.log(datetime + ' ' + 'Tram ' + line + ', is heading towards Pasila at speed: ' + speed + ' km/h!');
        if (speed <= 1 && doors === 0) {
          console.log("Tram is at the stop and doors are closed");
        }
        else if (speed <= 1 && doors === 1) {
          console.log("Tram is at the stop and doors are open");
        }
      }
      else if (direction === "2") {
        console.log(datetime + ' ' + 'Tram ' + line + ', is heading towards Jätkäsaari at speed: ' + speed + ' km/h!');
      }
      console.log("\n");
      break;

    case "7":
      if (direction === "1") {
        console.log(datetime + ' ' + 'Tram ' + line + ', is heading towards Pasila at speed: ' + speed + ' km/h!');
        if (speed <= 1 && doors === 0) {
          console.log("Tram is at the stop and doors are closed");
        }
        else if (speed <= 1 && doors === 1) {
          console.log("Tram is at the stop and doors are open");
        }
      }
      else if (direction === "2") {
        console.log(datetime + ' ' + 'Tram ' + line + ', is heading towards Länsiterminaali at speed: ' + speed + ' km/h!');
        if (speed <= 1 && doors === 0) {
          console.log("Tram is at the stop and doors are closed");
        }
        else if (speed <= 1 && doors === 1) {
          console.log("Tram is at the stop and doors are open");
        }
      }
      console.log("\n");
      break;

    case "6T":
      if (direction === "1") {
        console.log(datetime + ' ' + 'Tram ' + line + ', is heading towards Arabianranta at speed: ' + speed + ' km/h!');
        if (speed <= 1 && doors === 0) {
          console.log("Tram is at the stop and doors are closed");
        }
        else if (speed <= 1 && doors === 1) {
          console.log("Tram is at the stop and doors are open");
        }
      }
      else if (direction === "2") {
        console.log(datetime + ' ' + 'Tram ' + line + ', is heading towards Länsiterminaali at speed: ' + speed + ' km/h!');
        if (speed <= 1 && doors === 0) {
          console.log("Tram is at the stop and doors are closed");
        }
        else if (speed <= 1 && doors === 1) {
          console.log("Tram is at the stop and doors are open");
        }
      }
      console.log("\n");
      break;
  }
     
});
