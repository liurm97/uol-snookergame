/**
Cushion Class

Methods:
1) Draw cushion
 */
class Cushion {
  constructor(x, y, l, w, o, p) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.w = w;

    //cushion orientation
    this.o = o;

    //cushion position
    this.p = p;
    const options = {
      isStatic: true,
      restitution: 0.9,
      friction: 0.005,
    };
    this.body = Bodies.rectangle(
      this.x + 35,
      this.y + 15,
      this.l,
      this.w,
      options
    );
    World.add(engine.world, [this.body]);
  }

  // 1) Draw cushion
  draw() {
    if (this.o == "vertical") {
      push();
      rectMode(CORNER);
      fill(86, 49, 26);
      if (this.p == 1) {
        translate(35, 35);
      } else if (this.p == 4) {
        translate(748.75, 35);
      }
      rect(0, 0, this.l, this.w);
      pop();
    } else if (this.o == "horizontal") {
      push();
      rectMode(CORNER);
      fill(86, 49, 26);
      if (this.p == 2) {
        translate(55, 15);
      } else if (this.p == 3) {
        translate(75 + this.l, 15);
      } else if (this.p == 5) {
        translate(55, 368.75);
      } else if (this.p == 6) {
        translate(75 + this.l, 368.75);
      }
      rect(0, 0, this.l, this.w);
      pop();
    }

    push();
    rectMode(CENTER);
    fill(26, 100, 0, 245);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    rect(0, 0, this.l, this.w);
    pop();
  }
}
