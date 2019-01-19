/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}


//long click mechanics
var node = document.getElementById('trigger');
var longpress = false;
var presstimer = null;
var longtarget = null;

var cancel = function(e) {
    if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
    }
};

var click = function(e) {
    if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
    }
        
    if (longpress) {
        return false;
    }
    
    console.log("press");
};

var start = function(e) {
    console.log(e);
    
    if (e.type === "click" && e.button !== 0) {
        return;
    }
    
    longpress = false;    

    presstimer = setTimeout(function() {
        console.log("long click");
        longpress = true;
    }, 1000);
    
    return false;
};

node.addEventListener("mousedown", start);
node.addEventListener("touchstart", start);
node.addEventListener("click", click);
node.addEventListener("mouseout", cancel);
node.addEventListener("touchend", cancel);
node.addEventListener("touchleave", cancel);
node.addEventListener("touchcancel", cancel);
/**/


(function () {

window.fwdDashButtonAction = function() {
    console.log("forward dash");
}
window.backDashButtonAction = function() {
    console.log("back dash");
}
window.leftTurnButtonAction = function() {
    console.log("left turn");
}
window.rightTurnButtonAction = function() {
    console.log("right turn");
}


})();


document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 76:  //triggerB (l)
            console.log('triggerB');
            break;
        case 80: //triggerA (p)
            console.log('triggerA');
            break;
        case 79: //triggerC (o)
            console.log('triggerC');
            break;
    }
};
  