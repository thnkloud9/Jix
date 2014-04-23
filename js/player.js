function Player(y,x, maxY, maxX) {
  this.x = x;
  this.y = y;
  this.maxY = maxY;
  this.maxX = maxX;
  this.directions = [ 'n', 'e', 's', 'w' ];
  this.speed = 1;
  this.drawing = false;
  this.connected = true;
  this.okToDraw = false;
  this.direction = null;
  this.lastDirection = null;
  this.clockwise = null;
  this.setInitialDirection();
  this.score = 0;
}

Player.prototype.move = function (direction) {

  this.okToDraw = true;

  if (direction == 'up') {
    if (this.direction == 's') {
      this.clockwise = !this.clockwise;
    }
    this.direction = 'n';
  }
  if (direction == 'down') {
    if (this.direction == 'n') {
      this.clockwise = !this.clockwise;
    }
    this.direction = 's';
  }
  if (direction == 'left') {
    if (this.direction == 'e') {
      this.clockwise = !this.clockwise;
    }
    this.direction = 'w';
  }
  if (direction == 'right') {
    if (this.direction == 'w') {
      this.clockwise = !this.clockwise;
    }
    this.direction = 'e';
  }
}

Player.prototype.setInitialDirection = function () {
  if ((this.x == 0) || (this.x == this.maxX)) {
    var directionOptions = [ 'n', 's' ];
    this.direction = directionOptions[Math.round(Math.random())];

    if (this.x == 0) {
      this.clockwise = (this.direction == 's') ? false : true;
    }

    if (this.x == this.maxX) {
      this.clockwise = (this.direction == 'n') ? false : true;
    }
  }

  if ((this.y == 0) || (this.y == this.maxY)) {
    var directionOptions = [ 'e', 'w' ];
    this.direction = directionOptions[Math.round(Math.random())];

    if (this.y == 0) {
      this.clockwise = (this.direction == 'e') ? true : false;
    }

    if (this.y == this.maxY) {
      this.clockwise = (this.direction == 'w') ? true : false;
    }
  }

}

Player.prototype.update = function(map) {
  var nextPos = this.getNextPos();
  var onTrack = this.onTrack(nextPos, map);
  var alreadyDrawing = this.drawing;

  if (alreadyDrawing && this.connected) {
    this.drawing = false;
    this.okTotDraw = false;
  }

  if (!onTrack) {
    if (this.okToDraw && this.isDrawing(nextPos, map)) {
      this.drawing = true;
      this.connected = false;
    } else {
      while (!onTrack) {
        this.turn();
        nextPos = this.getNextPos();
        onTrack = this.onTrack(nextPos, map);
      }
      this.lastDirection = this.direction;
      this.drawing = false;
      this.connected = true;
      this.okToDraw = false;
    }
  }

  // we are back on track from drawing
  if (this.drawing && onTrack) {
    this.connected = true;
    this.okToDraw = false;
  }

  this.y = nextPos[0];
  this.x = nextPos[1];
  
  return nextPos;
}

Player.prototype.isDrawing = function(nextPos, map) {
  if ((nextPos[0] > this.maxY) || (nextPos[1] > this.maxX)) {
    return false;
  }

  if ((nextPos[0] < 0) || (nextPos[1] < 0)) {
    return false;
  }

  if (map[nextPos[0]]) {
    if (map[nextPos[0]][nextPos[1]] == 1) {
      return false;
    }
    if (map[nextPos[0]][nextPos[1]] == 0) {
      return true;
    }
  }
  return false;
}

Player.prototype.turn = function () {
  var currentDirection = this.directions.indexOf(this.direction);
  if (this.clockwise) {
    var nextDirection = currentDirection + 1;
    if (nextDirection >  (this.directions.length - 1)) {
      nextDirection = 0;
    }
  } else {  
    var nextDirection = currentDirection - 1;
    if (nextDirection < 0) {
      nextDirection = (this.directions.length - 1);
    }
  }

  // check if we are bouncing back
  if (this.bouncingBack(this.lastDirection, this.directions[nextDirection])) {
    this.clockwise = !this.clockwise;
    this.turn();
  } else {
    this.direction = this.directions[nextDirection];
  }

}

Player.prototype.bouncingBack = function (direction, nextDirection) {
  if (direction == 'n' && nextDirection == 's') {
    return true;
  }
  if (direction == 's' && nextDirection == 'n') {
    return true;
  }
  if (direction == 'e' && nextDirection == 'w') {
    return true;
  }
  if (direction == 'w' && nextDirection == 'e') {
    return true;
  }
  return false;
}

Player.prototype.onTrack = function (nextPos, map) {
  if ((nextPos[0] > this.maxY) || (nextPos[1] > this.maxX)) {
    return false;
  }

  if ((nextPos[0] < 0) || (nextPos[1] < 0)) {
    return false;
  }

  if (map[nextPos[0]][nextPos[1]] != 1) { 
    return false;
  }

  return true;
}

Player.prototype.getNextPos = function () {
  var nextX = null;
  var nextY = null;
  var nextMove = this.speed;

  if (this.direction == 'n') {
    nextY = this.y - nextMove;
    nextX = this.x;
  }
  if (this.direction == 'e') {
    nextY = this.y;
    nextX = this.x + nextMove;
  }
  if (this.direction == 's') {
    nextY = this.y + nextMove;
    nextX = this.x;
  }
  if (this.direction == 'w') {
    nextY = this.y;
    nextX = this.x - nextMove;
  }

  return [nextY, nextX];
}
