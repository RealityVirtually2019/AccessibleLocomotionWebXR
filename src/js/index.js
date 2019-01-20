// eslint-disable-next-line no-unused-vars
/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error(
    'Component attempted to register before AFRAME was available.'
  );
}


// long click mechanics
const node = document.getElementById('trigger');
const contoller = document.getElementById('controller');

// state
let longPress = false;
let veryLongPress = false;
// limit
const longPressTime = 500;
const veryLongPressTime = 1500;
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
      triggerC();
    }
    // check long click
    else if (elapsedTime >= longPressTime) {
      console.log('long click = triggerB');
      triggerB();
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

  console.log('simple click = triggerA')
  triggerA();

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

contoller.addEventListener('touchstart', start);
contoller.addEventListener('touchend', cancel);

//dom ready
(function () {

  var yRot = 0;
  var rig = document.querySelector('[binary-controls]');
  window.fwdDashButtonAction = function() {
      console.log("forward dash"); 
      var fwd = new Event('dashfwd');
      window.dispatchEvent(fwd);
  }
  window.backDashButtonAction = function() {
      console.log("back dash"); 
      var bwd = new Event('dashbwd');
      window.dispatchEvent(bwd);
  }
  window.leftTurnButtonAction = function() {
      console.log("left turn");
      yRot += 22.5;
      rig.setAttribute('rotation','0 '+ yRot +' 0')
  }
  window.rightTurnButtonAction = function() {
      console.log("right turn");
      yRot -= 22.5;
      rig.setAttribute('rotation','0 '+ yRot +' 0')
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

  var directions = ['freeze','twist', 'swing'];
  var myIndex = 1;
  var cursorDirection = directions[0];
  var twistZRot = 0;

  function switchCursorDirection() {
    twistZRot = document.getElementById('twist').getAttribute('rotation').z;
    console.log('twistZRot' + twistZRot);
    cursorDirection = directions[myIndex];
    switch(cursorDirection) {
      case 'twist':
        document.getElementById('twist').object3D.el.setAttribute('animation__rotation', 'property: rotation; dur: 10000; easing: linear; loop: true; from: 0 0 ' + twistZRot + '; to: 0 0 ' + (twistZRot + 360));
        break;
      case 'swing':
        document.getElementById('twist').object3D.el.removeAttribute('animation__rotation');
        document.getElementById('swing').object3D.el.setAttribute('animation__yoyo','property: rotation; dur: 5000; dir: alternate; easing: linear; loop: true; from: 0 30 0; to: 0 -30 0;');
        break;
      case 'freeze':
        document.getElementById('swing').object3D.el.removeAttribute('animation__yoyo');
        break;
    }
    myIndex = (myIndex+1)%(directions.length);


  };  


  function triggerCursor(){
      var event = new Event('click');
      window.dispatchEvent(event);
  }

  var menu = document.querySelector('[binary-controls]');

  function toggleMenu(){
    if( menu.getAttribute('binary-controls').locofirst ){
      menu.setAttribute('binary-controls','locofirst','false');
    }else{
      menu.setAttribute('binary-controls','locofirst','true');        
    }
  }

  window.triggerA = function(){
    console.log('triggerB');
    if(menu.getAttribute('binary-controls').locofirst){
      triggerNavBtn();
    }else{
      triggerCursor();
    }
  }
  window.triggerB = function(){
    console.log('triggerB');
    if(menu.getAttribute('binary-controls').locofirst){
      switchNavBtn();
    }else{
      switchCursorDirection();
    }
  }
  window.triggerC = function(){
    toggleMenu();
  }

  //imitating triggers
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 76:  //triggerB (l)
        triggerB();
        break;
      case 80: //triggerA (p)
        console.log('triggerA');
        triggerA();
        break;
      case 79: //triggerC (o)
        console.log('triggerC');
        triggerC();
        break;
    }
  };


})();
