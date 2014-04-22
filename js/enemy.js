function Enemy(y, x, maxY, maxX) {
  this.x = x;
  this.y =  y;
  this.maxY = maxY;
  this.maxX = maxX;
  this.directions = [ 'n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw' ];
  this.rand = (Math.round(Math.random()*7) + 1) - 1;
  this.direction = this.directions[this.rand]; 
  this.speed = 1;
}

Enemy.prototype.update = function (map) {
  if (!map) {
    return false;
  }

  var nextPos = this.getNextPos();

  var collision = this.detectCollision(nextPos, map);
  while (collision) {
    this.bounce();
    nextPos = this.getNextPos();
    collision = this.detectCollision(nextPos, map);
    console.log(this.direction, nextPos, collision);
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
  // hit a wall
  if (map[nextPos[0]][nextPos[1]] == 1) {
    return true;
  }
 
  return false;
}

Enemy.prototype.bounce = function () {
  var rand = (Math.round(Math.random()*6) + 1) - 1;

  console.log(this.direction, this.directions[rand], rand, this.directions);
  this.direction = this.directions[rand];
}

Enemy.prototype.getNextPos = function () {
  var nextX = null;
  var nextY = null;

  if (this.direction == 'n') {
    nextY = this.y + 1;
    nextX = this.x;
  }
  if (this.direction == 'ne') {
    nextY = this.y + 1;
    nextX = this.x + 1;
  }
  if (this.direction == 'e') {
    nextY = this.y;
    nextX = this.x + 1;
  }
  if (this.direction == 'se') {
    nextY = this.y - 1;
    nextX = this.x + 1;
  }
  if (this.direction == 's') {
    nextY = this.y - 1;
    nextX = this.x;
  }
  if (this.direction == 'sw') {
    nextY = this.y - 1;
    nextX = this.x - 1;
  }
  if (this.direction == 'w') {
    nextY = this.y;
    nextX = this.x - 1;
  }
  if (this.direction == 'nw') {
    nextY = this.y + 1;
    nextX = this.x - 1;
  }

  return [nextY, nextX];
}

Enemy.prototype.increaseSpeed = function(map) {
  console.log(this.speed);
}


