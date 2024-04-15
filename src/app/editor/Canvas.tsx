"use client";
import { useAtom } from "jotai";
import { canvasWidgetsAtom } from "../utils.ts/atoms";
import CanvasWidgetParent from "../components/CanvasWidgetParent";
import { useRef, useState } from "react";
import SelectionArea from "../components/SelectionArea";

const Canvas = () => {
  const [canvasWidgets] = useAtom(canvasWidgetsAtom);
  const [activeWidgets, setActiveWidgets] = useState<string[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const renderWidgets = () => {
    return canvasWidgets.map((widget) => {
      return (
        <CanvasWidgetParent
          key={widget.id}
          widgetData={widget}
          activeWidgets={activeWidgets}
          setActiveWidgets={setActiveWidgets}
        />
      );
    });
  };

  return (
    <div className="h-full w-4/5" ref={canvasRef}>
      {renderWidgets()}
      <SelectionArea
        canvasRef={canvasRef}
        setActiveWidgets={setActiveWidgets}
      />
    </div>
  );
};

export default Canvas;
