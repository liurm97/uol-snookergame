/**
Cuestick Class

Methods:
1) Draw cuestick
2) Rotate cuestick to the right or left
3) Shrink the cuestick in length to simulate applying force
4) Take aim and fire off cuestick to hit a specific point/cueball
5) Resets cuestick to its original position
6) Resets cuestick to its original length
 */

class CueStick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.l = 100;
    this.w = 10;
    this.angle = 0;
    this.shrink = 0;

    const options = {
      isStatic: false,
      restitution: 0.5,
      friction: 0.01,
    };

    this.body1 = Bodies.circle(
      this.x + this.w / 2,
      this.y,
      this.w / 2,
      options
    );
    // this.body2 = Bodies.circle(this.x, this.y, this.w, this.w);
    World.add(engine.world, [this.body1]);
  }

  //1) Draw cuestick
  draw() {
    //upper cue body
    push();
    fill(255, 229, 204);
    translate(this.body1.position.x, this.body1.position.y);
    rotate(this.angle);
    rect(
      0,
      min(this.shrink, this.l / 2),
      this.w,
      this.l - min(this.shrink, this.l / 2),
      10
    );

    // bottom cue body
    fill(0);
    rect(0, this.l / 2, this.w, this.l / 2, 10);

    // cue head
    ellipseMode(RADIUS);
    fill(255);
    ellipse(this.w / 2, min(this.shrink, this.l / 2), this.w / 2);
    pop();
  }

  //2) Rotate cuestick to the right
  rotateRight() {
    this.angle += 0.75;
    // this.body1.angle += 0.05;
  }

  //3) Rotate cuestick to the left
  rotateLeft() {
    this.angle -= 0.75;
  }

  //3) Shrink the cuestick in length to simulate applying force

  reduce() {
    this.shrink += 0.5;
    return this.shrink;
  }

  //4) Take aim and fire off cuestick to hit a specific point/cueball
  hit(hitPositions) {
    let v1 = createVector(this.body1.position.x, this.body1.position.y);
    let v2 = createVector(hitPositions.x, hitPositions.y);
    let distanceToImpact = p5.Vector.sub(v2, v1);
    Body.setVelocity(this.body1, {
      x: distanceToImpact.x / 5,
      y: distanceToImpact.y / 5,
    });
    return v1;
  }

  // 5) Resets cuestick to its original position
  stay() {
    this.angle = 0;
    Body.setVelocity(this.body1, {
      x: 0,
      y: 0,
    });
    Body.setPosition(this.body1, {
      x: xTableShiftOffset + 10,
      y: height / 2,
    });
  }

  // 6) Resets cuestick to its original length
  reset() {
    this.shrink = 0;
  }
}
