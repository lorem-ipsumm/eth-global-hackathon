import { canvasComponentsAtom } from "../utils.ts/atoms";
import { useAtom } from "jotai";

export const useComponentStyles = () => {
  const [canvasComponents, setCanvasComponents] = useAtom(canvasComponentsAtom);

  const defaultStyles = {
    baseComponentParant: "h-full w-full rounded-sm bg-slate-100",
    baseComponentStyle: "w-full h-full rounded-sm",
    label: "",
    input: "border-2 border-slate-300 px-2 outline-none",
    button: "select-none",
  };

  const getDefaultStyles = (componentType: string) => {
    switch (componentType) {
      case "label":
        return `${defaultStyles.baseComponentStyle} ${defaultStyles.label}`;
      case "input":
        return `${defaultStyles.baseComponentStyle} ${defaultStyles.input}`;
      case "button":
        return `${defaultStyles.baseComponentStyle} ${defaultStyles.button}`;
      default:
        return "";
    }
  };

  const updateComponentStyle = (componentId: string, newStyles: any) => {
    const updatedComponents = canvasComponents.map((component) => {
      if (component.id === componentId) {
        return { ...component, styles: newStyles };
      }
      return component;
    });
    setCanvasComponents(updatedComponents);
  };

  return { defaultStyles, getDefaultStyles, updateComponentStyle };
};
