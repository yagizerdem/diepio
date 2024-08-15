<script>
  import Gate from "./lib/Gate.svelte";
  import Header from "./lib/Header.svelte";
  import authStore from "./lib/AuthStore";
  import SD from "./SD";
  import Game from "./lib/Game.svelte";
</script>

<Header />

<!-- {#if $authStore.appState == SD.appState.home}
  <Gate />
{:else if $authStore.appState == SD.appState.game}
  <Game />
{/if} -->
<Game />
