const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


const hitBall = new Audio(
  "mixkit-game-ball-tap-2073.wav"
);
const gameOver = new Audio(
  "mixkit-failure-arcade-alert-notification-240.wav"
);




let ridues, ballx, bally, changeX, changeY, leftpaddelWidth,
leftpaddelHeight, leftpaddelx, leftpaddely, rightpaddelx, 
rightpaddely, rightpaddelWidth, rightpaddelHeight;

ridues = 7;

ballx = canvas.width / 2;
bally = canvas.height / 2;

changeX = -2;
changeY = -2;

leftpaddelx = 0;
leftpaddely = 50;

leftpaddelWidth = 5;
leftpaddelHeight = 50;

rightpaddelx = canvas.width - leftpaddelWidth;
rightpaddely = 90;

rightpaddelWidth = 5;
rightpaddelHeight = 50;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  leftHandel();
  rightHandel();
  ctx.restore();
  drawBall();
  ballx += changeX;
  bally += changeY;
  ballMovement();
  detectLeftTouch();
  wallTouch();
  detectRightTouch();
}


const interval = setInterval(draw, 10);


function drawBall() {
  ctx.beginPath();
  ctx.arc(ballx, bally, ridues, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function ballMovement() {
  //my function
  if (
    ballx <= ridues ||
    bally <= ridues ||
    ballx >= canvas.width - ridues ||
    bally >= canvas.height - ridues
  ) {
    console.log("touch");
    changeX *= -1;
    changeY *= -1;

    if (ballx >= canvas.width / 2 && bally <= ridues) {
      changeX *= -1;
    }

    if (ballx <= canvas.width / 2 && bally <= ridues) {
      changeX *= -1;
    }

    if (ballx <= ridues) {
      //frez
      changeY *= -1;
    }

    if (ballx >= canvas.width - ridues) {
      changeY *= -1;
    }

    if (bally >= canvas.height - ridues) {
      changeX *= -1;
    }

    console.log(ballx);
    console.log(bally);
  }
}

function leftHandel() {
  ctx.fillStyle = "#0095DD";
  ctx.fillRect(leftpaddelx, leftpaddely, leftpaddelWidth, leftpaddelHeight);
 

}
function rightHandel() {
  ctx.fillRect(rightpaddelx, rightpaddely, rightpaddelWidth, rightpaddelHeight);
 
  
  
}

function detectLeftTouch() {
  if (ballx - ridues <= leftpaddelWidth && bally >= leftpaddely && bally <= leftpaddelHeight + leftpaddely) {
    console.log("left side touch");
    hitBall.play();
    // leftBounce();
    return true;
  }
  return false;
}

function detectRightTouch() {
  if (ballx + ridues >= rightpaddelx && bally >= rightpaddely && bally <= rightpaddelHeight + rightpaddely) {
    console.log("right side touch");
    hitBall.play();
    return true;
  }
  return false;
}

function leftBounce() {
  changeX *= -1;
  changeY *= -1;
  if (ballx <= ridues) {
    //frez
    changeY *= -1;
  }
}

function detectLeftWallTouch() {
  if (ballx <= ridues) {
    return true;
  }
  return false;
}

function detectRightWallTouch() {
  if (ballx >= canvas.width - ridues) {
    return true;
  }
  return false;
}

function wallTouch() {
  if (detectLeftWallTouch() && !detectLeftTouch()) {
    changeX *= -1;
    clearInterval(interval);
    gameOver.play();
    console.log("GAME OVER");
    alert("GAME OVER");
    // dy*=-1;
  }

  if (detectRightWallTouch() && !detectRightTouch()) {
    changeX *= -1;
    clearInterval(interval);
    gameOver.play();
    console.log("GAME OVER");
    alert("GAME OVER");
    // dy*=-1;
  }
}

let intervalId1, intervalId2, intervalId3, intervalId4;

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    // start repeating the action after 500ms
    intervalId1 = setInterval(function () {
      // code to be executed repeatedly while the key is held down
      if (rightpaddely > 0) rightpaddely -= 10;
    }, 50);
  } else if (event.key === "ArrowDown") {
    intervalId2 = setInterval(function () {
      // code to be executed repeatedly while the key is held down
      if (rightpaddely < canvas.height - 50) rightpaddely += 10;
    }, 30);
  } else if (event.key === "q") {
    intervalId3 = setInterval(function () {
      // code to be executed repeatedly while the key is held down
      if (leftpaddely > 0) leftpaddely -= 10;
    }, 30);
  } else if (event.key === "a") {
    intervalId4 = setInterval(function () {
      // code to be executed repeatedly while the key is held down
      if (leftpaddely < canvas.height - 50) leftpaddely += 10;
    }, 30);
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowUp") {
    // stop repeating the action
    clearInterval(intervalId1);
  } else if (event.key == "ArrowDown") {
    clearInterval(intervalId2);
  } else if (event.key == "q") {
    clearInterval(intervalId3);
  } else if (event.key == "a") {
    clearInterval(intervalId4);
  }
});
