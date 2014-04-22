window.onload = function() {

  // Game update function
  function update(dt) {
    //console.log('update', dt);
    Map.update();
  }

  // Game render function
  function render() {
    for(var y = 0; y < Map.map.length; y++) {
        for(var x = 0; x < Map.map[y].length; x++) {

          ctx.fillStyle = Map.colourLookup(x,y);
          ctx.fillRect(scale * x,scale * y,scale,scale);
        }
    }  
  }

  // Start the game
  function start() {
    Game.run({
      canvas: canvas, render: render, update: update, step: step,
      keys: [
        { keys: [KEY.LEFT,  KEY.A], mode: 'down', action: function() { swipeRight = false; swipeLeft   = true;  } },
        { keys: [KEY.RIGHT, KEY.D], mode: 'down', action: function() { swipeLeft = false; swipeRight  = true;  } },
        { keys: [KEY.UP,    KEY.W], mode: 'down', action: function() { swipeDown = false; swipeUp = true; } },
        { keys: [KEY.DOWN,  KEY.S], mode: 'down', action: function() { swipeUp = false; swipeDown = true; } }
      ],
      swipes: [
        { direction: 'up', action: function() { swipeUp = true; swipeDown = false; } },
        { direction: 'down', action: function() { swipeDown = true; swipeUp = false; } },
        { direction: 'left', action: function() { swipeLeft = true; swipeRight = false; } },
        { direction: 'right', action: function() { swipeRight = true; swipeLeft = false; } }
      ]
    });
  }

  function init() {
    Map.reset();
    Map.addEnemy();
    Map.addPlayer();
    //console.log(Map.map);
  }

  // 
  init();
  start();
}

window.unload = function(){
}
