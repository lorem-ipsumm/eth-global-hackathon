"use client";
import { useAtom } from "jotai";
import { canvasComponentsAtom } from "../utils.ts/atoms";
import CanvasComponent from "../components/CanvasComponent";
import { useEffect, useRef, useState } from "react";
import SelectionArea from "../components/SelectionArea";

const Canvas = () => {
  const [canvasComponents, setCanvasComponents] = useAtom(canvasComponentsAtom);
  const [activeComponents, setActiveComponents] = useState<string[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  // use ref for the handleDelete function
  const activeComponentsRef = useRef(activeComponents);
  useEffect(() => {
    activeComponentsRef.current = activeComponents;
  }, [activeComponents]);

  useEffect(() => {
    // add a key listener for the delete key
    const handleDelete = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        const updatedComponents = canvasComponents.filter((component) => {
          return !activeComponentsRef.current.includes(component.id);
        });
        setActiveComponents([]);
        setCanvasComponents(updatedComponents);
      }
    };
    window.addEventListener("keydown", handleDelete);
    return () => window.removeEventListener("keydown", handleDelete);
  }, []);

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
