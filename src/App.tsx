import Card from "./Card";
import PlayButton from "./PlayButton";
import { loadedMusic } from "./globals";

const App = () => {
  return () => (
    <div
      attr:class="w-full h-full flex justify-center items-center 
           bg-white flex-col"
    >
      {loadedMusic.value ? (
        <>
          <Card />
          <PlayButton />
        </>
      ) : (
        <div attr:class="text-4xl font-semibold text-center">
          Loading. Please wait...
        </div>
      )}
    </div>
  );
};

export default App;
