let obstacles = [];
let obstacle2 = [];
let lavas = [];

function collision(a, b) {
  if (
    a.x + a.w > b.x &&
    a.x < b.x + b.w &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  ) {
    return true;
  }
}
function pointInRectangle(point, rect) {
  if (
    point.x > rect.x &&
    point.x < rect.x + rect.w &&
    point.y > rect.y &&
    point.y < rect.y + rect.h
  ) {
    return true;
  } else {
    return false;
  }
}

class Obstacle {
  constructor(
    x,
    y,
    w,
    h,
    color = "white",
    text = "PROMOTION 2016-2021",
    imageDetails = {
      w: 200,
      h: 200,
      src: "images/will.jpeg",
    }
  ) {
    this.x = x;
    this.oriX = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.text = text;

    //this.type = "normal";
    this.color = color;
    this.message = null;
    this.image = imageDetails;

    this.tutorial = false;
  }
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.w, this.h);

    if (player.savedGround == this) {
      if (this.message) {
        if (!this.tutorial) {
          //Draw image
          drawImage(
            this.x + this.w / 2 - this.image.w / 2,
            this.y - this.image.h,
            this.image.w,
            this.image.h,
            this.image.src
          );
        }

        this.message.draw();
      } else {
        if (this.tutorial) {
          this.message = new Message(
            this.x,
            180,
            this.w,
            this.color,
            this.text
          );
        } else {
          this.message = new Message(
            this.x,
            this.y - 240,
            this.w,
            this.color,
            this.text
          );
        }
      }
    }

    if (this.tutorial && !mobile) {
      c.font = "30px Arvo";
      c.fillStyle = "black";
      c.textAlign = "center";
      c.fillText("[Espace][⇦][⇨]", this.x + this.w / 2, this.y + this.h / 2);
    }
    if (this.tutorial) {
      drawImage(this.x + 100, this.y - 180, 220, 180, "./images/menu1.jpeg");
      drawImage(this.x + 500, this.y - 180, 220, 180, "./images/menu2.jpeg");
      drawImage(this.x + 900, this.y - 180, 220, 180, "./images/menu3.jpeg");
    }
  }
  update() {
    if (
      this.x <=
      -(canvas.width + gap + (blockLength + gap) * (obstacles.length - 1)) / 2
    ) {
      this.x +=
        canvas.width + gap + (blockLength + gap) * (obstacles.length - 1);
    } else if (
      this.x >=
      (canvas.width + gap + (blockLength + gap) * (obstacles.length - 1)) / 2
    ) {
      this.x -=
        canvas.width + gap + (blockLength + gap) * (obstacles.length - 1);
    }
  }
}
class ObstacleG {
  constructor(x, y, w, h, color = "white") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    //this.type = "normal";
    this.color = color;
  }
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Message {
  constructor(x, y, w, color = "white", text = "PROMOTION 2016-2021") {
    this.x = x;
    this.y = y;
    this.w = w;

    this.text = text;

    //this.type = "normal";
    this.color = color;
    this.message = null;
  }
  draw() {
    c.font = "70px Lobster";
    c.textAlign = "center";
    c.fillStyle = this.color;
    c.fillText(this.text, this.x + this.w / 2, this.y);
  }
}
//________________________________

let blockLength = 320;
let gap = 150;

function setMenu() {
  obstacles.push(new Obstacle(0, canvas.height - 100, canvas.width, 100));
  obstacles[0].tutorial = true;
  obstacle2.push(
    new ObstacleG(0, canvas.height - 5, canvas.width, canvas.height)
  );

  for (let i = 0; i < namesList.length; i++) {
    let height = canvas.height - Math.random() * 200 - 30;

    obstacles.push(
      new Obstacle(
        canvas.width + gap + (blockLength + gap) * i,
        height,
        blockLength,
        height,
        namesList[i].color,
        namesList[i].name,
        namesList[i].imageDetails
      )
    );
  }
}
