/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('binary-controls', {
    schema: {
        emitter:{type: 'string', default: 'triggerA'},
        selecter:{type: 'string', default: 'triggerB'},
        switcher:{type: 'string', default: 'triggerC'},
        locomotion: {type: 'boolean', default: true},
        interaction: {type: 'boolean', default: true},
        locofirst: {type: 'boolean', default:true}
    },
    init: function() {
        var data = this.data;
        var el = this.el;
        this.cameraEl = document.querySelector('a-entity[camera]');

        if(this.cameraEl){

            // interaction mode
            if(data.interaction){
                var interactionAxes = document.createElement("a-entity");
                interactionAxes.setAttribute('geometry', `primitive:cylinder; height:0.005; radius:1.02;openEnded:true;`);
                interactionAxes.setAttribute('material', `shader: flat; opacity:0.5; color:white; side:back`);
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
            }
            // locomotion mode
            if(data.locomotion){
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

            if(data.locofirst){
                if(data.interaction){
                    this.interactionAxes.setAttribute('visible', 'false');
                }
                if(data.locomotion){
                    this.locomotionNav.setAttribute('visible', 'true');
                }
            }else{
                if(data.interaction){
                    this.interactionAxes.setAttribute('visible', 'true');
                }
                if(data.locomotion){
                    this.locomotionNav.setAttribute('visible', 'false');
                }
            }

        }else{
            console.log("Please add a camera to your scene.");
        }

        window.addEventListener(this.data.emitter, this.emitterHandler.bind(this));
        window.addEventListener(this.data.selecter, this.selecterHandler.bind(this));
        window.addEventListener(this.data.switcher, this.switcherHandler.bind(this));            
        // document.getElementById('axes').object3D.el.setAttribute('animation__rotation', 'property: rotation; dur: 10000; easing: linear; loop: true; to: 0 0 360');
        // document.getElementById('axes').object3D.el.removeAttribute('animation__rotation');

        // animation__yoyo="property: rotation; dur: 10000; dir: alternate; easing: linear; loop: true; from: 0 0 0; to: 0 50 0;"
    }, 
    emitterHandler: function(evt) {
        //document.querySelector('a-scene').emit('click');
    }, 
    selecterHandler: function(evt) {

    }, 
    switcherHandler: function(evt) {
        // document.querySelector('[binary-controls]').setAttribute('binary-controls','locofirst','false')
    },
    update: function() {
        if(this.data.locofirst){
            if(this.data.interaction){
                this.interactionAxes.setAttribute('visible', 'false');
            }
            if(this.data.locomotion){
                this.locomotionNav.setAttribute('visible', 'true');
            }
        }else{
            if(this.data.interaction){
                this.interactionAxes.setAttribute('visible', 'true');
            }
            if(this.data.locomotion){
                this.locomotionNav.setAttribute('visible', 'false');
            }
        }        
    }
});

// Loco button component
AFRAME.registerComponent('locobtn', {
    multiple: true,
    schema: {
        on: {default: 'click'},
        clickAction: {type: 'string'},
        radius: {type: 'number', default:0.16},
    },
    init: function() {
        var data = this.data;
        var el = this.el;

        var bEntity = document.createElement("a-entity");
        bEntity.setAttribute('geometry', `primitive: circle; radius:${data.radius - 0.01};`);
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

        el.addEventListener(data.on, function() {
            var clickActionFunctionName = data.clickAction;
            console.log("in button, clickActionFunctionName: "+clickActionFunctionName);
            var clickActionFunction = window[clickActionFunctionName];
            if (typeof clickActionFunction === "function") clickActionFunction();
        });
    }
});


// Component to change to a sequential color on click.
AFRAME.registerComponent('infocus', {
    schema: { 
        type:'boolean', 
        default:false
    },
    init: function () {
        var data = this.data;
        var el = this.el;
        var rEntity = document.createElement("a-entity");
        rEntity.setAttribute('geometry', `primitive:ring; radiusInner:0.16; radiusOuter:0.17`);
        rEntity.setAttribute('material', `shader: flat; opacity:0; color:#f00;`);
        rEntity.setAttribute('position', '0 0 0');
        el.appendChild(rEntity);
        this.rEntity = rEntity;
    },
    update: function () {
        if(this.data){
            this.rEntity.setAttribute('material', `shader: flat; opacity:1; color:#f00;`);
        }else{
            this.rEntity.setAttribute('material', `shader: flat; opacity:0; color:#f00;`);
        }
    }
});

AFRAME.registerComponent('dash-controls', {
    schema: {

    },
    init: function () {
        this.dVelocity = new THREE.Vector3();
        this.direction = 0;

        window.addEventListener('dashfwd', this.onDashFwd.bind(this), false);
        window.addEventListener('dashbwd', this.onDashBwd.bind(this), false);
    },
    isVelocityActive: function () {
        return true;
    },
    getVelocityDelta: function () {
        this.dVelocity.z = this.direction;
        return this.dVelocity.clone();        
    },
    onDashFwd: function (event) {
        this.direction = -0.125;
        setTimeout(this.stopDash.bind(this), 500);
    },
    onDashBwd: function (event) {
        this.direction = 0.125;
        setTimeout(this.stopDash.bind(this), 500);
    },
    stopDash: function(){
        this.direction = 0;
    }

});

AFRAME.registerComponent('lookatlabel', {
  init: function () {
    this.vector = new THREE.Vector3();
  },

  tick: function (t) {
    var self = this;
    var target = self.el.sceneEl.camera;
    var object3D = self.el.object3D;

    // make sure camera is set
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
        type:'string', 
        default:'name'
    },
    init: function () {
    var el = this.el;
    el.setAttribute('material', `shader: flat; opacity:0; color:blue;`);
    var label = document.createElement("a-entity");
    label.setAttribute('geometry', 'primitive:plane; width:1; height:0.4;');
    label.setAttribute('text', `value:${this.data}; align:center; font:https://cdn.aframe.io/fonts/Aileron-Semibold.fnt; color:#fbfbfb;width:0.5;wrapCount:10;`);
    label.setAttribute('material', `color:#111; opacity:1;`);
    label.setAttribute('position', '0 0.8 0');
    label.setAttribute('scale', '0.0001 0.0001 0.0001');
    label.setAttribute('lookatlabel','');
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
