import { shadow } from "./app.module.css";
import { displayText } from "./globals";

const Card = () => {
  return () => (
    <div
      attr:class={`w-[80%] h-[40%] md:w-[600px] md:h-[200px] flex justify-center items-center 
             bg-red-400 text-[#1D2021] rounded-3xl text-xl font-semibold ${shadow}
             px-8 text-center border-4 border-[#1D2021]`}
    >
      {displayText.value}
    </div>
  );
};

export default Card;
