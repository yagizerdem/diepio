import { writable } from "svelte/store";
import SD from "../SD";

const initial = {
  playerName: null,
  appState: SD.appState.home,
};

const auth = writable(initial);

export default auth;
