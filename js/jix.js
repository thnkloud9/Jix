window.onload = function() {

  var player = null;
  var moving = false;
  var level = 0;
  var score = 0;

  // Game update function
  function update(dt) {
    if (moving) {
      player.move(moving);
      moving = false;
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

  // start the game loop
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
    for (var l = 0; l < level; l++) {
      Map.addEnemy();
    }
    player = Map.addPlayer();
  }

  // 
  init();
  start();
}

window.unload = function(){
}
