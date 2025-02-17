import { IoMdSend } from "react-icons/io";
import Button from "./Button";

const InputArea = () => {
  return (
    <div className="absolute bottom-4 left-1/2 h-32 w-4/5 max-w-[700px] -translate-x-1/2 rounded-3xl border shadow">
      <textarea
        name="prompt-input"
        id="promptInput"
        // rows={5}
        placeholder="Type a message to linguify"
        className="mx-auto h-24 w-full resize-none rounded-3xl p-3 placeholder:text-sm focus:outline-none"
      ></textarea>

      <div className="absolute bottom-0 flex h-8 w-full items-center justify-between px-4 pb-2">
        <div className=""></div>
        <button className="">
          <IoMdSend className="text-2xl text-blue" />
        </button>
      </div>
    </div>
  );
};

export default InputArea;
