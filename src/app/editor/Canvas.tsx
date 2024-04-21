"use client";
import { useAtom } from "jotai";
import { activeWidgetsAtom, canvasWidgetsAtom } from "../utils.ts/atoms";
import CanvasWidgetOuter from "../components/CanvasWidgetOuter";
import { useEffect, useRef, useState } from "react";
import SelectionArea from "../components/SelectionArea";
import { ContractCallPayloadProvider } from "../Contexts/ContractCallPayloadProvider";
import { usePathname } from "next/navigation";
import { Toaster } from "~/components/ui/toaster";

const Canvas = () => {
  const [canvasWidgets, setCanvasWidgets] = useAtom(canvasWidgetsAtom);
  const [activeWidgets, setActiveWidgets] = useAtom(activeWidgetsAtom);
  const canvasRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // create key listener for delete key
    // to delete active widgets
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        deleteWidgets();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const deleteWidgets = () => {
    const newCanvasWidgets = canvasWidgets.map((widgetGroup) =>
      widgetGroup.filter((widget) => !activeWidgets.includes(widget.id)),
    );
    setCanvasWidgets(newCanvasWidgets);
    setActiveWidgets([]);
  };


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
      <Toaster/>
      {renderWidgets()}
      {renderSelectionArea()}
    </div>
  );
};

export default Canvas;
