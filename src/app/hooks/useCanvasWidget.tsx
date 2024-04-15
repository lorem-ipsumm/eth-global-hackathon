import { ABI_METHOD, WIDGET } from "../utils.ts/interfaces";
import { canvasWidgetsAtom } from "../utils.ts/atoms";
import { useAtom } from "jotai";

export const useCanvasWidget = () => {
  const [canvasWidgets, setCanvasWidgets] = useAtom(canvasWidgetsAtom);

  const isWriteMethod = (methodData: ABI_METHOD) => {
    return (
      methodData.stateMutability === "payable" ||
      methodData.stateMutability === "nonpayable"
    );
  };

  const positionWidgetGrouping = (startingY: number, children: WIDGET[]) => {
    children.forEach((child) => {
      child.position = { x: 0, y: startingY };
      startingY += 50;
    });
  };

  const repositionWidgets = (widgets: WIDGET[]) => {
    const startingPosition = { x: 0, y: 0 };

    if (canvasWidgets.length > 0) {
      while (true) {
        const isOccupied = canvasWidgets.some(
          (widget) =>
            widget.position.x === startingPosition.x ||
            widget.position.y === startingPosition.y,
        );

        if (!isOccupied) {
          positionWidgetGrouping(startingPosition.y, widgets);
          break;
        }

        startingPosition.x += 50;
        startingPosition.y += 50;

        if (startingPosition.x > window.innerWidth) {
          startingPosition.x = 0;
          startingPosition.y += 50;
        }
      }
    } else {
      positionWidgetGrouping(0, widgets);
    }
  };

  const createCanvasWidget = (methodData: ABI_METHOD) => {
    let newWidgets: WIDGET[] = [];
    let children: WIDGET[] = [];
    let length = newWidgets.length;

    const isReadMethod = !isWriteMethod(methodData);

    // create new parent/wrapper widget
    const parentWidget: WIDGET = {
      id: `wrapper_${methodData.name}_${length++}`,
      type: "wrapper",
      position: { x: 0, y: 0 },
      size: { width: 100, height: 50 },
      styles: [],
      data: methodData,
      children: [],
    };

    // if there are params add them as children
    methodData.inputs.forEach((param) => {
      children.push({
        id: `input_${param.name}_${length++}`,
        type: "input",
        position: { x: 0, y: 0 },
        size: { width: 100, height: 50 },
        styles: [],
        data: param,
        parent: parentWidget.id,
        children: [],
      });
      newWidgets = [...children];
    });

    // if it's a write method add a button
    if (!isReadMethod) {
      const widget: WIDGET = {
        id: `button_${methodData.name}_${length++}`,
        type: "button",
        text: "Submit",
        position: { x: 0, y: 0 },
        size: { width: 100, height: 50 },
        styles: [],
        data: methodData,
        parent: parentWidget.id,
        children: [],
      };
      children.push(widget);
      newWidgets = [...children];
    }

    parentWidget.children = children;
    newWidgets = [parentWidget, ...newWidgets];
    repositionWidgets(newWidgets);
    setCanvasWidgets([...canvasWidgets, ...newWidgets]);
  };

  return { createCanvasWidget };
};
