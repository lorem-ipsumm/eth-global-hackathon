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

  const positionWidgetGrouping = (
    parentXCoort: number,
    yCoord: number,
    newWidgets: WIDGET[],
  ) => {
    newWidgets.forEach((widget) => {
      if (widget.type === "input") {
        widget.position = { x: parentXCoort + 25, y: yCoord + 25 };
        yCoord += 50;
      } else if (widget.type === "label" || widget.type === "button") {
        widget.position = { x: parentXCoort + 100, y: yCoord + 25 };
        yCoord += 50;
      } else {
        widget.position = { x: parentXCoort, y: yCoord };
      }
    });
  };

  const getUnoccupiedCoordinatesForWrapper = () => {
    const startingPosition = { parentX: 0, parentY: 0 };

    const parentWidgets = getCanvasWrapperWidgets();

    if (getTotalWidgetCount() > 0) {
      parentWidgets.forEach((parentWidget) => {
        const parentWidgetArea =
          parentWidget!.size.width * parentWidget!.size.height;
        while (
          startingPosition.parentX === parentWidget!.position.x &&
          startingPosition.parentX <=
            parentWidget!.position.x + parentWidgetArea &&
          startingPosition.parentY === parentWidget!.position.y &&
          startingPosition.parentY <=
            parentWidget!.position.y + parentWidgetArea
        ) {
          startingPosition.parentX += 50;
          startingPosition.parentY += 50;

          if (startingPosition.parentX > window.innerWidth) {
            startingPosition.parentX = 0;
            startingPosition.parentY += 50;
          }
        }
      });
    }
    return startingPosition;
  };

  const getTotalWidgetCount = () => {
    return canvasWidgets.reduce((acc, curr) => acc + curr.length, 0);
  };

  const getCanvasWrapperWidgets = () => {
    return canvasWidgets.map((widgetGroup) => widgetGroup[0]).filter(Boolean);
  };

  const createCanvasWidget = (methodData: ABI_METHOD) => {
    let newWidgets: WIDGET[] = [];
    let children: WIDGET[] = [];
    let length = getTotalWidgetCount();

    const isReadMethod = !isWriteMethod(methodData);

    // create new parent/wrapper widget
    const parentWidget: WIDGET = {
      id: `wrapper_${methodData.name}_${length++}`,
      type: "wrapper",
      position: { x: 0, y: 0 },
      size: { width: 250, height: 50 },
      styles: [],
      data: methodData,
      isWriteMethod: isWriteMethod(methodData),
      children: [],
    };

    // if there are params add them as children
    methodData.inputs.forEach((param) => {
      children.push({
        id: `input_${param.name}_${length++}`,
        type: "input",
        position: { x: 0, y: 0 },
        size: { width: 250, height: 50 },
        styles: [],
        data: methodData,
        isWriteMethod: isWriteMethod(methodData),
        parent: parentWidget.id,
        children: [],
        placeholder: param.name,
      });
      newWidgets = [...children];
    });

    methodData.outputs.forEach((returnVal) => {
      children.push({
        id: `label_${returnVal.name}_${length++}`,
        type: "label",
        position: { x: 0, y: 0 },
        size: { width: 100, height: 50 },
        styles: [],
        data: methodData,
        isWriteMethod: isWriteMethod(methodData),
        externalValue: null,
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
        isWriteMethod: isWriteMethod(methodData),
        parent: parentWidget.id,
        children: [],
      };
      children.push(widget);
      newWidgets = [...children];
    }

    parentWidget.size.height = (newWidgets.length + 1) * 50;
    parentWidget.size.width += 50;
    parentWidget.children = children;
    newWidgets = [parentWidget, ...newWidgets];

    const { parentX, parentY } = getUnoccupiedCoordinatesForWrapper();

    positionWidgetGrouping(parentX, parentY, newWidgets);

    setCanvasWidgets([...canvasWidgets, newWidgets]);
  };

  return { createCanvasWidget, getTotalWidgetCount, getCanvasWrapperWidgets };
};
