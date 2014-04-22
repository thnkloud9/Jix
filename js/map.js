var Map = {

  cols: cols,
  rows: rows,
  map: [],
  playerChars: [ "a", "b", "c", "d" ],
  enemyChars: [ "A", "B", "C", "D" ],
  enemies: [],
  players: [],

  update: function () {
    for (e = 0; e < this.enemies.length; e++) {
      var enemy = this.enemies[e];
      this.map[enemy.y][enemy.x] = 0;
      var nextPos = enemy.update(this.map);
      //console.log(nextPos);
      this.map[nextPos[0]][nextPos[1]] = "A";
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
    var player = new Player(playerStart[0], playerStart[1]);
    this.players.push(player);
    // plot on map
    this.map[player.y][player.x] = "a";
    //console.log(player.update());
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
