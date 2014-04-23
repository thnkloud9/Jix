window.onload = function() {

  var player = null;
  var moving = false;

  // Game update function
  function update(dt) {
    //console.log('update', dt);

    if (moving) {
      player.move(moving);
      moving = player.drawing;
    } 
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
        { keys: [KEY.LEFT,  KEY.A], mode: 'down', action: function() { moving = 'left';  } },
        { keys: [KEY.RIGHT, KEY.D], mode: 'down', action: function() { moving = 'right';  } },
        { keys: [KEY.UP,    KEY.W], mode: 'down', action: function() { moving = 'up'; } },
        { keys: [KEY.DOWN,  KEY.S], mode: 'down', action: function() { moving = 'down'; } }
      ],
      swipes: [
        { direction: 'up', action: function() { moving = 'up'; } },
        { direction: 'down', action: function() { moving = 'down'; } },
        { direction: 'left', action: function() { moving = 'left'; } },
        { direction: 'right', action: function() { moving = 'right'; } }
      ]
    });
  }

  function init() {
    Map.reset();
    Map.addEnemy();
    Map.addEnemy();
    Map.addEnemy();
    player = Map.addPlayer();
    //console.log(Map.map);
  }

  // 
  init();
  start();
}

window.unload = function(){
}
