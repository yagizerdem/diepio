import SD from "../SD";
import gameStore from "./GameStore";
import EventEmitter from "events";

var canvas, context, showHitbox, deltaTime, currentTime, prevTime;
const unsubscribe = gameStore.subscribe((value) => {
  canvas = value.canvas;
  context = value.context;
  showHitbox = value.showHitbox;
  currentTime = value.currentTime;
  prevTime = value.prevTime;
});

class Ship extends EventEmitter {
  static baseMass = 100;
  static speedCap = 0.5;
  constructor({ x, y }) {
    super();
    this.x = x;
    this.y = y;
    this.angle = Math.PI / 2; // initail position is right
    this.size = {
      w: 100,
      h: 100,
    };
    this.level = 1;
    this.mass = 100;
    this.force = {
      x: 0,
      y: 0,
    };
    this.speed = {
      x: 0,
      y: 0,
    };
    this.img = new Image();
    this.img.src = "Player1.png";
    this.imgLoaded = false;

    this.img.onload = () => {
      this.imgLoaded = true;
    };
    this.img.onerror = () => {
      this.imgLoaded = false;
    };
    this.speedCap = Ship.speedCap;
    this.radius = 400;
  }
  draw() {
    // Draw the image on the canvas when it has loaded
    if (this.imgLoaded) {
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle);
      context.drawImage(
        this.img,
        -this.size.w / 2,
        -this.size.h / 2,
        this.size.w,
        this.size.h
      );
      context.restore();

      // show hitbox
      if (showHitbox) {
        context.strokeStyle = "red";
        context.strokeRect(
          this.x - this.size.w / 2,
          this.y - this.size.h / 2,
          this.size.w,
          this.size.h
        );
      }
      this.drawRadius();
    }
  }
  update() {
    this.friction();
    this.move();
  }
  move() {
    const acceleration = {
      x: (this.force.x / this.mass) * 10,
      y: (this.force.y / this.mass) * 10,
    };
    const deltaTime = currentTime - prevTime;
    this.speed.x += acceleration.x / deltaTime;
    this.speed.y += acceleration.y / deltaTime;

    //  checking speed cap
    this.speed.x =
      Math.abs(this.speed.x) > this.speedCap
        ? Math.sign(this.speed.x) * this.speedCap
        : this.speed.x;
    this.speed.y =
      Math.abs(this.speed.y) > this.speedCap
        ? Math.sign(this.speed.y) * this.speedCap
        : this.speed.y;

    const dx = this.speed.x * deltaTime;
    const dy = this.speed.y * deltaTime;

    if (
      this.x + dx <= 0 ||
      this.x + dx >= SD.mapSize.w ||
      this.y + dy <= 0 ||
      this.y + dy >= SD.mapSize.h
    ) {
      this.speed.x = 0;
      this.speed.y = 0;
      return;
    }

    this.x += dx;
    this.y += dy;
  }
  friction() {
    if (this.speed.x != 0) {
      const sign = Math.sign(this.speed.x);
      this.speed.x -= 0.001 * sign;
    }
    if (this.speed.y != 0) {
      const sign = Math.sign(this.speed.x);
      this.speed.y -= 0.001 * sign;
    }
  }
  drawRadius() {
    context.beginPath();
    context.strokeStyle = "red";
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.stroke();
    context.strokeStyle = "black";
  }
  static init() {
    const newShip = new Ship({ x: 100, y: 100 });
    return newShip;
  }
}
export default Ship;
