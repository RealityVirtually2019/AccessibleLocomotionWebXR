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

// sets attribute focussed=“true” for a-entity
function setFocussedToEntity(value = true) {
  const entities = document.querySelectorAll('a-entity');
  Array.from(entities)
    .filter(entity => entity.getAttribute('focussed') !== null)
    .forEach(entity => entity.setAttribute('focussed', value));
}

setFocussedToEntity();
