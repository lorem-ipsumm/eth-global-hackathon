import { canvasWidgetsAtom } from "../utils.ts/atoms";
import { useAtom } from "jotai";

export const useWidgetStyles = () => {
  const [canvasWidgets, setCanvasWidgets] = useAtom(canvasWidgetsAtom);

  const defaultStyles = {
    wrapper: "h-full w-full rounded-sm border border-slate-300",
    baseWidgetStyle: "w-full h-full rounded-sm bg-slate-100",
    label:
      "border-2 border-slate-300 px-2 text-center text-sm flex items-center justify-center overflow-hidden",
    input: "bg-white border border-slate-300 px-2 outline-none",
    button: "select-none !bg-blue-600 text-white font-bold rounded-sm",
    rectangle: "!bg-slate-100 outline-none w-full h-full px-2 rounded-sm",
    text: "bg-slate-400 text-center",
    image: "bg-slate-100 rounded-sm",
  };

  const getDefaultStyles = (widgetType: string) => {
    switch (widgetType) {
      case "label":
        return `${defaultStyles.baseWidgetStyle} ${defaultStyles.label}`;
      case "input":
        return `${defaultStyles.baseWidgetStyle} ${defaultStyles.input}`;
      case "button":
        return `${defaultStyles.baseWidgetStyle} ${defaultStyles.button}`;
      case "text":
        return `${defaultStyles.text}`;
      case "rectangle":
        return `${defaultStyles.rectangle}`;
      case "image":
        return `${defaultStyles.image}`;
      default:
        return "";
    }
  };

  const updateWidgetStyle = (widgetId: string, newStyles: string) => {
    const updatedWidgets = canvasWidgets.map((widgetGroup) =>
      widgetGroup.map((widget) => {
        if (widget.id === widgetId)
          widget.styles = [...widget.styles, newStyles];

        return widget;
      }),
    );
    setCanvasWidgets(updatedWidgets);
  };

  return { defaultStyles, getDefaultStyles, updateWidgetStyle };
};
