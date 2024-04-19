import { WIDGET_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useWidgetStyles } from "~/app/hooks/useWidgetStyles";
import { useState } from "react";
import { findWidgetById } from "~/app/utils.ts/utils";
import { canvasWidgetsAtom } from "~/app/utils.ts/atoms";
import { useAtom } from "jotai";

const Text = ({ widgetData }: WIDGET_RENDER_PROPS) => {

  const { getDefaultStyles } = useWidgetStyles();
  const [value, setValue] = useState<string>((widgetData.defaultValue as string) || "");
  const [canvasWidgets, setCanvasWidgets] = useAtom(canvasWidgetsAtom);

  const style = "bg-transparent outline-none w-full h-full px-2";

  const inputChanged = (e: any) => {
    setValue(e.target.value);
    const selectedWidget = findWidgetById(widgetData.id, canvasWidgets);
    if (!selectedWidget) return;
    const newProps = {
      ...selectedWidget,
      defaultValue: e.target.value,
    }
    // update widgets atom
    const newWidgets:any = canvasWidgets.map(widgetRow => {
      return widgetRow.map(widget => {
        if (widget.id === selectedWidget.id) {
          return newProps;
        }
        return widget;
      });
    });
    setCanvasWidgets(newWidgets);
  }

  return (
    <input
      className={`${style} ${getDefaultStyles("text")} ${widgetData.styles.length > 0 ? widgetData.styles.join(" ") : null}`}
      value={value}
      onChange={inputChanged}
    />
  );
};

export default Text;
