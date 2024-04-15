import { ABI_METHOD, COMPONENT } from "../utils.ts/interfaces";
import { canvasComponentsAtom } from "../utils.ts/atoms";
import { useAtom } from "jotai";

export const useCanvasWidget = () => {
  const [canvasComponents, setCanvasComponents] = useAtom(canvasComponentsAtom);

  const isWriteMethod = (methodData: ABI_METHOD) => {
    return (
      methodData.stateMutability === "payable" ||
      methodData.stateMutability === "nonpayable"
    );
  };

  const positionWidgetGrouping = (startingY: number, children: COMPONENT[]) => {
    children.forEach((child) => {
      child.position = { x: 0, y: startingY };
      startingY += 50;
    });
  };

  const repositionComponents = (components: COMPONENT[]) => {
    const startingPosition = { x: 0, y: 0 };

    if (canvasComponents.length > 0) {
      while (true) {
        const isOccupied = canvasComponents.some(
          (component) =>
            component.position.x === startingPosition.x ||
            component.position.y === startingPosition.y,
        );

        if (!isOccupied) {
          positionWidgetGrouping(startingPosition.y, components);
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
      positionWidgetGrouping(0, components);
    }
  };

  const createCanvasWidget = (methodData: ABI_METHOD) => {
    let newComponents: COMPONENT[] = [];
    let children: COMPONENT[] = [];
    let length = newComponents.length;

    const isReadMethod = !isWriteMethod(methodData);

    // create new component
    const parentComponent: COMPONENT = {
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
        parent: parentComponent.id,
        children: [],
      });
      newComponents = [...children];
    });

    // if it's a write method add a button
    if (!isReadMethod) {
      const component: COMPONENT = {
        id: `button_${methodData.name}_${length++}`,
        type: "button",
        text: "Submit",
        position: { x: 0, y: 0 },
        size: { width: 100, height: 50 },
        styles: [],
        data: methodData,
        parent: parentComponent.id,
        children: [],
      };
      children.push(component);
      newComponents = [...children];
    }

    parentComponent.children = children;
    newComponents = [parentComponent, ...newComponents];
    repositionComponents(newComponents);
    setCanvasComponents([...canvasComponents, ...newComponents]);
  };

  return { createCanvasWidget };
};
