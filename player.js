let GRAVITY = 0.45;

class Player {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.color = "yellow";

    this.vx = 0;
    this.vy = 0;

    this.previousPos = {};
    this.original = {
      x: x,
      y: y,
    };
    this.savedGround = null;

    this.onGround = false;
  }
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.w, this.h);
  }

  touchWall() {
    //Platforms
    for (let o of obstacles) {
      let touchPoints = [];
      let touchPointsDes = [];
      if (pointInRectangle({ x: this.x, y: this.y }, o)) {
        touchPointsDes.push("up_left");
        touchPoints.push([this.x, this.y]);
      }

      if (pointInRectangle({ x: this.x + this.w, y: this.y }, o)) {
        touchPointsDes.push("up_right");
        touchPoints.push([this.x + this.w, this.y]);
      }

      if (pointInRectangle({ x: this.x, y: this.y + this.h }, o)) {
        touchPointsDes.push("down_left");
        touchPoints.push([this.x, this.y + this.h]);
      }

      if (pointInRectangle({ x: this.x + this.w, y: this.y + this.h }, o)) {
        touchPointsDes.push("down_right");
        touchPoints.push([this.x + this.w, this.y + this.h]);
      }
      //
      if (touchPoints.length == 4) {
        if (this.vy > 0) {
          if (!this.onGround) {
            playSound(soundPaths.impact);
          }

          this.onGround = true;
          this.groundEntity = o;
          this.savedGround = o;
          this.y = o.y - this.h;
          this.vy = 0;
        } else {
          console.error("Wtf is happening");
        }
      }
      //
      if (touchPoints.length == 2) {
        ////console.log(touchPoints);
        if (touchPoints[0][1] == touchPoints[1][1]) {
          //console.log(this.y);
          //let optimalPos = null;
          if (this.y + this.h / 2 > o.y + o.h / 2) {
            this.y = o.y + o.h;
            if (this.vy < 0) {
              this.vy = 0;
            }
            this.vy += GRAVITY;
          } else {
            if (!this.onGround && this.vy > GRAVITY) {
              //playSound(soundPaths.impact);
            }

            this.onGround = true;
            this.groundEntity = o;
            this.savedGround = o;
            this.y = o.y - this.h;
            this.vy = 0;
          }
        }
        if (touchPoints[0][0] == touchPoints[1][0]) {
          //let optimalPos = null;

          if (this.x + this.w / 2 > o.x + o.w / 2) {
            this.x = o.x + o.w;
            //if (this.vx < 0) this.vx = 0;
          } else {
            this.x = o.x - this.w;
            //if (this.vx > 0) this.vx = 0;
          }
        }
      } else if (touchPointsDes.length == 1) {
        if (touchPointsDes == "down_right") {
          if (this.vy > 0) {
            if (!this.onGround) {
              //playSound(soundPaths.impact);
            }
            this.onGround = true;
            this.groundEntity = o;
            this.savedGround = o;
            this.y = o.y - this.h;
            this.vy = 0;
          }
        } else if (touchPointsDes == "down_left") {
          if (this.vy > 0) {
            if (!this.onGround) {
              //playSound(soundPaths.impact);
            }
            this.onGround = true;
            this.groundEntity = o;
            this.savedGround = o;
            this.y = o.y - this.h;
            this.vy = 0;
          }
        } else {
          if (this.vy == 0 || this.vy == GRAVITY) {
            if (touchPointsDes == "up_left") {
              this.x = o.x + o.w;

              this.vx = 0;
            } else {
              this.x = o.x - this.w;
              this.vx = 0;
            }
          } else {
            this.y = o.y + o.h;
            if (this.vy < 0) {
              this.vy = 0;
            }
            this.vy += GRAVITY;
          }
        }
      }
    }

    //Lava
    for (let l of lavas) {
      if (collision(this, l)) {
        if (resetWhenDeath) {
          //console.log(1);

          reset();
        } else {
          //playSound(soundPaths.lava);
          this.onGround = false;
          this.x = this.original.x;
          this.y = this.original.y;
          this.vy = GRAVITY;
        }
      }
    }

    for (let o of obstacle2) {
      let touchPoints = [];
      let touchPointsDes = [];
      if (pointInRectangle({ x: this.x, y: this.y }, o)) {
        touchPointsDes.push("up_left");
        touchPoints.push([this.x, this.y]);
      }

      if (pointInRectangle({ x: this.x + this.w, y: this.y }, o)) {
        touchPointsDes.push("up_right");
        touchPoints.push([this.x + this.w, this.y]);
      }

      if (pointInRectangle({ x: this.x, y: this.y + this.h }, o)) {
        touchPointsDes.push("down_left");
        touchPoints.push([this.x, this.y + this.h]);
      }

      if (pointInRectangle({ x: this.x + this.w, y: this.y + this.h }, o)) {
        touchPointsDes.push("down_right");
        touchPoints.push([this.x + this.w, this.y + this.h]);
      }
      //
      if (touchPoints.length == 4) {
        if (this.vy > 0) {
          if (!this.onGround) {
            playSound(soundPaths.impact);
          }

          this.onGround = true;
          this.groundEntity = o;
          //this.savedGround = o;
          this.y = o.y - this.h;
          this.vy = 0;
        } else {
          console.error("Wtf is happening");
        }
      }
      //
      if (touchPoints.length == 2) {
        ////console.log(touchPoints);
        if (touchPoints[0][1] == touchPoints[1][1]) {
          //console.log(this.y);
          //let optimalPos = null;
          if (this.y + this.h / 2 > o.y + o.h / 2) {
            this.y = o.y + o.h;
            if (this.vy < 0) {
              this.vy = 0;
            }
            this.vy += GRAVITY;
          } else {
            if (!this.onGround && this.vy > GRAVITY) {
              //playSound(soundPaths.impact);
            }

            this.onGround = true;
            this.groundEntity = o;
            // this.savedGround = o;
            this.y = o.y - this.h;
            this.vy = 0;
          }
        }
        if (touchPoints[0][0] == touchPoints[1][0]) {
          //let optimalPos = null;

          if (this.x + this.w / 2 > o.x + o.w / 2) {
            this.x = o.x + o.w;
            //if (this.vx < 0) this.vx = 0;
          } else {
            this.x = o.x - this.w;
            //if (this.vx > 0) this.vx = 0;
          }
        }
      } else if (touchPointsDes.length == 1) {
        if (touchPointsDes == "down_right") {
          if (this.vy > 0) {
            if (!this.onGround) {
              playSound(soundPaths.impact);
            }
            this.onGround = true;
            this.groundEntity = o;
            //this.savedGround = o;
            this.y = o.y - this.h;
            this.vy = 0;
          }
        } else if (touchPointsDes == "down_left") {
          if (this.vy > 0) {
            if (!this.onGround) {
              playSound(soundPaths.impact);
            }
            this.onGround = true;
            this.groundEntity = o;
            this.savedGround = o;
            this.y = o.y - this.h;
            this.vy = 0;
          }
        } else {
          if (this.vy == 0 || this.vy == GRAVITY) {
            if (touchPointsDes == "up_left") {
              this.x = o.x + o.w;

              this.vx = 0;
            } else {
              this.x = o.x - this.w;
              this.vx = 0;
            }
          } else {
            this.y = o.y + o.h;
            if (this.vy < 0) {
              this.vy = 0;
            }
            this.vy += GRAVITY;
          }
        }
      }
    }
    //Phase blocks
  }
  moveWithPlatform() {
    if (this.groundEntity && this.groundEntity.targetX) {
      this.x += this.groundEntity.dx;
      this.y += this.groundEntity.dy;
    }
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.moveWithPlatform();
    this.touchWall();

    this.vy += GRAVITY;
    if (this.vy > GRAVITY * 2) {
      this.groundEntity = {};
      this.onGround = false;
    }

    this.previousPos.x = this.x;
    this.previousPos.y = this.y;
    this.previousPos.dy = this.dy;
    this.previousPos.dx = this.dx;
  }
}

let player = new Player(canvas.width / 2, 200, 18, 18);
