import { Rnd } from "react-rnd";
import { WIDGET } from "../utils.ts/interfaces";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { Trash } from "react-feather";
import { canvasWidgetsAtom } from "../utils.ts/atoms";
import { useAtom } from "jotai";
import Input from "./CanvasWidgets/Input";
import Button from "./CanvasWidgets/Button";
import Label from "./CanvasWidgets/Label";
import { useWidgetStyles } from "../hooks/useWidgetStyles";

interface CanvasWidgetProps {
  widgetData: WIDGET;
  activeWidgets: string[];
  setActiveWidgets: Function;
}

const CanvasWidget = ({
  widgetData,
  activeWidgets,
  setActiveWidgets,
}: CanvasWidgetProps) => {
  const [canvasWidgets, setCanvasWidgets] = useAtom(canvasWidgetsAtom);

  const borderStyle = activeWidgets.includes(widgetData.id)
    ? "border-2 border-blue-500"
    : "border-2 border-transparent";

  const { defaultStyles } = useWidgetStyles();

  const deleteWidget = () => {
    const widget = canvasWidgets.find((widget) => widget.id === widgetData.id);
    if (widget)
      setCanvasWidgets(canvasWidgets.filter((w) => w.id !== widgetData.id));
    setActiveWidgets([]);
  };

  const renderContextMenuContent = () => {
    return (
      <ContextMenuContent>
        <ContextMenuItem onClick={deleteWidget}>
          <Trash className="mr-2 h-4 w-4 stroke-red-500" />
          Delete Widget
        </ContextMenuItem>
      </ContextMenuContent>
    );
  };

  const handleDrag = (e: any) => {
    const children = widgetData.children.map((child) => child.id);
    const movementX = e.movementX;
    const movementY = e.movementY;

    if (children.length > 0) {
      const updatedWidgets = canvasWidgets.map((widget) => {
        if (children.includes(widget.id)) {
          return {
            ...widget,
            position: {
              x: widget.position.x + movementX,
              y: widget.position.y + movementY,
            },
          };
        }
        return widget;
      });

      setCanvasWidgets(updatedWidgets);
    }
  };

  const renderWidget = () => {
    if (widgetData.type === "input") {
      return <Input widgetData={widgetData} />;
    }
    if (widgetData.type === "label") {
      return <Label widgetData={widgetData} />;
    }
    if (widgetData.type === "button") {
      return <Button widgetData={widgetData} />;
    }
  };

  const handleDragStop = (e: any, d: any) => {
    const { lastX, lastY } = d;
    const updatedWidget = {
      ...widgetData,
      position: {
        x: lastX,
        y: lastY,
      },
    };
    setCanvasWidgets(
      canvasWidgets.map((widget) =>
        widget.id === widgetData.id ? updatedWidget : widget,
      ),
    );
  };

  return (
    <Rnd
      default={{
        x: widgetData.position.x,
        y: widgetData.position.y,
        width: widgetData.size.width,
        height: widgetData.size.height,
      }}
      bounds={"parent"}
      resizeGrid={[25, 25]}
      dragGrid={[25, 25]}
      className={`${borderStyle} rounded-sm transition-[border]`}
      id={widgetData.id}
      onMouseDown={() => setActiveWidgets([widgetData.id])}
      onResize={() => setActiveWidgets([widgetData.id])}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className={defaultStyles.baseWidgetParant}>{renderWidget()}</div>
        </ContextMenuTrigger>
        {renderContextMenuContent()}
      </ContextMenu>
    </Rnd>
  );
};

export default CanvasWidget;
