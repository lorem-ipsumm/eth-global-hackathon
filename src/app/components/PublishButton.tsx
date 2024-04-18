"use client";
import { useAtom } from "jotai";
import { useWidgetStorage } from "../hooks/useWidgetStorage";
import { canvasWidgetsAtom } from "../utils.ts/atoms";

const PublishButton = () => {

  const [canvasWidgets] = useAtom(canvasWidgetsAtom);

  const storage = useWidgetStorage();

  const submitClicked = async () => {
    const response = await storage.uploadWidgetData(canvasWidgets);
    console.log(response);
  }

  return (
    <button 
      className="absolute bottom-3 left-3 bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
      onClick={submitClicked}
    >
      Publish Interface
    </button>
  );
};

export default PublishButton;
