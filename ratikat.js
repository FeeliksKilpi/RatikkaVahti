const mqtt = require('mqtt')
const topic = '/hfp/v2/journey/ongoing/vp/tram/+/+/+/+/+/+/+/+/60;24/19/62/01/#';
const HSLclient  = mqtt.connect('mqtts://mqtt.hsl.fi:8883');

function stopClient() {
  HSLclient.end();
}
// /<prefix>/<version>/<journey_type>/<temporal_type>/<event_type>/<transport_mode>/<operator_id>/<vehicle_number>/<route_id>/<direction_id>/<headsign>/<start_time>/<next_stop>/<geohash_level>/<geohash>/<sid>/#

HSLclient.on('connect', function () {
  HSLclient.subscribe(topic, function (err) {
    if (!err) {
        console.log('Connection established to HSL client!');
    } else {
        console.log(err);
    }
  })
});

HSLclient.subscribe("/hfp/v2/journey/ongoing/vp/tram/+/+/+/+/+/+/+/+/60;24/19/61/09/#");
HSLclient.subscribe("/hfp/v2/journey/ongoing/vp/tram/+/+/+/+/+/+/+/+/60;24/19/52/91/#");
HSLclient.subscribe("/hfp/v2/journey/ongoing/vp/tram/+/+/+/+/+/+/+/+/60;24/19/62/00/#");
HSLclient.subscribe("/hfp/v2/journey/ongoing/vp/tram/+/+/+/+/+/+/+/+/60;24/19/62/00/#");
HSLclient.subscribe("/hfp/v2/journey/ongoing/vp/tram/+/+/+/+/+/+/+/+/60;24/19/51/98/#");

setTimeout(stopClient, 3600000);


HSLclient.on('message', function (topic, message) {
  console.log("New message!\n");
  let json = JSON.parse(message.toString());
  let speed = json.VP.spd * 3.6;
  console.log('Ratikka ' + json.VP.desi + ', kulkee suuntaan ' + json.VP.dir + ' nopeudella: ' + speed + ' km/h!');
     
});
