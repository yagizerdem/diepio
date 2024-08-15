<script>
  import { onDestroy, onMount } from "svelte";
  import SD from "../SD";
  import gameStore from "./GameStore";
  var canvas;
  var context;
  var loop = null;
  const zoomOutCoefficiont = 20;
  onMount(() => {
    canvas = document.getElementById("smallMapCanvas");
    context = canvas.getContext("2d");
    main();
  });

  function main() {
    canvas.width = SD.mapSize.w / zoomOutCoefficiont;
    canvas.height = SD.mapSize.h / zoomOutCoefficiont;
    loop = setInterval(() => {
      animate();
    }, 1000 / SD.fps);
  }
  function animate() {
    const x = $gameStore.hero.x / zoomOutCoefficiont;
    const y = $gameStore.hero.y / zoomOutCoefficiont;

    // draw ship
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
    // draw radius
    context.beginPath();
    context.arc(
      x,
      y,
      $gameStore.hero.radius / zoomOutCoefficiont,
      0,
      Math.PI * 2,
      true
    );
    context.strokeStyle = "red";
    context.stroke();
    context.strokeStyle = "black";
    context.closePath();
  }
  onDestroy(() => {
    clearInterval(loop);
  });
</script>

<canvas id="smallMapCanvas"></canvas>

<style>
  #smallMapCanvas {
    background: rgba(40, 40, 43, 0.3);
    border: 2px solid black;
  }
</style>
