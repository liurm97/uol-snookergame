/**
Cueball Class

Methods:
1) Draw cueball
2) Detect cueball cushion detection
3) Display collision detection message
4) Reset cueball position
5) Set cueball position
6) Check if cueball initial position if outside of "D" zone
7) Display cueball out of bounds warning message
 */

class CueBall extends Ball {
  constructor(x, y, red, green, blue) {
    super();
    this.x = x;
    this.y = y;
    this.r = 5;
    this.red = red;
    this.blue = blue;
    this.green = green;
    this.object = null;

    const options = {
      isStatic: false,
      restitution: 0.2,
      friction: 0.01,
    };

    this.body = Bodies.circle(mouseX, mouseY, this.r, options);
    World.add(engine.world, [this.body]);
  }

  // 1) Draw cueball
  draw() {
    push();
    fill(255);
    noStroke();
    ellipseMode(RADIUS);
    translate(this.body.position.x, this.body.position.y);
    // translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    this.object = ellipse(0, 0, this.r);
    pop();
  }

  // 2) Detect cueball cushion detection
  cueCushionCollision(cushions) {
    for (c of cushions) {
      //horizontal cushion collision
      if (c.p == 2) {
        const xStart = offetFromTableEdge + xTableShiftOffset;
        const xEnd = offetFromTableEdge + c.l + xTableShiftOffset;
        const yStart = c.w + yTableShiftOffset;
        const yEnd = 2 * c.w + yTableShiftOffset;
        if (
          this.body.position.x - 5 >= xStart &&
          this.body.position.x - 5 <= xEnd &&
          this.body.position.y - 5 >= yStart &&
          this.body.position.y - 5 <= yEnd
        ) {
          return { collisionType: "cushion", cushionNumber: c.p };
        }
      } else if (c.p == 3) {
        const xStart = offetFromTableEdge + ball.d + c.l + xTableShiftOffset;
        const xEnd = offetFromTableEdge + ball.d + 2 * c.l + xTableShiftOffset;
        const yStart = c.w + yTableShiftOffset;
        const yEnd = 2 * c.w + yTableShiftOffset;
        if (
          this.body.position.x - 5 >= xStart &&
          this.body.position.x - 5 <= xEnd &&
          this.body.position.y - 5 >= yStart &&
          this.body.position.y - 5 <= yEnd
        ) {
          return { collisionType: "cushion", cushionNumber: c.p };
        }
      } else if (c.p == 5) {
        const xStart = offetFromTableEdge + ball.d + c.l + xTableShiftOffset;
        const xEnd = offetFromTableEdge + ball.d + 2 * c.l + xTableShiftOffset;
        const yStart = 360 - 2 * c.w + yTableShiftOffset;
        const yEnd = 360 - c.w + yTableShiftOffset;
        if (
          this.body.position.x - 5 >= xStart &&
          this.body.position.x - 5 <= xEnd &&
          this.body.position.y + 5 >= yStart &&
          this.body.position.y + 5 <= yEnd
        ) {
          return { collisionType: "cushion", cushionNumber: c.p };
        }
      } else if (c.p == 6) {
        const xStart = offetFromTableEdge + xTableShiftOffset;
        const xEnd = offetFromTableEdge + c.l + xTableShiftOffset;
        const yStart = 360 - 2 * c.w + yTableShiftOffset;
        const yEnd = 360 - c.w + yTableShiftOffset;
        if (
          this.body.position.x - 5 >= xStart &&
          this.body.position.x - 5 <= xEnd &&
          this.body.position.y + 5 >= yStart &&
          this.body.position.y + 5 <= yEnd
        ) {
          return { collisionType: "cushion", cushionNumber: c.p };
        }
      }
      //vertical cushion collisions
      else if (c.p == 1) {
        const xStart = c.l + xTableShiftOffset;
        const xEnd = 2 * c.l + xTableShiftOffset;
        const yStart = offetFromTableEdge + yTableShiftOffset;
        const yEnd = 360 - offetFromTableEdge + yTableShiftOffset;
        if (
          this.body.position.x - 5 >= xStart &&
          this.body.position.x - 5 <= xEnd &&
          this.body.position.y - 5 >= yStart &&
          this.body.position.y - 5 <= yEnd
        ) {
          return { collisionType: "cushion", cushionNumber: c.p };
        }
      } else if (c.p == 4) {
        const xStart = snookerTable.l - 2 * c.l + xTableShiftOffset;
        const xEnd = snookerTable.l - c.l + xTableShiftOffset;
        const yStart = offetFromTableEdge + yTableShiftOffset;
        const yEnd = 360 - offetFromTableEdge + yTableShiftOffset;
        if (
          this.body.position.x + 5 >= xStart &&
          this.body.position.x + 5 <= xEnd &&
          this.body.position.y + 5 >= yStart &&
          this.body.position.y + 5 <= yEnd
        ) {
          return { collisionType: "cushion", cushionNumber: c.p };
        }
      }
    }
  }

  // 3) Display collision detection message
  throwCollisionImpact(type, cushionNumber = -1) {
    // cueball-cushion collision
    if (type == "cushion") {
      if (cushionNumber > 0) {
        push();
        noFill();
        textStyle("BOLD");
        textSize(20);
        strokeWeight(1.75);
        stroke(0, 255, 0);
        text(
          `Cue-Cushion ${cushionNumber} Collision`,
          width / 2 - 100,
          (height * 4) / 5
        );
        pop();
      }

      // cueball-redball collision
    } else if (type == "redball") {
      push();
      textStyle("BOLD");
      textSize(20);
      strokeWeight(2);
      fill(255, 0, 0);
      text(`Cue-Red Collision`, width / 2 - 100, (height * 4) / 5);
      pop();

      // cueball-coloredball collision
    } else if (type == "colored") {
      push();
      textStyle("BOLD");
      textSize(20);
      strokeWeight(2);
      fill(255);
      text(`Cue-Colored Collision`, width / 2 - 100, (height * 4) / 5);
      pop();
    }
  }

  // 4) Reset cueball position
  reset(targetMode = 4) {
    Body.setPosition(this.body, { x: -10, y: -10 });
    Body.setVelocity(this.body, { x: 0, y: 0 });
    cuestick.stay();
    mode = targetMode;
  }

  // 5) Set cueball position
  update() {
    Body.setPosition(this.body, { x: mouseX, y: mouseY });
    Body.setVelocity(this.body, { x: 0, y: 0 });
  }

  placeAtCenter() {
    Body.setPosition(this.body, {
      x: pockets[4].x,
      y: yTableShiftOffset + table.w / 2,
    });
    Body.setVelocity(this.body, { x: 0, y: 0 });
  }

  // 6) Check if cueball initial position if outside of "D" zone
  cueballIsOutOfBounds() {
    if (
      mouseX > table.dCircle.x ||
      dist(mouseX, mouseY, table.dCircle.x, table.dCircle.y) >=
        table.dCircle.r / 2
    ) {
      return true;
    } else return false;
  }

  // 7) Display cueball out of bounds warning message
  setOutOfBoundsMessage() {
    push();
    fill(255, 0, 0);
    textSize(15);
    strokeWeight(1);
    textAlign(CENTER);
    text("*WARNING* Cueball must be placed within the 'D' zone.", 388, 450);
    pop();
  }
}
