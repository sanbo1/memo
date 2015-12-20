var pxp = "init";
var red_flg = false;
var yellow_flg = false;
var green_flg = false;
var arrayTimeoutID = new Array();
var Bleacon = require("bleacon");
var fs = require("fs");

Bleacon.startScanning();

function red_on() {
    if( red_flg == false) {
        fs.writeFileSync('/sys/class/gpio/export', 23);
        fs.writeFileSync('/sys/class/gpio/gpio23/direction', 'out');
        fs.writeFileSync('/sys/class/gpio/gpio23/value', 1);
        red_flg = true;
    }
}
function red_off() {
    if( red_flg == true) {
        fs.writeFileSync('/sys/class/gpio/gpio23/value', 0);
        fs.writeFileSync('/sys/class/gpio/unexport', 23);
        red_flg = false;
    }
}

function yellow_on() {
    if( yellow_flg == false) {
        fs.writeFileSync('/sys/class/gpio/export', 24);
        fs.writeFileSync('/sys/class/gpio/gpio24/direction', 'out');
        fs.writeFileSync('/sys/class/gpio/gpio24/value', 1);
        yellow_flg = true;
    }
}
function yellow_off() {
    if( yellow_flg == true) {
        fs.writeFileSync('/sys/class/gpio/gpio24/value', 0);
        fs.writeFileSync('/sys/class/gpio/unexport', 24);
        yellow_flg = false;
    }
}

function green_on() {
    if( green_flg == false) {
        fs.writeFileSync('/sys/class/gpio/export', 25);
        fs.writeFileSync('/sys/class/gpio/gpio25/direction', 'out');
        fs.writeFileSync('/sys/class/gpio/gpio25/value', 1);
        green_flg = true;
    }
}
function green_off() {
    if( green_flg == true) {
        fs.writeFileSync('/sys/class/gpio/gpio25/value', 0);
        fs.writeFileSync('/sys/class/gpio/unexport', 25);
        green_flg = false;
    }
}

/*
Bleacon.on("discover", function(bleacon) {
    console.dir(bleacon);
});
*/

Bleacon.on("discover", function(bleacon) {
    //console.dir(bleacon.uuid);
    //console.dir(bleacon.major);
    //console.dir(bleacon.minor);
    //console.dir(bleacon.proximity);
    // console.dir(bleacon);
    if (pxp != bleacon.proximity) {
        pxp = bleacon.proximity;
        console.dir(bleacon.proximity);

        if (arrayTimeoutID.length != 0) {
            clearTimeout(arrayTimeoutID.shift());
            console.dir("timer clear");
        }

        switch (pxp) {
        case "immediate":
            red_on();
            yellow_off();
            green_off();
            break;
        case "near":
            red_off();
            yellow_on();
            green_off();
            break;
        case "far":
            red_off();
            yellow_off();
            green_on();
            break;
        defaut:
            red_off();
            yellow_off();
            green_off();
            break;
        }

        arrayTimeoutID.push( setTimeout(function(){
            red_off();
            yellow_off();
            green_off();
            console.dir("LED OFF");
            arrayTimeoutID.shift();
        }, 5000) );
    }
});
