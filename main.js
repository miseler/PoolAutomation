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

setInterval(function() {
  if(!alertOn) {
    NC.ledTop();
    NC.ledBottom();
  }
  else {
    LEDon = !LEDon;
    NC.ledTop([0,255*LEDon,255*!LEDon]);
    NC.ledBottom([0,255*!LEDon,255*LEDon]);
  }
}, 500);


function btn4() {
  if (digitalRead(BTN4) == 1) alertOn = !alertOn;
}

function btn3() {
  if (digitalRead(BTN3) == 1) backlightOn = !backlightOn;
  var backlight=100;
  if(!backlightOn) backlight=0;
  NC.backlight(Array(9).fill(backlight));
}

function btn2() {
  if (digitalRead(BTN2) == 1) backlightOn = !backlightOn;
  var backlight=100;
  if(!backlightOn) backlight=0;
  NC.backlight(Array(9).fill(backlight));
}

btn2();
btn3();
btn4();

setWatch(btn2, BTN2, true);
setWatch(btn3, BTN3, true);
setWatch(btn4, BTN4, true);
