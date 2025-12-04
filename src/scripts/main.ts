import "../styles/main.scss";
import AuroraHero from "./AuroraHero";
import Popup from "./Popup";

document.addEventListener("DOMContentLoaded", (): void => {
  new AuroraHero();
  new Popup();
});
