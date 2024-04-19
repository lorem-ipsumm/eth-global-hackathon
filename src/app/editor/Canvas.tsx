"use client";
import { useAtom } from "jotai";
import { canvasWidgetsAtom } from "../utils.ts/atoms";
import CanvasWidgetOuter from "../components/CanvasWidgetOuter";
import { useRef, useState } from "react";
import SelectionArea from "../components/SelectionArea";
import { ContractCallPayloadProvider } from "../Contexts/ContractCallPayloadProvider";

const Canvas = () => {
  const [canvasWidgets] = useAtom(canvasWidgetsAtom);
  const [activeWidgets, setActiveWidgets] = useState<string[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const renderWidgets = () => {
    return canvasWidgets.map((widgetGroup, groupIndex) => (
      <ContractCallPayloadProvider key={groupIndex}>
        {widgetGroup.map((widget) => (
          <CanvasWidgetOuter
            key={widget.id}
            widgetData={widget}
            activeWidgets={activeWidgets}
            setActiveWidgets={setActiveWidgets}
          />
        ))}
      </ContractCallPayloadProvider>
    ));
  };

  return (
    <div className="h-full w-4/5" ref={canvasRef}>
      {renderWidgets()}
      <SelectionArea
        canvasRef={canvasRef}
        activeWidgets={activeWidgets}
        setActiveWidgets={setActiveWidgets}
      />
    </div>
  );
};

export default Canvas;
