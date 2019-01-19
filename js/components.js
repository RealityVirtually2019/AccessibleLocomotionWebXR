/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

// Loco button component
AFRAME.registerComponent('locobtn', {
    multiple: true,
    schema: {
        on: {default: 'click'},
        clickAction: {type: 'string'},
        borderColor: {type: 'string', default: '#f00'},
        borderInner: {type: 'number', default:0.16},
        borderOuter: {type: 'number', default:0.17}
    },
    init: function() {
        var data = this.data;
        var el = this.el;

        // var rEntity = document.createElement("a-entity");
        // rEntity.setAttribute('geometry', `primitive:ring; radiusInner:${data.borderInner}; radiusOuter:${data.borderOuter}`);
        // rEntity.setAttribute('material', `shader: flat; opacity:1; color:${data.borderColor};`);
        // rEntity.setAttribute('position', '0 0 0');
        // el.appendChild(rEntity);

        var bEntity = document.createElement("a-entity");
        bEntity.setAttribute('geometry', `primitive: circle; radius:${data.borderInner - 0.01};`);
        bEntity.setAttribute('material', `shader: flat; color:#000;opacity:0.5;`);
        bEntity.setAttribute('position', '0 0 0');
        el.appendChild(bEntity);

        var icon = document.createElement("a-entity");
        icon.setAttribute('geometry', `primitive:triangle;vertexA:0.07 0 0;vertexB:0 0.12 0;vertexC:-0.07 0 0`);
        icon.setAttribute('material', `shader: flat; transparent: true; opacity: 1; color:#fff;`);
        icon.setAttribute('position', ' 0 -0.035 0.001');
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
AFRAME.registerComponent('switch-furniture', {
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



// Component to change to a sequential color on click.
AFRAME.registerComponent('focussed', {
    schema:{
        type:'boolean'
    }
    init: function () {
        var data = this.data;
        var el = this.el;
        var rEntity = document.createElement("a-entity");
        rEntity.setAttribute('geometry', `primitive:ring; radiusInner:0.16; radiusOuter:0.17`);
        rEntity.setAttribute('position', '0 0 0');
        el.appendChild(rEntity);
        this.rEntity = rEntity;

        if(data){
            rEntity.setAttribute('material', `shader: flat; opacity:1; color:#f00;`);
        }else{
            rEntity.setAttribute('material', `shader: flat; opacity:0; color:#f00;`);
        }

        el.addEventListener('stateadded', function (evt) {
          if (evt.detail.state === 'selected') {
            rEntity.setAttribute('material', `shader: flat; opacity:1; color:#f00;`);
          }
        });
                
        el.addEventListener('stateremoved', function (evt) {
          if (evt.detail.state === 'selected') {
            rEntity.setAttribute('material', `shader: flat; opacity:0; color:#f00;`);
          }
        });

    },
    update: function () {
        if(this.data){
            this.el.addState('selected');
//            this.rEntity.setAttribute('material.opacity','1');

        }else{
            this.el.removeState('selected');
//            this.rEntity.setAttribute('material.opacity','0');

        }
    }
});



// entity.addState('selected');
// entity.is('selected');  // >> true

// entity.removeState('selected');
// entity.is('selected');  // >> false


