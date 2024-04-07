import { useAtom } from "jotai";
import { activeContractAtom, activeSidebarViewAtom } from "../utils.ts/atoms";
import { useRef } from "react";

const SelectContractView = () => {

  const [, setActiveSidebarView] = useAtom(activeSidebarViewAtom);
  const [, setActiveContract] = useAtom(activeContractAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  const buttonClicked = () => {
    if (inputRef.current) {
      setActiveContract(inputRef.current.value);
      setActiveSidebarView(1);
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-3">
      <input
        type="text"
        placeholder="Contract Address"
        className="w-full h-10 px-2 rounded-md"
        ref={inputRef}
      />
      <button 
        onClick={buttonClicked}
        className="w-full bg-blue-500 h-10 rounded-md text-white hover:bg-blue-600 transition-all"
      >
        Select Contract
      </button>
    </div>
  );
};

export default SelectContractView;
