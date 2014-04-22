var Game = { 
        
  run: function(options) {                                                                
    
    Game.setKeyListener(options.keys);                                                  
    Game.setSwipeListener(options.swipes);
      
    var canvas = options.canvas,    // canvas render target is provided by caller       
        update = options.update,    // method to update game logic is provided by caller
        render = options.render,    // method to render the game is provided by caller  
        step   = options.step,      // fixed frame step (1/fps) is specified by caller
        now    = null,
        last   = new Date().getTime();
        dt     = 0,                                                                     
        gdt    = 0;

    function frame() {                                                                  
      now = new Date().getTime();
      dt  = Math.min(1, (now - last) / 1000);
      gdt = gdt + dt;
      while (gdt > step) {                                                              
        gdt = gdt - step;
        update(step);                                                                   
      }                                                                                 
      render();
      last = now;
      requestAnimationFrame(frame, canvas);                                             
    }
 
    frame(); 
  },

  setSwipeListener: function(swipes) {
    var touch = {};
    var mouse = {};

    if (checkForTouch()) {
      if (document.body.addEventListener)
      {
        document.body.addEventListener('touchmove', touchMove, false);
        document.body.addEventListener('touchstart', touchStart, false);
        document.body.addEventListener('touchend', touchEnd, false);
        // MS is such a pain
        document.body.addEventListener('MSPointerMove', touchMove, false);
        document.body.addEventListener('MSPonterDown', touchStart, false);
        document.body.addEventListener('MSPointerUp', touchEnd, false);
      } else {
        window.addEventListener('touchmove', touchMove, false);
        window.addEventListener('touchstart', touchStart, false);
        window.addEventListener('touchend', touchEnd, false);
        // MS is such a pain
        window.body.addEventListener('MSPointerMove', touchMove, false);
        window.body.addEventListener('MSPonterDown', touchStart, false);
        window.body.addEventListener('MSPointerUp', touchEnd, false);
      }
    } else {
      window.addEventListener('mousedown', mouseDown, false);
      window.addEventListener('mouseup', mouseUp, false);
      // console.log("No touch capability.");
    }

    function checkForTouch() {
      var d = document.createElement("div");
      d.setAttribute("ontouchmove", "return;");
      return typeof d.ontouchmove == "function" ? true : false;
    }

    function checkForTouch() {
      var d = document.createElement("div");
      d.setAttribute("ontouchmove", "return;");
      return typeof d.ontouchmove == "function" ? true : false;
    }

    function handleTouch(event){
      var touches;
      if (event.touches && event.touches.length > 0) {
        touches = event.touches[0]
      } else  {
        if (event.targetTouches) {
          touches = event.targetTouches[0];
        } else {
          touches = event;
        }
      }
      return touches;
    }

    function touchStart(event) {
      var touches = handleTouch(event);
      touch.startx = touches.pageX;
      touch.starty = touches.pageY;
    }

    function touchMove(event) {
      event.preventDefault();
      var touches = handleTouch(event);
      touch.endx = touches.pageX;
      touch.endy = touches.pageY;
    }

    function touchEnd(event) {
      event.preventDefault();

      // detect swipe direction
      diffx = touch.startx - touch.endx;
      diffy = touch.starty - touch.endy;
      getDirection(diffx, diffy);
    }

    function mouseDown(event) {
      mouse.startx = event.offsetX;
      mouse.starty = event.offsetY;
    }

    function mouseUp(event) {
      mouse.endx = event.offsetX;
      mouse.endy = event.offsetY;

      // detect swipe direction
      diffx = mouse.startx - mouse.endx;
      diffy = mouse.starty - mouse.endy;
      getDirection(diffx, diffy);
    }

    function getDirection(diffx, diffy) {
      if (Math.abs(diffx) > Math.abs(diffy) && diffx > 0) {
        mapAction('left');
      } else if (Math.abs(diffx) > Math.abs(diffy) && diffx < 0) {
        mapAction('right');
      } else if (Math.abs(diffy) > Math.abs(diffx) && diffy > 0) {
        mapAction('up');
      } else if (Math.abs(diffy) > Math.abs(diffx) && diffy < 0) {
        mapAction('down');
      }

    }

    function mapAction(direction) {
      for(n = 0 ; n < swipes.length ; n++) {
        s = swipes[n];
        if (s.direction == direction) {
          s.action.call();
        }
      }
    }
  },

  setKeyListener: function(keys) {
    var onkey = function(keyCode, mode) {
      var n, k;
      for(n = 0 ; n < keys.length ; n++) {
        k = keys[n];
        k.mode = k.mode || 'up';
        if ((k.key == keyCode) || (k.keys && (k.keys.indexOf(keyCode) >= 0))) {
          if (k.mode == mode) {
            k.action.call();
          }
        }
      }
    };
    Dom.on(document, 'keydown', function(ev) { onkey(ev.keyCode, 'down'); } );
    Dom.on(document, 'keyup',   function(ev) { onkey(ev.keyCode, 'up');   } );
  }

}
