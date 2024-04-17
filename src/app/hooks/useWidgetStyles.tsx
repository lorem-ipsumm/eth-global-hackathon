import { canvasWidgetsAtom } from "../utils.ts/atoms";
import { useAtom } from "jotai";

export const useWidgetStyles = () => {
  const [canvasWidgets, setCanvasWidgets] = useAtom(canvasWidgetsAtom);

  const defaultStyles = {
    baseWidgetParant: "h-full w-full rounded-sm bg-slate-100",
    baseWidgetStyle: "w-full h-full rounded-sm",
    label: "",
    input: "border-2 border-slate-300 px-2 outline-none",
    button: "select-none",
  };

  const getDefaultStyles = (widgetType: string) => {
    switch (widgetType) {
      case "label":
        return `${defaultStyles.baseWidgetStyle} ${defaultStyles.label}`;
      case "input":
        return `${defaultStyles.baseWidgetStyle} ${defaultStyles.input}`;
      case "button":
        return `${defaultStyles.baseWidgetStyle} ${defaultStyles.button}`;
      default:
        return "";
    }
  };

  const updateWidgetStyle = (widgetId: string, newStyles: any) => {
    const updatedWidgets = canvasWidgets.map((widgetGroup) =>
      widgetGroup.map((widget) => {
        if (widget.id === widgetId) {
          return { ...widget, styles: newStyles };
        }
        return widget;
      }),
    );
    setCanvasWidgets(updatedWidgets);
  };

  return { defaultStyles, getDefaultStyles, updateWidgetStyle };
};
