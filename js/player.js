function Player(y,x) {
  this.x = x;
  this.y = y;
  this.directions = [ 'n', 'e', 's', 'w' ];
  this.rand = (Math.round(Math.random()*3) + 1) - 1;
  this.direction = this.directions[this.rand];
  this.speed = 1;
}

Player.prototype.update = function(map) {
  console.log(this);
}
