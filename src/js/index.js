// eslint-disable-next-line no-unused-vars
/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error(
    'Component attempted to register before AFRAME was available.'
  );
}


// long click mechanics
const node = document.getElementById('trigger');
// state
let longPress = false;
let veryLongPress = false;
// limit
const longPressTime = 1000;
const veryLongPressTime = 2000;
// let longtarget = null;
let pressTimer = null;
let startTime = null;

const cancel = () => {
  console.log('cancel');

  // if timer exists
  if (pressTimer !== null) {
    clearTimeout(pressTimer);
    pressTimer = null;

    // final time
    const elapsedTime = performance.now() - startTime;

    // check very long click
    if (elapsedTime >= veryLongPressTime) {
      veryLongPress = true;
      console.log('very long click = triggerC');
    }
    // check long click
    else if (elapsedTime >= longPressTime) {
      console.log('long click = triggerB');
      longPress = true;
    }
  }
};

const click = () => {
  if (pressTimer !== null) {
    cancel();
  }

  if (longPress || veryLongPress) {
    return;
  }

  console.log('simple click = triggerA');
};

const start = e => {
  console.log(e);
  if (e.type === 'click' && e.button !== 0) {
    return;
  }

  // reset state
  longPress = false;
  veryLongPress = false;
  startTime = performance.now();

  // max timeout
  pressTimer = setTimeout(cancel, veryLongPressTime);
};

node.addEventListener('mousedown', start);
node.addEventListener('touchstart', start);
node.addEventListener('click', click);
node.addEventListener('mouseout', cancel);
node.addEventListener('touchend', cancel);
node.addEventListener('touchleave', cancel);
node.addEventListener('touchcancel', cancel);


// sets attribute infocus=“true” for a-entity[locomotion_btn]
function setFocussedToEntity(value = true) {
  const entities = document.querySelectorAll('a-entity');
  Array.from(entities)
    .filter(entity => entity.getAttribute('focussed') !== null)
    .forEach(entity => entity.setAttribute('focussed', value));
}

setFocussedToEntity();

//create custom events


//dom ready
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



    function switchNavBtn(){
      var buttons = document.querySelectorAll('[locobtn]');
      let iterator = 0;
      for (let i = 0; i < buttons.length; i++) {
        if(buttons[i].getAttribute('infocus') == 'true'|| buttons[i].getAttribute('infocus')){
          console.log(i)
          iterator = i + 1;
        }
      }
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('infocus', false);
      }
      if (iterator >= buttons.length) {
        iterator = 0;
      }
      buttons[iterator].setAttribute('infocus', true);
    }
      
    function triggerNavBtn(){
      var buttons = document.querySelectorAll('[locobtn]');
      var event = new Event('click');
      for (let i = 0; i < buttons.length; i++) {
        if(buttons[i].getAttribute('infocus') == 'true'|| buttons[i].getAttribute('infocus')){
          buttons[i].dispatchEvent(event);
        }
      }
    }



//imitating triggers

      
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 76:  //triggerB (l)
      console.log('triggerB');
      switchNavBtn();
      break;
    case 80: //triggerA (p)
      console.log('triggerA');
      triggerNavBtn();
      break;
    case 79: //triggerC (o)
      console.log('triggerC');
      break;
  }
};


})();
