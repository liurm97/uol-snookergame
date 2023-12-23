/**
Pocket Class 


Methods:
1) Draw pocket
 */
class Pocket {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
  }

  //draw pocket
  draw() {
    push();
    ellipseMode(CENTER);
    translate(this.x, this.y);
    fill(10);
    ellipse(0, 0, this.r, this.r);
    pop();
  }
}
