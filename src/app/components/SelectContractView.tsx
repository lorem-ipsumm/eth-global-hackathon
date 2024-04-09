import { useAtom } from "jotai";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { activeContractAtom, activeSidebarViewAtom } from "../utils.ts/atoms";
import { useRef, useState } from "react";
import { ethers } from "ethers";
import { useContractAbi } from "../hooks/useContractAbi";
import { BeatLoader } from "react-spinners";

const SelectContractView = () => {
  const [pending, setPending] = useState<boolean>(false);
  const [, setActiveSidebarView] = useAtom(activeSidebarViewAtom);
  const [, setActiveContract] = useAtom(activeContractAtom);

  const [isValidInput, setIsValidInput] = useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const { determineContractValidity } = useContractAbi();

  const buttonClicked = async () => {
    setPending(true);
    if (!ethers.isAddress(inputRef.current!.value) || !inputRef.current) {
      setIsValidInput(false);
      return;
    }

    const isContract = await determineContractValidity(inputRef.current!.value);

    if (isContract) {
      setActiveContract(inputRef.current!.value);
      setActiveSidebarView(1);
    } else {
      setIsValidInput(false);
    }
    setPending(false);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <input
        type="text"
        placeholder="Contract Address"
        className="h-10 w-full rounded-md px-2"
        ref={inputRef}
      />
      <button
        onClick={buttonClicked}
        className="flex h-10 w-full items-center justify-center rounded-md bg-blue-500 text-white transition-all hover:bg-blue-600"
      >
        {pending ? <BeatLoader size={10} color="white" /> : "Select Contract"}
      </button>
      {!isValidInput && (
        <Alert>
          <AlertTitle>Invalid Contract Address</AlertTitle>
          <AlertDescription>
            Please ensure you are entering a valid contract address.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SelectContractView;
