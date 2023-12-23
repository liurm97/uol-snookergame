/*
Commentary:

*/

//matterjs
var Engine = Matter.Engine;
var Events = Matter.Events;
var Render = Matter.Render;
var World = Matter.World;
var Body = Matter.Body;
var Bodies = Matter.Bodies;
var Constraint = Matter.Constraint;
var MouseConstraint = Matter.MouseConstraint;
var Mouse = Matter.Mouse;
var engine;
var mouse;

//setting variables
var offetFromTableEdge;
var xTableShiftOffset, yTableShiftOffset;

// gameplay variables
var mode;
var gameplay;
var play;
var btnModeOne, btnModeTwo, btnModeThree;
var ballToHitPositions;
var numConsectiveColoredBallPocketed;

//object variables
var table, cueStick;
var snookerTable;
var cushions = [];
var redBalls = [];
var coloredBalls = [];
var coloredBallsPositions = [];
var balls = [];
var pockets = [];
var cueball1;
var cuestick;

function setup() {
  canvas = createCanvas(800, 500);

  //initialize buttons
  btnModeOne = createButton("Mode 1 - Standard");
  btnModeOne.position(0, 505);
  btnModeOne.style("cursor", "pointer");

  btnModeTwo = createButton("Mode 2 - Randomnize Reds & Colored");
  btnModeTwo.position(btnModeOne.x + btnModeOne.width + 10, 505);
  btnModeTwo.style("cursor", "pointer");

  btnModeThree = createButton("Mode 3 - Randomnize Reds");
  btnModeThree.position(btnModeTwo.x + btnModeTwo.width + 10, 505);
  btnModeThree.style("cursor", "pointer");

  btnModeExtension = createButton("Extension Mode - Time Challenge");
  btnModeExtension.class("btnModeExtensionStyle");
  btnModeExtensionStyle = select(".btnModeExtension");
  btnModeExtension.style("color", "red");
  btnModeExtension.style("background", "black");
  btnModeExtension.style("border", "2px solid black");
  btnModeExtension.style("border-radius", "2px");
  btnModeExtension.style("cursor", "pointer");
  btnModeExtension.position(btnModeThree.x + btnModeThree.width + 10, 505);

  //default mode (snooker game not started)
  mode = -1;

  gameplay = new GamePlay();

  //initialize matterjs variables
  engine = Engine.create();
  mouse = Mouse.create(canvas.elt);
  var mouseParams = { mouse: mouse };
  var mouseConstraint = MouseConstraint.create(engine, mouseParams);
  World.add(engine.world, [mouseConstraint]);
  mouseConstraint.mouse.pixelRatio = pixelDensity();

  //initialize variables
  numConsectiveColoredBallPocketed = 0;
  offetFromTableEdge = 20;
  xTableShiftOffset = 35;
  yTableShiftOffset = 15;

  angleMode(DEGREES);
  background(0);
  snookerTable = {
    l: 720,
    w: 360,
  };

  pocket = {
    r: 10,
    d: 20,
  };

  ball = {
    d: 10,
  };

  cushion = {
    vertical_l: snookerTable.w - 2 * offetFromTableEdge,
    horizontal_l: (snookerTable.l - 3 * pocket.d) / 2,
    w: 6.25,
  };

  //remove vertical gravity
  engine.world.gravity.y = 0;

  // snooker table
  table = new Table();

  //Pockets
  //top pockets
  pockets.push(new Pocket(50, 30));
  pockets.push(
    new Pocket(cushion.horizontal_l + pocket.d + xTableShiftOffset + 10, 30)
  );
  pockets.push(new Pocket(snookerTable.l + 20, 30));

  //bottom pockets
  pockets.push(new Pocket(50, snookerTable.w));
  pockets.push(
    new Pocket(
      cushion.horizontal_l + pocket.d + xTableShiftOffset + 10,
      snookerTable.w
    )
  );
  pockets.push(new Pocket(snookerTable.l + 20, snookerTable.w));

  //Table cushions
  //vertical
  cushions.push(
    new Cushion(
      1.5 * cushion.w,
      offetFromTableEdge + cushion.vertical_l / 2,
      cushion.w,
      cushion.vertical_l,
      "vertical",
      1
    )
  );

  cushions.push(
    new Cushion(
      snookerTable.l - 1.5 * cushion.w,
      offetFromTableEdge + cushion.vertical_l / 2,
      cushion.w,
      cushion.vertical_l,
      "vertical",
      4
    )
  );

  //horizontal
  cushions.push(
    new Cushion(
      offetFromTableEdge + cushion.horizontal_l / 2,
      1.5 * cushion.w,
      cushion.horizontal_l,
      cushion.w,
      "horizontal",
      2
    )
  );
  cushions.push(
    new Cushion(
      offetFromTableEdge + 1.5 * cushion.horizontal_l + pocket.d,
      1.5 * cushion.w,
      cushion.horizontal_l,
      cushion.w,
      "horizontal",
      3
    )
  );

  cushions.push(
    new Cushion(
      offetFromTableEdge + 1.5 * cushion.horizontal_l + pocket.d,
      360 - 9,
      cushion.horizontal_l,
      cushion.w,
      "horizontal",
      5
    )
  );

  cushions.push(
    new Cushion(
      offetFromTableEdge + cushion.horizontal_l / 2,
      360 - 9,
      cushion.horizontal_l,
      cushion.w,
      "horizontal",
      6
    )
  );

  //Cue ball
  cueball1 = new CueBall(0, 0, 255, 255, 255);

  //Cuestick
  cuestick = new CueStick(xTableShiftOffset + 10, height / 2);
}

function draw() {
  background(0);
  Engine.update(engine);
  table.draw();

  //Buttons - Control game modes
  btnModeOne.mousePressed(() => {
    if (mode == 0) {
      console.log(`btnModeOne pressed`);
      mode = 1;
      gameplay.setRedBalls(mode);
      gameplay.setColoredBalls(mode);
    }
  });
  btnModeTwo.mousePressed(() => {
    if (mode == 0) {
      console.log(`btnModeTwo pressed`);
      mode = 3;
      gameplay.setRedBalls(mode);
      gameplay.setColoredBalls(mode);
    }
  });
  btnModeThree.mousePressed(() => {
    if (mode == 0) {
      console.log(`btnModeThree pressed`);
      mode = 2;
      gameplay.setRedBalls(mode);
      gameplay.setColoredBalls(mode);
    }
  });
  btnModeExtension.mousePressed(() => {
    if (mode == -1) {
      console.log(`btnModeThree pressed`);
      mode = 5;
      gameplay.setRedBalls(mode);
      gameplay.setColoredBalls(mode);
    }
  });

  //Cueball
  //draw
  cueball1.draw();
  //limit velocity
  cueball1.velocityLimit();

  //Cushions
  for (c of cushions) {
    //draw
    c.draw();
  }

  //Pockets
  for (p of pockets) {
    //draw
    p.draw();

    //reset cueball if it is pocketed
    if (cueball1.pocketed(p.x, p.y)) {
      console.log("Removing Cueball...");
      cueball1.reset();
      mode = 4;
      break;
    }
  }

  //Colored balls
  for (let i = 0; i < coloredBalls.length; ++i) {
    //throw warning if 2 colored balls are pocketed
    coloredBalls[i].throwMultipleColoredBallsPocketedWarning();
    for (p of pockets) {
      if (coloredBalls[i].isMoving()) {
        if (coloredBalls[i].pocketed(p.x, p.y)) {
          numConsectiveColoredBallPocketed += 1;
          console.log(
            `numConsectiveColoredBallPocketed: ${numConsectiveColoredBallPocketed}`
          );
        }
      }
    }
    //cueball-coloredballs collision detection
    try {
      const cueCollidedColoredballInformation = coloredBalls[i].checkContactCue(
        cueball1,
        "colored"
      );
      if (cueCollidedColoredballInformation)
        cueball1.throwCollisionImpact(
          cueCollidedColoredballInformation.collisionType
        );
    } catch (e) {
      continue;
    }

    //limit velocity
    coloredBalls[i].velocityLimit();
    //draw
    coloredBalls[i].draw();
  }

  //Red balls

  if (mode == 5 && redBalls.length == 0)
    gameplay.bonusRoundVictory = !gameplay.bonusRoundVictory;
  for (b of redBalls) {
    console.log(redBalls);
    //limit velocity
    b.velocityLimit();

    //draw
    b.draw();

    //cueball-redball collision detection
    var cueCollidedRedballInformation = b.checkContactCue(cueball1);
    if (cueCollidedRedballInformation) {
      cueball1.throwCollisionImpact(
        cueCollidedRedballInformation.collisionType
      );
    }

    //Remove red ball if it is pocketed
    for (p of pockets) {
      if (b.pocketed(p.x, p.y)) {
        const ind_ballToRemove = redBalls.indexOf(b);
        redBalls.splice(ind_ballToRemove, 1);
        break;
      }
    }
  }
  //cueball-cushion collision detection
  var collisionInformation = cueball1.cueCushionCollision(cushions);
  if (collisionInformation) {
    cueball1.throwCollisionImpact(
      collisionInformation.collisionType,
      collisionInformation.cushionNumber
    );
  }

  //cuestick
  cuestick.draw();

  //rotate cuestick to the left
  if (cuestick) {
    if (keyIsDown(LEFT_ARROW)) {
      cuestick.rotateLeft();
    }
    //rotate cuestick to the right
    if (keyIsDown(RIGHT_ARROW)) {
      cuestick.rotateRight();
    }
    //shorten cuestick
    if (keyIsDown(32)) {
      let force = cuestick.reduce();
      console.log(`force: ${force}`);
    }
  }
  console.log(`mode: ${mode}`);
  gameplay.gamePlay(mode);
}

function mousePressed() {
  //Gameplay Interaction to hit the mall at where the mouse clicks
  ballToHitPositions = { x: mouseX, y: mouseY };
  console.log(
    `Cuestick take aim: ${ballToHitPositions.x}, ${ballToHitPositions.y}`
  );

  //Restrict cueball to be set within the "D" zone
  if (mode == -1) {
    if (!cueball1.cueballIsOutOfBounds()) {
      console.log("setting ball");
      mode += 1;
      cueball1.update();
      fill(255);
    }
  }

  if (mode == 4) {
    if (!cueball1.cueballIsOutOfBounds()) {
      console.log("setting ball");
      cueball1.update();
      // mode = 5;
    }
  }
}

function keyPressed() {
  //Add keyboard interaction to setting up red and colored balls
  if (mode == -1 && keyCode == 52) {
    console.log("Bonus Extension mode starting");
    mode = 5;
    gameplay.setRedBalls(mode);
  }
  if (mode == 0) {
    if (keyCode == 49) {
      console.log("mode 1 starting");
      mode = 1;
    }
    if (keyCode == 50) {
      console.log("mode 2 starting");
      mode = 3;
    }
    if (keyCode == 51) {
      console.log("mode 3 starting");
      mode = 2;
    }
    gameplay.setRedBalls(mode);
    gameplay.setColoredBalls(mode);
  }

  //Press "s" to reset cuestick position
  if (keyCode == 83) cuestick.stay();

  //Press "r" to reset game
  if (keyCode == 82) gameplay.reset();
}

function keyReleased() {
  //Add keyboard interaction to simulate cuestick hitting the ball
  if (keyCode == 32) {
    var originalPosition = cuestick.hit(ballToHitPositions);
    console.log(originalPosition.x, originalPosition.y);
    cuestick.reset(originalPosition);
  }
  return false;
}
