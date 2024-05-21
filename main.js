// require("https://raw.githubusercontent.com/miseler/PoolAutomation/master/main.js");
// https://www.espruino.com/modules/nodeconfeu2018.js
// https://nodeconfeubadge.org/
// virtual LEDs: https://forum.espruino.com/conversations/341306/#15005751
// virtual LEDs: https://forum.espruino.com/conversations/341372/
// offline development: https://forum.espruino.com/conversations/395908/
// https://www.espruino.com/Pixl.js+Multicolour
// https://github.com/Espruino/EspruinoDocs/blob/master/boards/PixljsMulticolour/simple.js
// https://www.youtube.com/watch?v=H8L8ft830hI
// https://www.youtube.com/watch?v=txZr2GhuoaI
// https://www.youtube.com/watch?v=2ODoIpnTDA4
// https://www.espruino.com/IoT+Services
// https://www.espruino.com/Reference

//Set output 1 to ON
//http://192.168.1.230/r-ee1ac5d/share/set-netio-output1-to-1.json
//http://192.168.1.230/netio.cgi?pass=&output1=4
//http://192.168.1.230/netio.json
//FIFO_FULL

/*
require("Storage").write(".boot0", `
WIFI_NAME = "MyWiFi";
WIFI_PASS = "HelloWorld123";
`);
*/

/*
var c = [127,0,0];
  NC.ledTop(c);
  NC.ledBottom(c);
  NC.backlight(c.concat(c,c,c));
*/


var NC = require("nodeconfeu2018");
var LEDon = false;
var alertOn = false;
var backlightOn = false;
var backlightIndex=0;

const inspect = obj => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      console.log(`${prop}: ${obj[prop]}`);
    }
  }
};

// shim to run Pixl.js Multicolour code on the Bangle1.js emulator
if(NC.ledTop == undefined) { NC.ledTop = function(a) { // 3 element array
    console.log(a);
};}
if(NC.ledBottom == undefined) { NC.ledBottom = function(a) { // 3 element array
    console.log(a);
};}
if(NC.backlight == undefined) { NC.backlight = function(a) { // 3 element array
    console.log(a);
};}

setInterval(function() {
  if(!alertOn) {
    //NC.ledTop();
    //NC.ledBottom();
    NC.backlight(Array(12).fill(100));
    //NC.backlight([255,0,0,   0,255,0,   0,0,255,   0,0,0]);
  }
  else {
    LEDon = !LEDon;
    //NC.ledTop([0,255*LEDon,255*!LEDon]);
    //NC.ledBottom([0,255*!LEDon,255*LEDon]);
    //var backlight = [0,255*!LEDon,255*LEDon,0,255*!LEDon,255*LEDon,0,255*!LEDon,255*LEDon,0,255*!LEDon,255*LEDon];
    var backlight;
    var backlightWhiteDark = Array(12).fill(100);
    var backlightWhite = Array(12).fill(255);
    var backlightRedDark = [0,0,120,0,0,120,0,0,120,0,0,120];
    var backlightRed = [0,0,255,0,0,255,0,0,255,0,0,255];
    var backlightGreenDark = [0,100,0,0,100,0,0,100,0,0,100,0];
    var backlightGreen = [0,255,0,0,255,0,0,255,0,0,255,0];
    var backlightBlueDark = [225,0,0,225,0,0,225,0,0,225,0,0];
    var backlightBlue = [255,40,40,255,40,40,255,40,40,255,40,40];
    switch((backlightIndex++)%8) {
      case 0: backlight=backlightWhiteDark;break;
      case 1: backlight=backlightWhite;break;
      case 2: backlight=backlightRedDark;break;
      case 3: backlight=backlightRed;break;
      case 4: backlight=backlightGreenDark;break;
      case 5: backlight=backlightGreen;break;
      case 6: backlight=backlightBlueDark;break;
      case 7: backlight=backlightBlue;break;
    }
    /*
    backlight[0]=0;
    backlight[1]=255*!LEDon;
    backlight[2]=255*LEDon;
    backlight[6]=0;
    backlight[7]=255*!LEDon;
    backlight[8]=255*LEDon;
    */
    //NC.backlight([0,0*255*!LEDon,0*255*LEDon,0,0*255*!LEDon,0*255*LEDon,0,255*!LEDon,255*LEDon,0,0*255*!LEDon,0*255*LEDon]);
    NC.backlight(backlight);
  }
}, 800);


function btn1() {
  if (digitalRead(BTN1) == 1) alertOn = !alertOn;
  console.log("alert is: "+alertOn);
}

function btn3() {
  if (digitalRead(BTN3) == 1) backlightOn = !backlightOn;
  var backlight=backlightOn?100:0;
  NC.backlight(Array(12).fill(backlight));
}

function btn2() {
  if (digitalRead(BTN2) == 1) backlightOn = !backlightOn;
  var backlight=backlightOn?100:0;
  NC.backlight(Array(12).fill(0,0,200));
}

btn2();
btn3();
btn1();

setWatch(btn2, BTN2, true);
setWatch(btn3, BTN3, true);
setWatch(btn1, BTN1, true);

D9.set(); // power on
Serial1.setup(115200,{rx:D0,tx:D1});

var wifi = require("ESP8266WiFi").connect(Serial1, function(err) {
  if (err) throw err;
  console.log("Connecting to WiFi");
  wifi.connect(WIFI_NAME, WIFI_PASS, function(err) {
    if (err) throw err;
    console.log("Connected");
    // Now you can do something, like an HTTP request
    require("http").get("http://www.pur3.co.uk/hello.txt", function(res) {
      console.log("Response: ",res);
      res.on('data', function(d) {
        console.log("--->"+d);
      });
    });
  });
});


/*
exports = {
  NC : NC,
  alertOn : alertOn,
};
*/
