function Enemy(y, x, maxY, maxX) {
  this.x = x;
  this.y =  y;
  this.maxY = maxY;
  this.maxX = maxX;
  this.directions = [ 'n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw' ];
  this.rand = (Math.round(Math.random()*7) + 1) - 1;
  this.direction = this.directions[this.rand]; 
  this.speed = 1;
  this.frame = 0;
  this.varience = Math.round(Math.random()*88) + 44;
}

Enemy.prototype.update = function (map) {
  if (!map) {
    return false;
  }
  this.frame++;
  if (this.frame == this.varience) {
    this.sway();
    //console.log('sway', this.direction);
    this.frame = 0;
  } 
  var nextPos = this.getNextPos();

  var collision = this.detectCollision(nextPos, map);
  while (collision) {
    this.bounce();
    nextPos = this.getNextPos();
    collision = this.detectCollision(nextPos, map);
    //console.log(this.direction, nextPos, collision);
  }

  // hit a player or player wall
  if (map[nextPos[0]][nextPos[1]] == "a") {
    console.log('player hit');
  }

  this.y = nextPos[0];
  this.x = nextPos[1];

  //console.log(nextPos);
  return nextPos; 
}

Enemy.prototype.detectCollision = function (nextPos, map) {
  // out of bounds
  if ((nextPos[0] >= this.maxY) || (nextPos[1] >= this.maxX)) {
    return true;
  }
  if ((nextPos[0] <= 0) || (nextPos[1] <= 0)) {
    return true;
  }
  // hit a wall
  if (map[nextPos[0]][nextPos[1]] == 1) {
    return true;
  }
 
  return false;
}

Enemy.prototype.bounce = function () {
  var rand = (Math.round(Math.random()*6) + 1) - 1;
  //console.log(this.direction, this.directions[rand], rand, this.directions);
  this.direction = this.directions[rand];
}

Enemy.prototype.sway = function () {
  var currentDirection = this.directions.indexOf(this.direction);
  var nextDirection = currentDirection + 1;
  if (nextDirection >= this.directions.length) {
    nextDirection = 0;
  }
  this.direction = this.directions[nextDirection];
  //console.log(this.directions[currentDirection], this.directions[nextDirection], this.direction);
}

Enemy.prototype.getNextPos = function () {
  var nextX = null;
  var nextY = null;
  var nextMove = this.speed;

  if (this.direction == 'n') {
    nextY = this.y + nextMove;
    nextX = this.x;
  }
  if (this.direction == 'ne') {
    nextY = this.y + nextMove;
    nextX = this.x + nextMove;
  }
  if (this.direction == 'e') {
    nextY = this.y;
    nextX = this.x + nextMove;
  }
  if (this.direction == 'se') {
    nextY = this.y - nextMove;
    nextX = this.x + nextMove;
  }
  if (this.direction == 's') {
    nextY = this.y - nextMove;
    nextX = this.x;
  }
  if (this.direction == 'sw') {
    nextY = this.y - nextMove;
    nextX = this.x - nextMove;
  }
  if (this.direction == 'w') {
    nextY = this.y;
    nextX = this.x - nextMove;
  }
  if (this.direction == 'nw') {
    nextY = this.y + nextMove;
    nextX = this.x - nextMove;
  }

  return [nextY, nextX];
}

Enemy.prototype.increaseSpeed = function(map) {
  consol.log(this.speed);
}


