<script>
  import authStore from "../lib/AuthStore";
  import SD from "../SD";
  var playerName = null;
  function clickHandler() {
    playerName = playerName?.trim();
    if (!playerName) {
      Toastify({
        text: "enter valid player name",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff0000, #ff7f7f)", // Red gradient
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      return;
    }
    $authStore.appState = SD.appState.game;
  }
</script>

<div class="gate">
  <h1>diep io</h1>
  <input placeholder="enter name" bind:value={playerName} />
  <button on:click={clickHandler}>go to match</button>
</div>

<style>
  .gate {
    width: 400px;
    height: 400px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  input {
    margin-top: 10px;
    border-radius: 3px;
    border: none;
    background: #4d4c4c;
    color: white;
    padding: 5px 10px;
    margin-bottom: 10px;
  }
  button {
    padding: 10px 30px;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
