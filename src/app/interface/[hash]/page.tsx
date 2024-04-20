"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { BounceLoader, PuffLoader } from "react-spinners";
import ActionsBar from "~/app/components/ActionsBar";
import Canvas from "~/app/editor/Canvas";
import { useContractAbi } from "~/app/hooks/useContractAbi";
import { useWidgetStorage } from "~/app/hooks/useWidgetStorage";
import { activeContractAtom, canvasWidgetsAtom } from "~/app/utils.ts/atoms";

const Page = ({ params }: { params: { hash: string } }) => {
  const [, setCanvasWidgets] = useAtom(canvasWidgetsAtom);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [, setActiveContract] = useAtom(activeContractAtom);
  const storage = useWidgetStorage();
  const { determineContractValidity } = useContractAbi();

  useEffect(() => {
    loadWidgets();
  }, []);

  const loadWidgets = async () => {
    const interfaceData:any = await storage.loadWidgetData(params.hash);
    const widgets = interfaceData.widgets;
    const contractAddress = interfaceData.contractAddress;
    if (widgets) {
      setActiveContract(contractAddress);
      setCanvasWidgets(widgets);
      determineContractValidity(contractAddress);
    }
    setIsPending(false);
  };

  const renderLoader = () => {
    if (isPending)
      return (
        <div className="flex flex-col gap-3 absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <BounceLoader
            size={100}
            color={"#3b82f6"}
            className="animate-pulse"
          />
          <span className="font-bold text-2xl">Loading Interface</span>
        </div> 
      )
    return null;
  }

  return (
    <div className="h-screen w-screen">
      <ActionsBar/>
      <Canvas />
      {renderLoader()}
    </div>
  );
};

export default Page;
