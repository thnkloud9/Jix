var Map = {

  cols: cols,
  rows: rows,
  map: [],
  playerChars: [ "a", "b", "c", "d" ],
  enemyChars: [ "A", "B", "C", "D" ],
  fillColor: 5,
  enemies: [],
  players: [],

  update: function () {
    // update enemies
    for (e = 0; e < this.enemies.length; e++) {
      var enemy = this.enemies[e];
      this.map[enemy.y][enemy.x] = 0;
      var nextPos = enemy.update(this.map);
      //console.log(nextPos);
      this.map[nextPos[0]][nextPos[1]] = "A";
    }

    // update players 
    this.updatePlayers();
  },

  updatePlayers: function () {
    for (p = 0; p < this.players.length; p++) {
      var player = this.players[p];
      var lastY = player.y;
      var lastX = player.x;
      var playerWasDrawing = player.drawing;
      var nextPos = player.update(this.map);

      this.cleanPlayerTracks(lastY, lastX, playerWasDrawing, player.drawing);

       
      if (playerWasDrawing) {
        if (!player.drawing) {
          console.log('player scored');
          this.updatePlayerScore(player);
        }
      }

      // reset if next position has been filled by block fill
      if (this.map[nextPos[0]][nextPos[1]] == this.fillColor) {
        player.y = lastY;
        player.x = lastX;
        nextPos = player.update(this.map); 
      }
      this.map[nextPos[0]][nextPos[1]] = "a";
    } 
  },

  updatePlayerScore: function (player) {
    var yCount = 0;
    var xCount = 0;
    var lastY = null;
    var lastX = null;
    var startY = null;
    var endY = null;
    var startX = null;
    var endX = null;
    var maxY = 0;
    var maxX = 0;
    var minY = this.cols;
    var minX = this.rows;

    for (var y = 0 ; y < this.rows ; y++) {
      for (var x = 0 ; x < this.cols ; x++) {

        // make walls permanent
        if (this.map[y][x] == "a") {
          if (!startY) {
            startY = y;
          }
          if (!startX) {
            startX = x;
          }
          if (y != lastY) {
            yCount++;
            lastY = y;
          }
          if (x != lastX) {
            xCount++;
            lastX = x;
          }
          if (y > maxY) {
            maxY = y;
          }
          if (x > maxX) {
            maxX = x;
          }
          if (y < minY) {
            minY = y;
          }
          if (x < minX) {
            minX = x;
          }
          this.map[y][x] = 1;
        }
      }
    }
    var endY = lastY;
    var endX = lastX;

    // fill inner area and calc score
    //console.log('before adjust',startY, startX, endY, endX, player.y, player.x);

    // this works for bottom blocks
    if (player.y == (this.rows - 1)) {
      startY++;
      startX++;
      endY++;
      endX--;
    }

    if (player.x == 0) {
      startY++;
      startX--;
      endY--;
      endX--;
    }

    if (player.y == 0) {
      startY--;
      startX++;
      endY--;
      endX--;
    }

    if (player.x == (this.cols - 1)) {
      startY++;
      startX++;
      endY--;
      endX++;
    }

    // find out how to determine area
    var shape = null;
    if ((player.blockStartPos[0] == player.blockEndPos[0]) || (player.blockStartPos[1] == player.blockEndPos[1])) {
      if (minY == maxY) {
        shape = "horizontal-line";
      } else if (minX == maxX) {
        shape = "vertical-line";
      } else {
        shape = "rectangle";
      }
    }

    console.log('after adjust', startY, startX, endY, endX);
    console.log(player.blockStartPos, player.blockEndPos, player.blockTurns.toString());
    for (var y = 0 ; y < this.rows ; y++) {
      for (var x = 0 ; x < this.cols ; x++) {

        // fill rectangles
        if (shape == "rectangle") {
          if (y >= startY && y <= endY) {
            if (x >= startX && x <= endX) {
              this.map[y][x] = this.fillColor;
            } 
          }
        }

        // fill verticle lines
        if (shape == "vertical-line") {
          if (maxX > (this.cols / 2)) {
            // fill to the right
            if (y >= (minY - 1) && y <= (maxY + 1)) {
              if (x >= (player.blockStartPos[1] + 1) && x <= (this.cols - 1)) {
                this.map[y][x] = this.fillColor;
              }
            }
          } else {
            // fill to the left
            if (y >= (minY - 1) && y <= (maxY + 1)) {
              if (x >= 0 && x <= (player.blockStartPos[1] - 1)) {
                this.map[y][x] = this.fillColor;
              }
            }
          }
        }

        // fill horizontal lines
        if (shape == "horizontal-line") {
          if (maxY > (this.rows / 2)) {
            // fill to the bottom
            if (y >= (minY + 1) && y <= (this.rows - 1)) {
              if (x >= (minX - 1) && x <= (maxX + 1)) {
                this.map[y][x] = this.fillColor;
              }
            }
          } else {
            // fill to the top 
            if (y >= 0 && y <= (minY - 1)) {
              if (x >= (minX - 1) && x <= (maxX + 1)) {
                this.map[y][x] = this.fillColor;
              }
            }
          }
        }

        // unknown shapes
        if (shape == null) {
          
        }
      }
    }
  },

  cleanPlayerTracks: function (lastY, lastX, playerWasDrawing, playerIsDrawing) {
      if (playerIsDrawing) {
        if (this.map[lastY][lastX] == 1) {
          this.map[lastY][lastX] = 1;
        } else {
          this.map[lastY][lastX] = "a";
        }
      } else {
        this.map[lastY][lastX] = 1;
      }
      if (!playerWasDrawing) {
        this.map[lastY][lastX] = 1;
      }
  },

  colourLookup: function (x,y) {
    if (this.enemyChars.indexOf(this.map[y][x]) >= 0) {
        var colour = 2;
    } else if (this.playerChars.indexOf(this.map[y][x]) >= 0) {
      var colour = 3;
    } else {
        var colour = parseInt(this.map[y][x],16);
    }
    return colours[colour];
  },

  addEnemy: function () {
    // generate a randon start point
    var enemyX = Math.floor(Math.random() * ((this.cols - 2) - 2 + 1)) + 2;
    var enemyY = Math.floor(Math.random() * ((this.rows - 2) - 2 + 1)) + 2;
    // add new enemy
    var enemy = new Enemy(enemyY,enemyX, (this.rows - 1), (this.cols - 1));
    this.enemies.push(enemy);
    // plot on the map
    this.map[enemy.y][enemy.x] = "A";
    //console.log(enemy.update());
  },

  addPlayer: function () {
    // generate a random start point
    var midY = Math.floor(this.rows / 2);
    var midX = Math.floor(this.cols / 2);
    var possibleStarts = [
      [ 0, midX ],
      [ (this.cols-1), midX ],
      [ midY, 0 ],
      [ midY, (this.rows-1) ]
    ];
    var rand = (Math.round(Math.random()*3) + 1) - 1;
    var playerStart = possibleStarts[rand];
    // add new player
    var player = new Player(playerStart[0], playerStart[1], (this.rows - 1), (this.cols - 1));
    this.players.push(player);
    // plot on map
    this.map[player.y][player.x] = "a";
    //console.log(player.update());
    
    return player;
  },

  reset: function () {
    this.map = [];
    for (var y = 0 ; y < this.rows ; y++) {
      this.map[y] = [];
      for (var x = 0 ; x < this.cols ; x++) {
        if ((y === 0) || (y === (this.rows-1))) {
          this.map[y][x] = 1;
        } else {
          if ((x === 0) || (x === (this.cols-1))) {
            this.map[y][x] = 1;
          } else {
            this.map[y][x] = 0;
          }
        }
      }
    }
  }

}
