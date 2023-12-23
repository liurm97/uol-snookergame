/**
Gameplay Class

Methods:
1) Set red balls according to game mode
2) Set colored balls according to game mode
3) Game logic
4) Display cuestick instruction
5) Reset game mode
6) Check Bonus game round win condition

 */
class GamePlay {
  constructor() {
    this.startFrame = undefined;

    // Timer to complete the bonus round
    this.bonusRoundTimer = 5000;
    this.bonusRoundVictory = false;
  }

  // 1) Set red balls according to game mode
  setRedBalls(mode) {
    console.log("setting red balls");

    if (mode == 1) {
      // Add red balls
      for (let i = 0; i < 5; ++i) {
        redBalls.push(
          new Ball(
            (4 / 5) * snookerTable.l,
            snookerTable.w / 2 - 10 * i,
            255,
            0,
            0
          )
        );
      }
      for (let i = 0; i < 4; ++i) {
        redBalls.push(
          new Ball(
            (4 / 5) * snookerTable.l - 10,
            snookerTable.w / 2 - 10 * (i + 0.25),
            255,
            0,
            0
          )
        );
      }
      for (let i = 0; i < 3; ++i) {
        redBalls.push(
          new Ball(
            (4 / 5) * snookerTable.l - 20,
            snookerTable.w / 2 - 10 * (i + 0.75),
            255,
            0,
            0
          )
        );
      }

      for (let i = 0; i < 2; ++i) {
        redBalls.push(
          new Ball(
            (4 / 5) * snookerTable.l - 30,
            snookerTable.w / 2 - 10 * (i + 1),
            255,
            0,
            0
          )
        );
      }
      redBalls.push(
        new Ball(
          (4 / 5) * snookerTable.l - 40,
          snookerTable.w / 2 - 15,
          255,
          0,
          0
        )
      );
    }

    if (mode == 2 || mode == 3) {
      for (let i = 0; i < 15; ++i) {
        redBalls.push(
          new Ball(
            table.dCircle.x +
              random(10, snookerTable.l - table.dCircle.x - 3 * cushion.w),
            random(32 + pocket.r, 320),
            255,
            0,
            0
          )
        );
      }
    }

    if (mode == 5) {
      const pocketsPositions = [];
      pockets.map((p) => pocketsPositions.push({ x: p.x, y: p.y }));
      redBalls.push(
        new Ball(
          pocketsPositions[0].x,
          pocketsPositions[0].y + 25,
          255,
          0,
          0,
          0
        )
      );
      redBalls.push(
        new Ball(
          pocketsPositions[1].x - xTableShiftOffset,
          pocketsPositions[1].y + 25,
          255,
          0,
          0,
          0
        )
      );
      redBalls.push(
        new Ball(
          pocketsPositions[2].x - 2 * xTableShiftOffset,
          pocketsPositions[2].y + 25,
          255,
          0,
          0,
          0
        )
      );
      redBalls.push(
        new Ball(
          pocketsPositions[3].x,
          pocketsPositions[3].y - 2 * yTableShiftOffset - 25,
          255,
          0,
          0,
          0
        )
      );
      redBalls.push(
        new Ball(
          pocketsPositions[4].x - xTableShiftOffset,
          pocketsPositions[4].y - 2 * yTableShiftOffset - 25,
          255,
          0,
          0,
          0
        )
      );
      redBalls.push(
        new Ball(
          pocketsPositions[5].x - 2 * xTableShiftOffset,
          pocketsPositions[5].y - 2 * yTableShiftOffset - 25,
          255,
          0,
          0,
          0
        )
      );
      cueball1.placeAtCenter();
    }
  }

  // 2) Set colored balls according to game mode
  setColoredBalls(mode) {
    if (mode == 1 || mode == 2) {
      //black
      coloredBalls.push(
        new Ball(
          (8 / 9) * snookerTable.l,
          snookerTable.w / 2 - yTableShiftOffset,
          0,
          0,
          0
        )
      );
      //pink
      coloredBalls.push(
        new Ball(
          (4 / 5) * snookerTable.l - 50,
          snookerTable.w / 2 - 15,
          255,
          192,
          203
        )
      );
      //blue
      coloredBalls.push(
        new Ball(snookerTable.l / 2, snookerTable.w / 2 - 15, 0, 0, 255)
      );
      //orange
      coloredBalls.push(
        new Ball(
          table.dCircle.x - xTableShiftOffset,
          table.dCircle.y - yTableShiftOffset,
          255,
          165,
          0
        )
      );
      //yellow
      coloredBalls.push(
        new Ball(
          table.dCircle.x - xTableShiftOffset,
          table.dCircle.y - yTableShiftOffset + 37.5,
          255,
          255,
          0
        )
      ); //green
      coloredBalls.push(
        new Ball(
          table.dCircle.x - xTableShiftOffset,
          table.dCircle.y - yTableShiftOffset - 37.5,
          0,
          255,
          0
        )
      );
    }
    //mode3
    if (mode == 3) {
      const xRandomStart = xTableShiftOffset + 3 * cushion.w;
      const xRandomEnd = snookerTable.l - 3 * cushion.w;
      const yRandomStart = yTableShiftOffset + 3 * cushion.w;
      const yRandomEnd = snookerTable.w - 3 * cushion.w;

      //Colored balls
      //black
      coloredBalls.push(
        new Ball(
          random(xRandomStart, xRandomEnd),
          random(yRandomStart, yRandomEnd),
          0,
          0,
          0
        )
      );
      //pink
      coloredBalls.push(
        new Ball(
          random(xRandomStart, xRandomEnd),
          random(yRandomStart, yRandomEnd),
          255,
          192,
          203
        )
      );
      //blue
      coloredBalls.push(
        new Ball(
          random(xRandomStart, xRandomEnd),
          random(yRandomStart, yRandomEnd),
          0,
          0,
          255
        )
      );
      //orange
      coloredBalls.push(
        new Ball(
          random(xRandomStart, xRandomEnd),
          random(yRandomStart, yRandomEnd),
          255,
          165,
          0
        )
      );
      //yellow
      coloredBalls.push(
        new Ball(
          random(xRandomStart, xRandomEnd),
          random(yRandomStart, yRandomEnd),
          255,
          255,
          0
        )
      ); //green
      coloredBalls.push(
        new Ball(
          random(xRandomStart, xRandomEnd),
          random(yRandomStart, yRandomEnd),
          0,
          255,
          0
        )
      );
    }
  }

  // 3) Game logic
  gamePlay(mode) {
    if (mode == -1 || mode == 4) {
      if (cueball1.cueballIsOutOfBounds()) {
        if (cueball1.body.position.x == 0 || cueball1.body.position.x == -10) {
          cueball1.setOutOfBoundsMessage();
        }
      }
      this.startFrame = frameCount;
    }

    if (mode == 0) {
      push();

      fill(255);
      textSize(15);
      strokeWeight(1);
      textAlign(CENTER);
      text(
        "Set balls by either hitting keys {1, 2, 3} or clicking the buttons below ",
        2 * xTableShiftOffset + snookerTable.l / 2,
        yTableShiftOffset + snookerTable.w / 2
      );
      pop();
    }

    if (mode > 0 && mode < 4) {
      this.displayInstruction();
      if (frameCount - this.startFrame <= 150) {
        push();
        fill(255);
        textSize(20);
        strokeWeight(1);
        textAlign(CENTER);
        text(
          "Start!",
          2 * xTableShiftOffset + snookerTable.l / 2,
          yTableShiftOffset + snookerTable.w / 2
        );
        pop();
      }
    }

    // Bonus Extension Round - With Timer
    if (mode == 5) {
      push();
      fill(255);
      textSize(15);
      text(
        `Time Left: ${floor(map(this.bonusRoundTimer, 0, 5000, 0, 60))}`,
        snookerTable.l / 2,
        snookerTable.w * 1.25
      );
      pop();
      console.log(`Time remaining: ${this.bonusRoundTimer}`);
      if (this.bonusRoundTimer > 0) {
        this.bonusRoundTimer -= 1;
      }
      if (this.bonusRoundTimer <= 0) {
        push();
        fill(255);
        textSize(15);
        strokeWeight(1);
        textAlign(CENTER);
        text(
          "Time out! Hit 'R' keyboard to restart game.",
          2 * xTableShiftOffset + snookerTable.l / 2,
          yTableShiftOffset + snookerTable.w / 2
        );
        pop();
        console.log("Time out");
      }
      if (frameCount - this.startFrame <= 150) {
        push();
        fill(255);
        textSize(20);
        strokeWeight(1);
        textAlign(CENTER);
        text(
          "Start!",
          3 * xTableShiftOffset + snookerTable.l / 2,
          yTableShiftOffset + snookerTable.w / 2
        );
        pop();
      }
      //   this.setRedBalls(mode);
      this.winBonusRound();
    }
  }

  // 4) Display cuestick instruction
  displayInstruction() {
    push();
    fill(255);
    textSize(14);
    textAlign(LEFT);
    text("Instructions:", 10, 400);
    pop();

    push();
    textSize(12);
    text("Cuestick", 10, 415);
    pop();

    push();
    textSize(10);
    text(
      "- Hover mouse to the tip of the cuestick. Click & drag to move it around.",
      10,
      430
    );
    pop();

    push();
    textSize(10);
    text("- LEFT keyboard arrow to adjust cuestick to the right.", 10, 445);
    pop();

    push();
    textSize(10);
    text("- RIGHT keyboard arrow to adjust cuestick to the left.", 10, 460);
    pop();

    push();
    textSize(10);
    text(
      "- To hit a ball. First - Click a location to aim. Second - Hit SPACE keyboard to fire away. This will send the cuestick flying. Third - Hit `S` keyboard to reset cuestick position.",
      10,
      475
    );
    pop();
  }

  // 5) Reset game mode
  reset() {
    this.bonusRoundTimer = 5000;
    mode = -1;
    redBalls = [];
    coloredBalls = [];
    cueball1.reset(-1);
  }

  // 6) Check Bonus game round win condition
  winBonusRound() {
    if (this.bonusRoundVictory) {
      push();
      fill(0, 255, 0);
      textSize(15);
      strokeWeight(1);
      textAlign(CENTER);
      text(
        `Congratulation You won the Bonus Round! Hit 'R' keyboard to restart game.`,
        2 * xTableShiftOffset + snookerTable.l / 2,
        snookerTable.w / 2
      );
      pop();
    }
  }
}
