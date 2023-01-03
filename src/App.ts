import { html, h } from "promethium-js";
import Card from "./Card";
import PlayButton from "./PlayButton";
import { loadedMusic } from "./globals";

const App = () => {
  return () =>
    html`<div
      class="w-full h-full flex justify-center items-center 
           bg-white flex-col"
    >
      ${loadedMusic()
        ? html` ${h(Card)} ${h(PlayButton)} `
        : html`<div class="text-4xl font-semibold text-center">
            Loading. Please wait...
          </div>`}
    </div>`;
};

export default App;
