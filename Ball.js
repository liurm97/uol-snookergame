/**
Ball Class

Methods:
1) Draw ball
2) Check cueball detection
3) Check if ball is pocketed
4) Limit ball's velocity
5) Check if ball is moving
6) Throw warning if consecutive colored balls are pocketed
7) Reset colored balls number tracker
 */

class Ball {
  constructor(x, y, red, green, blue) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.red = red;
    this.blue = blue;
    this.green = green;

    // Ball physics settings
    const options = {
      isStatic: false,
      restitution: 0.2,
      friction: 0.01,
    };

    // Ball physics object
    this.body = Bodies.circle(
      this.x + xTableShiftOffset,
      this.y + yTableShiftOffset,
      this.r,
      options
    );
    World.add(engine.world, [this.body]);
  }

  // 1) Draw ball
  draw() {
    push();
    noStroke();
    fill(this.red, this.green, this.blue);
    ellipseMode(RADIUS);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    ellipse(0, 0, this.r);
    pop();
  }

  // 2) Check cueball detection
  //cueball - red
  checkContactCue(cueball, color = "red") {
    if (color == "red") {
      if (
        dist(
          this.body.position.x,
          this.body.position.y,
          cueball.body.position.x,
          cueball.body.position.y
        ) < 10
      ) {
        console.log("Cue-Red Collision");
        return { collisionType: "redball" };
      }
      //cueball - colored ball
    } else if (color == "colored") {
      if (
        dist(
          this.body.position.x,
          this.body.position.y,
          cueball.body.position.x,
          cueball.body.position.y
        ) < 10
      ) {
        console.log("Cue-Color Collision");
        return { collisionType: "colored" };
      }
    }
  }

  // 3) Check if ball is pocketed
  pocketed(targetX, targetY) {
    // if distance between pocket and a ball's midpoint is close enough
    if (
      dist(this.body.position.x, this.body.position.y, targetX, targetY) <= 10
    ) {
      // reset colored ball if pocketed
      if (!(this.red == 255 && this.green == 0 && this.blue == 0)) {
        Body.setPosition(this.body, {
          x: this.x + xTableShiftOffset,
          y: this.y + yTableShiftOffset,
        });
        Body.setVelocity(this.body, { x: 0, y: 0 });
      }
      return true;
    }
  }

  //4) Limit ball's velocity
  velocityLimit() {
    const velocity = this.body.velocity;
    const maxVelocity = 5;
    if (velocity.x > maxVelocity) {
      Body.setVelocity(this.body, { x: maxVelocity, y: this.body.velocity.y });
    }
    if (velocity.x < -maxVelocity) {
      Body.setVelocity(this.body, { x: -maxVelocity, y: this.body.velocity.y });
    }
    if (velocity.y > maxVelocity) {
      Body.setVelocity(this.body, { x: this.body.velocity.x, y: maxVelocity });
    }
    if (velocity.x < -maxVelocity) {
      Body.setVelocity(this.body, { x: this.body.velocity.x, y: -maxVelocity });
    }
  }
  // 5) Check if ball is moving
  isMoving() {
    if (this.body.velocity.x > 0.05 || this.body.velocity.x < -0.05)
      return true;
  }

  // 6) Throw warning if consecutive colored balls are pocketed
  throwMultipleColoredBallsPocketedWarning() {
    if (numConsectiveColoredBallPocketed == 2) {
      push();
      noFill();
      textStyle("BOLD");
      textSize(20);
      strokeWeight(1.75);
      stroke(255, 0, 0);
      text(
        `Warning! 2 Colored Balls Pocketed`,
        width / 2 - 100,
        (height * 4) / 5
      );
      pop();
    }
    this.resetColoredBallsPocketed();
  }

  // 7) Reset colored balls number tracker
  resetColoredBallsPocketed() {
    if (numConsectiveColoredBallPocketed == 2)
      numConsectiveColoredBallPocketed = 0;
  }
}
