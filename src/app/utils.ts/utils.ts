import { WIDGET } from "./interfaces";

export const findWidgetById = (
  id: string,
  widgets: WIDGET[][],
): WIDGET | undefined => {
  for (const widgetRow of widgets) {
    const foundWidget = widgetRow.find((widget) => widget.id === id);
    if (foundWidget) {
      return foundWidget;
    }
  }
  return undefined;
};
