<script>
  import { onDestroy, onMount } from "svelte";
  import SD from "../SD";
  import gameStore from "./GameStore";
  import Ship from "./Ship";
  import SmallMap from "./SmallMap.svelte";

  var loop = null;
  var fpsRateLable = null;

  onMount(() => {
    $gameStore.canvas = document.getElementById("canvas");
    $gameStore.context = $gameStore.canvas.getContext("2d");
    $gameStore.hero = Ship.init();
    $gameStore.showHitbox = true;

    window.addEventListener("keydown", ({ key }) => {
      const vector2 = JSON.parse(JSON.stringify($gameStore.hero.force)); // deep copy;
      switch (key) {
        case "ArrowLeft":
          vector2.x = -1;
          break;
        case "ArrowRight":
          vector2.x = 1;
          break;
        case "ArrowUp":
          vector2.y = -1;
          break;
        case "ArrowDown":
          vector2.y = 1;
          break;
        default:
          break;
      }
      $gameStore.hero.force = vector2;
    });
    window.addEventListener("keyup", ({ key }) => {
      const vector2 = JSON.parse(JSON.stringify($gameStore.hero.force)); // deep copy;
      switch (key) {
        case "ArrowLeft":
          vector2.x = 0;
          break;
        case "ArrowRight":
          vector2.x = 0;
          break;
        case "ArrowUp":
          vector2.y = 0;
          break;
        case "ArrowDown":
          vector2.y = 0;
          break;
        default:
          break;
      }
      $gameStore.hero.force = vector2;
    });
    window.addEventListener("mousemove", (event) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const angle = -Math.atan2(centerX - mouseX, centerY - mouseY);
      $gameStore.hero.angle = angle;
    });

    main();
  });
  function main() {
    $gameStore.canvas.width = SD.mapSize.w;
    $gameStore.canvas.height = SD.mapSize.h;

    loop = setInterval(() => {
      $gameStore.currentTime = Date.now();
      if (++$gameStore.cycleCounter == 60) {
        $gameStore.fpsRate = (1000 / $gameStore.deltaTime()).toFixed(0);
        $gameStore.cycleCounter = 0;
      }
      $gameStore.canvas.style.marginTop = `${window.innerHeight / 2 - $gameStore.hero.y}px`;
      $gameStore.canvas.style.marginLeft = `${window.innerWidth / 2 - $gameStore.hero.x}px`;
      update();
      draw();
      $gameStore.prevTime = $gameStore.currentTime;
    }, 1000 / SD.fps);
  }

  function update() {
    $gameStore.hero.update();
  }
  function draw() {
    clearCanvas();
    drawFpsRate();
    $gameStore.hero.draw();
  }
  function drawFpsRate() {
    fpsRateLable.innerText = `fps rate : ${$gameStore.fpsRate}`;
  }
  function clearCanvas() {
    $gameStore.context.clearRect(
      0,
      0,
      $gameStore.canvas.width,
      $gameStore.canvas.height
    );
  }

  onDestroy(() => {
    clearInterval(loop);
  });
</script>

<canvas id="canvas"> </canvas>
<div class="fpsRate prevent-select" bind:this={fpsRateLable}></div>

<div class="smallMap">
  <SmallMap />
</div>

<style>
  canvas {
    background-color: rgba(255, 255, 255, 0.4);
    border: 5px solid black;
  }
  .fpsRate {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 40px;
  }
  .smallMap {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .prevent-select {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
</style>
