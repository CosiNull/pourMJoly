document.addEventListener("keydown", function (e) {
  keyDown[e.keyCode] = true;
  //console.log(keyDown);
});

document.addEventListener("keyup", function (e) {
  delete keyDown[e.keyCode];
  //console.log(keyDown);
});
let keyDown = {};
let jump = 14;
let speed = 6.4;
let offset = 0;

function clavier() {
  //console.log(e)
  if (32 in keyDown && player.onGround) {
    player.onGround = false;
    player.groundEntity = {};
    player.vy -= jump;
    playSound(soundPaths.jump);
  }

  if (37 in keyDown) {
    if (player.x <= canvas.width / 2) {
      offset -= speed;
      obstacles.forEach((o) => {
        o.x += speed;
        if (o.message) o.message.x = o.x;
      });
      player.vx = 0;
    } else {
      player.vx = -speed;
    }
  }
  if (39 in keyDown) {
    if (player.x >= canvas.width / 2) {
      offset += speed;
      player.vx = 0;
      obstacles.forEach((o) => {
        o.x -= speed;
        if (o.message) o.message.x = o.x;
      });
    } else {
      player.vx = speed;
    }
  }

  if (
    (keyDown[37] == undefined && keyDown[39] == undefined) ||
    (39 in keyDown && 37 in keyDown)
  ) {
    player.vx = 0;
  }

  /*
      if(38 in keyDown &&joueur.y>0){
          joueur.y-=joueur.speed
          }
      if(40 in keyDown &&joueur.y<canvas.height-joueur.h){
          joueur.y+=joueur.speed
          }	
      */
}

function detectMob() {
  console.log(window.innerWidth, window.innerHeight);
  return window.innerWidth <= 1024 || window.innerHeight <= 600;
}

let mobile = detectMob();

if (mobile) {
  let right = document.createElement("div");
  right.style.width = "110px";
  right.style.height = "80px";

  right.style.backgroundColor = "rgba(0,200,0,0.5)";

  right.style.position = "fixed";
  right.style.right = "40px";
  right.style.bottom = "5%";
  right.innerHTML = "[⇨]";

  right.style.display = "flex";
  right.style.justifyContent = "center";
  right.style.alignContent = "center";
  right.style.flexDirection = "column";
  right.style.textAlign = "center";
  right.style.fontSize = "50px";
  right.style.userSelect = "none";
  right.onselectstart = new Function("return false");

  right.addEventListener(
    "touchstart",
    function (e) {
      keyDown[39] = true;
    },
    false
  );
  right.addEventListener(
    "touchend",
    function (e) {
      delete keyDown[39];
    },
    false
  );

  document.body.appendChild(right);

  let left = document.createElement("div");
  left.style.width = "110px";
  left.style.height = "80px";

  left.style.backgroundColor = "rgba(0,200,0,0.5)";

  left.style.position = "fixed";
  left.style.right = "180px";
  left.style.bottom = "5%";
  left.innerHTML = "[⇦]";

  left.style.display = "flex";
  left.style.justifyContent = "center";
  left.style.alignContent = "center";
  left.style.flexDirection = "column";
  left.style.textAlign = "center";
  left.style.fontSize = "50px";
  left.style.userSelect = "none";
  left.onselectstart = new Function("return false");

  left.addEventListener(
    "touchstart",
    function (e) {
      keyDown[37] = true;
    },
    false
  );
  left.addEventListener(
    "touchend",
    function (e) {
      delete keyDown[37];
    },
    false
  );

  document.body.appendChild(left);

  let space = document.createElement("div");
  space.style.width = "110px";
  space.style.height = "80px";

  space.style.backgroundColor = "rgba(0,200,0,0.5)";

  space.style.position = "fixed";
  space.style.left = "100px";
  space.style.bottom = "5%";
  space.innerHTML = "[⇪]";

  space.style.display = "flex";
  space.style.justifyContent = "center";
  space.style.alignContent = "center";
  space.style.flexDirection = "column";
  space.style.textAlign = "center";
  space.style.fontSize = "50px";
  space.style.userSelect = "none";
  space.onselectstart = new Function("return false");

  space.addEventListener(
    "touchstart",
    function (e) {
      keyDown[32] = true;
    },
    false
  );
  space.addEventListener(
    "touchend",
    function (e) {
      delete keyDown[32];
    },
    false
  );

  document.body.appendChild(space);
}
