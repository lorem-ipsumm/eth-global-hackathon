"use client";
import { useAtom } from "jotai";
import { PlusCircle } from "lucide-react";
import { HelpCircle } from "react-feather";
import { activeWidgetsAtom, canvasWidgetsAtom } from "../utils.ts/atoms";
import { WIDGET } from "../utils.ts/interfaces";
import { useEffect, useState } from "react";
import { findWidgetById } from "../utils.ts/utils";
import { Button } from "~/components/ui/button";
import { useWidgetStyles } from "../hooks/useWidgetStyles";

const MiscellaneousView = () => {
  const [activeWidgets] = useAtom(activeWidgetsAtom);
  const [canvasWidgets, setCanvasWidgets] = useAtom(canvasWidgetsAtom);

  const [defaultValue, setDefaultValue] = useState<string>("");
  const [customCSS, setCustomCSS] = useState<string>("");

  const { updateWidgetStyle } = useWidgetStyles();

  useEffect(() => {
    if (activeWidgets.length === 0) {
      setDefaultValue("");
      setCustomCSS("");
      return;
    }
    const currentWidget = activeWidgets[0];
    if (!currentWidget) return;
    const widget = findWidgetById(currentWidget, canvasWidgets);
    if (!widget) return;
    setDefaultValue(widget?.defaultValue || "");
  }, [activeWidgets]);

  const sectionTitle = (title: string) => {
    return <h3 className="mb-2 text-lg font-semibold">{title}</h3>;
  };

  const handleUpdateCss = () => {
    const activeWidgetId = activeWidgets[0];
    if (!activeWidgetId) return;
    console.log("handleUpdateCss", customCSS);
    updateWidgetStyle(activeWidgetId, customCSS);
  };

  const handleCustomCSSChange = (newCustomCSS: string) => {
    setCustomCSS(newCustomCSS);
  };

  const renderWidgetProps = () => {
    const onDefaultValueChange = (e: any) => {
      const activeWidget = activeWidgets[0];
      if (!activeWidget) return;
      setDefaultValue(e);
      const widget = findWidgetById(activeWidget, canvasWidgets);
      // widget?.defaultValue = e;
      const newProps = {
        ...widget,
        defaultValue: e,
      };
      // update widgets atom
      const newWidgets: any = canvasWidgets.map((widgetRow) => {
        return widgetRow.map((widget) => {
          if (widget.id === activeWidget) {
            return newProps;
          }
          return widget;
        });
      });
      setCanvasWidgets(newWidgets);
    };

    const prop = (label: string, value: string, onChange: Function) => {
      return (
        <div className="flex flex-col">
          <label className="mb-1 flex items-center gap-1 text-sm">
            {label}
            <HelpCircle size={12} className="text-blue-700" />
          </label>
          <input
            value={value}
            className="h-10 rounded-sm border border-gray-300 p-1 px-2"
            onChange={(e) => onChange(e.target.value)}
          />
          {label === "Custom CSS" && (
            <Button onClick={handleUpdateCss}>Apply</Button>
          )}
        </div>
      );
    };
    return (
      <div>
        {sectionTitle("Widget Props")}
        <div className="flex flex-col gap-2">
          {prop("Default Value", defaultValue, onDefaultValueChange)}
          {prop("Custom CSS", customCSS, handleCustomCSSChange)}
        </div>
      </div>
    );
  };

  const addMiscellaneousComponent = (type: string) => {
    if (type === "Text") {
      // create new text widget
      const textWidget: WIDGET = {
        id: `text_${length++}`,
        type: "text",
        position: { x: 0, y: 0 },
        size: { width: 250, height: 50 },
        styles: [],
        data: undefined,
        isWriteMethod: true,
        defaultValue: "text",
        children: [],
      };
      setCanvasWidgets([...canvasWidgets, [textWidget]]);
    } else if (type === "Rectangle") {
      // create new rectangle widget
      const rectangleWidget: WIDGET = {
        id: `rectangle_${length++}`,
        type: "rectangle",
        position: { x: 0, y: 0 },
        size: { width: 250, height: 50 },
        styles: [],
        data: undefined,
        isWriteMethod: true,
        children: [],
      };
      setCanvasWidgets([...canvasWidgets, [rectangleWidget]]);
    } else if (type === "Image") {
      // create new image widget
      const imageWidget: WIDGET = {
        id: `image_${length++}`,
        type: "image",
        position: { x: 0, y: 0 },
        size: { width: 250, height: 50 },
        styles: [],
        data: undefined,
        isWriteMethod: true,
        children: [],
      };
      setCanvasWidgets([...canvasWidgets, [imageWidget]]);
    }
  };

  const renderMiscellaneousComponents = () => {
    const prop = (title: string) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-3 rounded-sm p-2 transition-all hover:bg-slate-300"
          onClick={() => addMiscellaneousComponent(title)}
        >
          <PlusCircle size={15} />
          <span className="font-bold">{title}</span>
        </div>
      );
    };

    return (
      <div>
        {sectionTitle("Miscellaneous Components")}
        {prop("Text")}
        {prop("Rectangle")}
        {prop("Image")}
      </div>
    );
  };

  const renderDivider = () => {
    return <div className="my-4 h-0.5 w-full bg-gray-300" />;
  };

  return (
    <div className="flex h-full w-full flex-col pt-3">
      {renderWidgetProps()}
      {renderDivider()}
      {renderMiscellaneousComponents()}
      {renderDivider()}
    </div>
  );
};

export default MiscellaneousView;
