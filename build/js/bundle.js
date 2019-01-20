(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('binary-controls', {
  schema: {
    emitter: {
      type: 'string',
      default: 'triggerA'
    },
    selecter: {
      type: 'string',
      default: 'triggerB'
    },
    switcher: {
      type: 'string',
      default: 'triggerC'
    },
    locomotion: {
      type: 'boolean',
      default: true
    },
    interaction: {
      type: 'boolean',
      default: true
    },
    locofirst: {
      type: 'boolean',
      default: true
    }
  },
  init: function init() {
    var data = this.data;
    var el = this.el;
    this.cameraEl = document.querySelector('a-entity[camera]');

    if (this.cameraEl) {
      // interaction mode
      if (data.interaction) {
        var interactionAxes = document.createElement("a-entity");
        interactionAxes.setAttribute('geometry', "primitive:cylinder; height:0.005; radius:1.02;openEnded:true;");
        interactionAxes.setAttribute('material', "shader: flat; opacity:0.5; color:white; side:back");
        interactionAxes.setAttribute('rotation', '0 0 0');
        interactionAxes.setAttribute('id', 'twist');
        this.cameraEl.appendChild(interactionAxes);
        this.interactionAxes = interactionAxes;
        var interactionSwing = document.createElement("a-entity");
        interactionSwing.setAttribute('rotation', '0 0 0');
        interactionSwing.setAttribute('id', 'swing');
        interactionAxes.appendChild(interactionSwing);
        this.interactionSwing = interactionSwing;
        var interactionCursor = document.createElement("a-entity");
        interactionCursor.setAttribute('cursor', '');
        interactionCursor.setAttribute('raycaster', 'far: 20; interval: 1000;');
        interactionCursor.setAttribute('geometry', 'primitive: ring; radiusInner: 0.02; radiusOuter: 0.03');
        interactionCursor.setAttribute('position', '0 0 -1.05');
        interactionCursor.setAttribute('material', 'color: black; shader: flat');
        interactionSwing.appendChild(interactionCursor);
      } // locomotion mode


      if (data.locomotion) {
        var locomotionNav = document.createElement("a-entity");
        locomotionNav.setAttribute('position', '0 -0.25 -0.65');
        locomotionNav.setAttribute('rotation', '-30 0 0');
        this.cameraEl.appendChild(locomotionNav);
        this.locomotionNav = locomotionNav;
        var fwd = document.createElement("a-entity");
        fwd.setAttribute('infocus', 'true');
        fwd.setAttribute('position', '0 0.1 0');
        fwd.setAttribute('rotation', '0 0 0');
        fwd.setAttribute('scale', '0.3 0.3 0.3');
        fwd.setAttribute('locobtn', 'clickAction:fwdDashButtonAction');
        locomotionNav.appendChild(fwd);
        var rt = document.createElement("a-entity");
        rt.setAttribute('infocus', 'true');
        rt.setAttribute('position', '0.1 0 0');
        rt.setAttribute('rotation', '0 0 -90');
        rt.setAttribute('scale', '0.3 0.3 0.3');
        rt.setAttribute('locobtn', 'clickAction:rightTurnButtonAction');
        locomotionNav.appendChild(rt);
        var bwd = document.createElement("a-entity");
        bwd.setAttribute('infocus', 'true');
        bwd.setAttribute('position', '0 -0.1 0');
        bwd.setAttribute('rotation', '0 0 180');
        bwd.setAttribute('scale', '0.3 0.3 0.3');
        bwd.setAttribute('locobtn', 'clickAction:backDashButtonAction');
        locomotionNav.appendChild(bwd);
        var lt = document.createElement("a-entity");
        lt.setAttribute('infocus', 'true');
        lt.setAttribute('position', '-0.1 0 0');
        lt.setAttribute('rotation', '0 0 90');
        lt.setAttribute('scale', '0.3 0.3 0.3');
        lt.setAttribute('locobtn', 'clickAction:leftTurnButtonAction');
        locomotionNav.appendChild(lt);
      }

      if (data.locofirst) {
        if (data.interaction) {
          this.interactionAxes.setAttribute('visible', 'false');
        }

        if (data.locomotion) {
          this.locomotionNav.setAttribute('visible', 'true');
        }
      } else {
        if (data.interaction) {
          this.interactionAxes.setAttribute('visible', 'true');
        }

        if (data.locomotion) {
          this.locomotionNav.setAttribute('visible', 'false');
        }
      }
    } else {
      console.log("Please add a camera to your scene.");
    }

    window.addEventListener(this.data.emitter, this.emitterHandler.bind(this));
    window.addEventListener(this.data.selecter, this.selecterHandler.bind(this));
    window.addEventListener(this.data.switcher, this.switcherHandler.bind(this)); // document.getElementById('axes').object3D.el.setAttribute('animation__rotation', 'property: rotation; dur: 10000; easing: linear; loop: true; to: 0 0 360');
    // document.getElementById('axes').object3D.el.removeAttribute('animation__rotation');
    // animation__yoyo="property: rotation; dur: 10000; dir: alternate; easing: linear; loop: true; from: 0 0 0; to: 0 50 0;"
  },
  emitterHandler: function emitterHandler(evt) {//document.querySelector('a-scene').emit('click');
  },
  selecterHandler: function selecterHandler(evt) {},
  switcherHandler: function switcherHandler(evt) {// document.querySelector('[binary-controls]').setAttribute('binary-controls','locofirst','false')
  },
  update: function update() {
    if (this.data.locofirst) {
      if (this.data.interaction) {
        this.interactionAxes.setAttribute('visible', 'false');
      }

      if (this.data.locomotion) {
        this.locomotionNav.setAttribute('visible', 'true');
      }
    } else {
      if (this.data.interaction) {
        this.interactionAxes.setAttribute('visible', 'true');
      }

      if (this.data.locomotion) {
        this.locomotionNav.setAttribute('visible', 'false');
      }
    }
  }
}); // Loco button component

AFRAME.registerComponent('locobtn', {
  multiple: true,
  schema: {
    on: {
      default: 'click'
    },
    clickAction: {
      type: 'string'
    },
    radius: {
      type: 'number',
      default: 0.16
    }
  },
  init: function init() {
    var data = this.data;
    var el = this.el;
    var bEntity = document.createElement("a-entity");
    bEntity.setAttribute('geometry', "primitive: circle; radius:".concat(data.radius - 0.01, ";"));
    bEntity.setAttribute('material', "shader: flat; color:#000;opacity:0.5;");
    bEntity.setAttribute('position', '0 0 0');
    el.appendChild(bEntity);
    var icon = document.createElement("a-entity");
    icon.setAttribute('geometry', "primitive:triangle;vertexA:0.07 0 0;vertexB:0 0.12 0;vertexC:-0.07 0 0");
    icon.setAttribute('material', "shader: flat; transparent: true; opacity: 1; color:#fff;");
    icon.setAttribute('position', ' 0 -0.035 0.001');
    icon.setAttribute('visible', 'true');
    bEntity.appendChild(icon);
    this.icon = icon;
    el.addEventListener(data.on, function () {
      var clickActionFunctionName = data.clickAction;
      console.log("in button, clickActionFunctionName: " + clickActionFunctionName);
      var clickActionFunction = window[clickActionFunctionName];
      if (typeof clickActionFunction === "function") clickActionFunction();
    });
  }
}); // Component to change to a sequential color on click.

AFRAME.registerComponent('infocus', {
  schema: {
    type: 'boolean',
    default: false
  },
  init: function init() {
    var data = this.data;
    var el = this.el;
    var rEntity = document.createElement("a-entity");
    rEntity.setAttribute('geometry', "primitive:ring; radiusInner:0.16; radiusOuter:0.17");
    rEntity.setAttribute('material', "shader: flat; opacity:0; color:#f00;");
    rEntity.setAttribute('position', '0 0 0');
    el.appendChild(rEntity);
    this.rEntity = rEntity;
  },
  update: function update() {
    if (this.data) {
      this.rEntity.setAttribute('material', "shader: flat; opacity:1; color:#f00;");
    } else {
      this.rEntity.setAttribute('material', "shader: flat; opacity:0; color:#f00;");
    }
  }
});
AFRAME.registerComponent('dash-controls', {
  schema: {},
  init: function init() {
    this.dVelocity = new THREE.Vector3();
    this.direction = 0;
    window.addEventListener('dashfwd', this.onDashFwd.bind(this), false);
    window.addEventListener('dashbwd', this.onDashBwd.bind(this), false);
  },
  isVelocityActive: function isVelocityActive() {
    return true;
  },
  getVelocityDelta: function getVelocityDelta() {
    this.dVelocity.z = this.direction;
    return this.dVelocity.clone();
  },
  onDashFwd: function onDashFwd(event) {
    this.direction = -0.125;
    setTimeout(this.stopDash.bind(this), 500);
  },
  onDashBwd: function onDashBwd(event) {
    this.direction = 0.125;
    setTimeout(this.stopDash.bind(this), 500);
  },
  stopDash: function stopDash() {
    this.direction = 0;
  }
});
AFRAME.registerComponent('trackpadclick-controls', {
  schema: {},
  init: function init() {
    console.log('testing trackpad!!!!'); //var GAMEPAD_ID_PREFIX = 'HTC Vive Focus';
    //var GAMEPAD_ID_PREFIX = 'Gear VR|GearVR|Oculus Go';

    var Context_AF = this;
    Context_AF.prevTime = null;
    Context_AF.timePassed = null;
    Context_AF.planeEl = document.querySelector('#plane');
    Context_AF.el.addEventListener('touchstart', function (event) {
      console.log("touchstart");
      Context_AF.planeEl.setAttribute('material', {
        color: '#00FF00'
      });
      Context_AF.prevTime = new Date();
    });
    Context_AF.el.addEventListener('touchend', function (event) {
      console.log("touchend");
      Context_AF.planeEl.setAttribute('material', {
        color: '#FF0000'
      });
      var currTime = new Date();
      Context_AF.timePassed = currTime - Context_AF.prevTime;
      console.log("timne passed: " + Context_AF.timePassed);
    });
  }
});
AFRAME.registerComponent('lookatlabel', {
  init: function init() {
    this.vector = new THREE.Vector3();
  },
  tick: function tick(t) {
    var self = this;
    var target = self.el.sceneEl.camera;
    var object3D = self.el.object3D; // make sure camera is set

    if (target) {
      target.updateMatrixWorld();
      this.vector.setFromMatrixPosition(target.matrixWorld);

      if (object3D.parent) {
        object3D.parent.updateMatrixWorld();
        object3D.parent.worldToLocal(this.vector);
      }

      return object3D.lookAt(new THREE.Vector3(this.vector.x, object3D.position.y, this.vector.z));
    }
  }
});
AFRAME.registerComponent('label-furniture', {
  schema: {
    type: 'string',
    default: 'name'
  },
  init: function init() {
    var el = this.el;
    el.setAttribute('material', "shader: flat; opacity:0; color:blue;");
    var label = document.createElement("a-entity");
    label.setAttribute('geometry', 'primitive:plane; width:1; height:0.4;');
    label.setAttribute('text', "value:".concat(this.data, "; align:center; font:https://cdn.aframe.io/fonts/Aileron-Semibold.fnt; color:#fbfbfb;width:0.5;wrapCount:10;"));
    label.setAttribute('material', "color:#111; opacity:1;");
    label.setAttribute('position', '0 0.8 0');
    label.setAttribute('scale', '0.0001 0.0001 0.0001');
    label.setAttribute('lookatlabel', '');
    el.appendChild(label);
    this.label = label;
    el.addEventListener('mouseenter', function () {
      el.setAttribute('material', 'opacity', '0.2');
      label.setAttribute('scale', '1 1 1');
    });
    el.addEventListener('mouseleave', function () {
      el.setAttribute('material', 'opacity', '0');
      label.setAttribute('scale', '0.0001 0.0001 0.0001');
    });
  }
});

},{}],2:[function(require,module,exports){
"use strict";

// eslint-disable-next-line no-unused-vars

/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
} // long click mechanics


var node = document.getElementById('trigger'); // state

var longPress = false;
var veryLongPress = false; // limit

var longPressTime = 1000;
var veryLongPressTime = 2000; // let longtarget = null;

var pressTimer = null;
var startTime = null;

var cancel = function cancel() {
  console.log('cancel'); // if timer exists

  if (pressTimer !== null) {
    clearTimeout(pressTimer);
    pressTimer = null; // final time

    var elapsedTime = performance.now() - startTime; // check very long click

    if (elapsedTime >= veryLongPressTime) {
      veryLongPress = true;
      console.log('very long click = triggerC');
    } // check long click
    else if (elapsedTime >= longPressTime) {
        console.log('long click = triggerB');
        longPress = true;
      }
  }
};

var click = function click() {
  if (pressTimer !== null) {
    cancel();
  }

  if (longPress || veryLongPress) {
    return;
  }

  console.log('simple click = triggerA');
};

var start = function start(e) {
  console.log(e);
  alert(e);

  if (e.type === 'click' && e.button !== 0) {
    return;
  } // reset state


  longPress = false;
  veryLongPress = false;
  startTime = performance.now(); // max timeout

  pressTimer = setTimeout(cancel, veryLongPressTime);
};

node.addEventListener('mousedown', start);
node.addEventListener('touchstart', start);
node.addEventListener('click', click);
node.addEventListener('mouseout', cancel);
node.addEventListener('touchend', cancel);
node.addEventListener('touchleave', cancel);
node.addEventListener('touchcancel', cancel); //dom ready

(function () {
  // var sceneEl = document.querySelector('a-scene');
  // sceneEl.addEventListener('trackpaddown', click);
  // sceneEl.addEventListener('trackpadup', cancel);
  var yRot = 0;
  var rig = document.querySelector('[binary-controls]');

  window.fwdDashButtonAction = function () {
    console.log("forward dash");
    var fwd = new Event('dashfwd');
    window.dispatchEvent(fwd);
  };

  window.backDashButtonAction = function () {
    console.log("back dash");
    var bwd = new Event('dashbwd');
    window.dispatchEvent(bwd);
  };

  window.leftTurnButtonAction = function () {
    console.log("left turn");
    yRot += 22.5;
    rig.setAttribute('rotation', '0 ' + yRot + ' 0');
  };

  window.rightTurnButtonAction = function () {
    console.log("right turn");
    yRot -= 22.5;
    rig.setAttribute('rotation', '0 ' + yRot + ' 0');
  };

  function switchNavBtn() {
    var buttons = document.querySelectorAll('[locobtn]');
    var iterator = 0;

    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].getAttribute('infocus') == 'true' || buttons[i].getAttribute('infocus')) {
        console.log(i);
        iterator = i + 1;
      }
    }

    for (var _i = 0; _i < buttons.length; _i++) {
      buttons[_i].setAttribute('infocus', false);
    }

    if (iterator >= buttons.length) {
      iterator = 0;
    }

    buttons[iterator].setAttribute('infocus', true);
  }

  function triggerNavBtn() {
    var buttons = document.querySelectorAll('[locobtn]');
    var event = new Event('click');

    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].getAttribute('infocus') == 'true' || buttons[i].getAttribute('infocus')) {
        buttons[i].dispatchEvent(event);
      }
    }
  }

  var directions = ['freeze', 'twist', 'swing'];
  var myIndex = 1;
  var cursorDirection = directions[0];
  var twistZRot = 0;

  function switchCursorDirection() {
    twistZRot = document.getElementById('twist').getAttribute('rotation').z;
    console.log('twistZRot' + twistZRot);
    cursorDirection = directions[myIndex];

    switch (cursorDirection) {
      case 'twist':
        document.getElementById('twist').object3D.el.setAttribute('animation__rotation', 'property: rotation; dur: 10000; easing: linear; loop: true; from: 0 0 ' + twistZRot + '; to: 0 0 ' + (twistZRot + 360));
        break;

      case 'swing':
        document.getElementById('twist').object3D.el.removeAttribute('animation__rotation');
        document.getElementById('swing').object3D.el.setAttribute('animation__yoyo', 'property: rotation; dur: 5000; dir: alternate; easing: linear; loop: true; from: 0 30 0; to: 0 -30 0;');
        break;

      case 'freeze':
        document.getElementById('swing').object3D.el.removeAttribute('animation__yoyo');
        break;
    }

    myIndex = (myIndex + 1) % directions.length;
  }

  ;

  function triggerCursor() {
    var event = new Event('click');
    window.dispatchEvent(event);
  }

  var menu = document.querySelector('[binary-controls]');

  function toggleMenu() {
    if (menu.getAttribute('binary-controls').locofirst) {
      menu.setAttribute('binary-controls', 'locofirst', 'false');
    } else {
      menu.setAttribute('binary-controls', 'locofirst', 'true');
    }
  }

  function triggerA() {
    console.log('triggerB');

    if (menu.getAttribute('binary-controls').locofirst) {
      triggerNavBtn();
    } else {
      triggerCursor();
    }
  }

  function triggerB() {
    console.log('triggerB');

    if (menu.getAttribute('binary-controls').locofirst) {
      switchNavBtn();
    } else {
      switchCursorDirection();
    }
  }

  function triggerC() {
    toggleMenu();
  } //imitating triggers


  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 76:
        //triggerB (l)
        triggerB();
        break;

      case 80:
        //triggerA (p)
        console.log('triggerA');
        triggerA();
        break;

      case 79:
        //triggerC (o)
        console.log('triggerC');
        triggerC();
        break;
    }
  };
})();

},{}]},{},[2,1])

//# sourceMappingURL=bundle.js.map
