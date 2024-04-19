"use client";
import { useAtom } from "jotai";
import { activeWidgetsAtom, canvasWidgetsAtom } from "../utils.ts/atoms";
import CanvasWidgetOuter from "../components/CanvasWidgetOuter";
import { useRef, useState } from "react";
import SelectionArea from "../components/SelectionArea";
import { ContractCallPayloadProvider } from "../Contexts/ContractCallPayloadProvider";
import { usePathname } from "next/navigation";

const Canvas = () => {
  const [canvasWidgets] = useAtom(canvasWidgetsAtom);
  const [activeWidgets, setActiveWidgets] = useAtom(activeWidgetsAtom);
  const canvasRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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

  const renderSelectionArea = () => {
    if (pathname === "/editor") {
      return (
        <SelectionArea
          canvasRef={canvasRef}
          setActiveWidgets={setActiveWidgets}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className="h-full w-4/5" ref={canvasRef}>
      {renderWidgets()}
      {renderSelectionArea()}
    </div>
  );
};

export default Canvas;
