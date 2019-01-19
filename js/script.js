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

  

// GUI play/pause button component
AFRAME.registerComponent('btn', {
    multiple: true,
    schema: {
        on: {default: 'click'},
        clickAction: {type: 'string'},
        borderColor: {type: 'string', default: '#fc00e9'},
        borderInner: {type: 'number', default:0.16},
        borderOuter: {type: 'number', default:0.17}
    },
    init: function() {
        var data = this.data;
        var el = this.el;

        var rEntity = document.createElement("a-entity");
        rEntity.setAttribute('geometry', `primitive:ring; radiusInner:${data.borderInner}; radiusOuter:${data.borderOuter}`);
        rEntity.setAttribute('material', `shader: flat; opacity:1; color:${data.borderColor};`);
        rEntity.setAttribute('position', '0 0 0');
        el.appendChild(rEntity);

        var bEntity = document.createElement("a-entity");
        bEntity.setAttribute('geometry', `primitive: circle; radius:${data.borderInner - 0.01};`);
        bEntity.setAttribute('material', `shader: flat; color:#000;opacity:0.5;`);
        bEntity.setAttribute('position', '0 0 0');
        el.appendChild(bEntity);

        var icon = document.createElement("a-entity");
        icon.setAttribute('geometry', `primitive:triangle;vertexA:0 0.07 0;vertexB:0 -0.07 0;vertexC:0.12 0 0`);
        icon.setAttribute('material', `shader: flat; transparent: true; opacity: 1; color:#fff;`);
        icon.setAttribute('position', '-0.035 0 0.001');
        icon.setAttribute('visible', 'true');
        bEntity.appendChild(icon);
        this.icon = icon;

        var hoverEntity = document.createElement("a-entity");
        hoverEntity.setAttribute('geometry', `primitive: plane; height: ${data.borderOuter * 2 + 0.02}; width: ${data.borderOuter * 2 + 0.02};`);
        hoverEntity.setAttribute('material', `shader: flat; transparent: true; opacity: 0; color:#fff;`);
        hoverEntity.setAttribute('position', '0 0 0.01');
        el.appendChild(hoverEntity);

        el.addEventListener('mouseenter', function() {
            console.log("hovering");
        });
        el.addEventListener('mouseleave', function() {

        });
        el.addEventListener(data.on, function() {
            var clickActionFunctionName = data.clickAction;
            console.log("in button, clickActionFunctionName: "+clickActionFunctionName);
            var clickActionFunction = window[clickActionFunctionName];
            if (typeof clickActionFunction === "function") clickActionFunction();
        });
    }
});

// Component to change to a sequential color on click.
AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var lastIndex = -1;
    var COLORS = ['red', 'green', 'blue'];
    this.el.addEventListener('click', function (evt) {
      lastIndex = (lastIndex + 1) % COLORS.length;
      this.setAttribute('material', 'color', COLORS[lastIndex]);
      console.log('I was clicked at: ', evt.detail.intersection.point);
    });
  }
});
