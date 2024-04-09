"use client";
import { useAtom } from "jotai";
import { canvasComponentsAtom } from "../utils.ts/atoms";
import CanvasComponent from "../components/CanvasComponent";
import { useEffect, useRef, useState } from "react";
import SelectionArea from "../components/SelectionArea";

const Canvas = () => {
  const [canvasComponents] = useAtom(canvasComponentsAtom);
  const [activeComponents, setActiveComponents] = useState<string[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const renderComponents = () => {
    return canvasComponents.map((component) => {
      return (
        <CanvasComponent
          key={component.id}
          componentData={component}
          activeComponents={activeComponents}
          setActiveComponents={setActiveComponents}
        />
      );
    });
  };

  return (
    <div className="h-full w-4/5" ref={canvasRef}>
      {renderComponents()}
      <SelectionArea
        canvasRef={canvasRef}
        setActiveComponents={setActiveComponents}
      />
    </div>
  );
};

export default Canvas;
