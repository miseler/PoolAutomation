//require("https://raw.githubusercontent.com/miseler/PoolAutomation/master/main.js");

//Set output 1 to ON
//http://192.168.1.230/r-ee1ac5d/share/set-netio-output1-to-1.json
//http://192.168.1.230/netio.cgi?pass=&output1=4



var NC = require("nodeconfeu2018");
var LEDon = false;
var alertOn = false;
var backlightOn = false;

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
  }
  else {
    LEDon = !LEDon;
    //NC.ledTop([0,255*LEDon,255*!LEDon]);
    //NC.ledBottom([0,255*!LEDon,255*LEDon]);
    var backlight = [0,255*!LEDon,255*LEDon,0,255*!LEDon,255*LEDon,0,255*!LEDon,255*LEDon,0,255*!LEDon,255*LEDon];
    /*
    backlight[0]=0;
    backlight[1]=255*!LEDon;
    backlight[2]=255*LEDon;
    backlight[6]=0;
    backlight[7]=255*!LEDon;
    backlight[8]=255*LEDon;
    */
    NC.backlight(backlight);
  }
}, 500);


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

exports = {
  NC : NC,
  alertOn : alertOn,
};
