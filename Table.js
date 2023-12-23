/**
Table Class

Methods:
1) Draw Table and cushions
 */

class Table {
  constructor() {
    this.offetFromTableEdge = 20;
    this.xTableShiftOffset = 35;
    this.yTableShiftOffset = 15;
    this.dCircle = {
      x: xTableShiftOffset + cushion.horizontal_l / 2 - 25,
      y: 180,
      r: 75,
    };
    this.l = 720;
    this.w = this.l / 2;
  }

  draw() {
    // snooker table
    push();
    noStroke();
    fill(40, 140, 34);
    rect(
      xTableShiftOffset,
      yTableShiftOffset,
      snookerTable.l,
      snookerTable.w,
      10
    );
    pop();

    push();
    stroke(255);
    line(
      xTableShiftOffset + cushion.horizontal_l / 2 - 25,
      yTableShiftOffset + 2 * cushion.w,
      xTableShiftOffset + cushion.horizontal_l / 2 - 25,
      snookerTable.w + yTableShiftOffset - 2 * cushion.w
    );
    noFill();
    arc(
      this.dCircle.x,
      this.dCircle.y,
      this.dCircle.r,
      this.dCircle.r,
      90,
      270
    );
    pop();
  }
}
