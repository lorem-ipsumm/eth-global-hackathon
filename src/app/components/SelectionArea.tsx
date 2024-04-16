import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { canvasWidgetsAtom } from "../utils.ts/atoms";

interface SELECTION_AREA {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PROPS {
  canvasRef: any;
  setActiveWidgets: Function;
}

const SelectionArea = ({ canvasRef, setActiveWidgets }: PROPS) => {
  const [canvasWidgets] = useAtom(canvasWidgetsAtom);
  const [selectionArea, setSelectionArea] = useState<SELECTION_AREA | null>(
    null,
  );

  useEffect(() => {
    const handleMouseDown = (e: any) => {
      // don't enable selection if the user is clicking on a widget
      if (e.target !== canvasRef.current) return;
      setSelectionArea({ x: e.clientX, y: e.clientY, width: 0, height: 0 });
    };

    const handleMouseMove = (e: any) => {
      if (selectionArea) {
        setSelectionArea((prev: any) => ({
          ...prev,
          width: e.clientX - prev.x,
          height: e.clientY - prev.y,
        }));
      }
    };

    const handleMouseUp = () => {
      // Here you can check which widget are within the selection area
      // and mark them as selected.
      if (selectionArea) {
        const selectedWidgets = canvasWidgets.flatMap((widgetGroup) =>
          widgetGroup.filter((widget) => {
            const element = document.getElementById(widget.id);
            if (!element) return false;
            const rect = element.getBoundingClientRect();
            const elementX = rect.left;
            const elementY = rect.top;
            const inXRange =
              elementX >= selectionArea.x &&
              elementX <= selectionArea.x + selectionArea.width;
            const inYRange =
              elementY >= selectionArea.y &&
              elementY <= selectionArea.y + selectionArea.height;
            return inXRange && inYRange;
          }),
        );

        setActiveWidgets(selectedWidgets.map((widget) => widget.id));
      }

      // Clear the selection area
      setSelectionArea(null);
    };

    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    canvasElement.addEventListener("mousedown", handleMouseDown);
    canvasElement.addEventListener("mousemove", handleMouseMove);
    canvasElement.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvasElement.removeEventListener("mousedown", handleMouseDown);
      canvasElement.removeEventListener("mousemove", handleMouseMove);
      canvasElement.removeEventListener("mouseup", handleMouseUp);
    };
  }, [selectionArea]);

  // Render the selection area
  const selectionStyle: any = selectionArea
    ? {
        position: "absolute",
        left: `${selectionArea.x}px`,
        top: `${selectionArea.y}px`,
        width: `${selectionArea.width}px`,
        height: `${selectionArea.height}px`,
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        borderRadius: "4px",
        border: "1px solid rgba(0, 0, 255, 0.3)",
      }
    : {};

  return <div style={selectionStyle} />;
};

export default SelectionArea;
