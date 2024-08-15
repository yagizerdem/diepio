import { writable } from "svelte/store";
import SD from "../SD";

const initial = {
  hero: null,
  allEnemy: [],
  allBullets: [],
  allObstacles: [],
  canvas: null,
  context: null,
  showHitbox: null,
  prevTime: Date.now(),
  currentTime: Date.now(),
  cycleCounter: 0,
  fpsRate: 0,
  deltaTime: function () {
    return this.currentTime - this.prevTime;
  },
};

const game = writable(initial);
export default game;
