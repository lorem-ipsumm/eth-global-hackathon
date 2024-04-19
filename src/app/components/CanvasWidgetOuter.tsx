import { Rnd } from "react-rnd";
import { useContext, useEffect } from "react";
import { ContractCallPayloadContext } from "../Contexts/ContractCallPayloadProvider";
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

const CanvasWidgetOuter = ({
  widgetData,
  activeWidgets,
  setActiveWidgets,
}: CanvasWidgetProps) => {
  const [canvasWidgets, setCanvasWidgets] = useAtom(canvasWidgetsAtom);
  const { setIsWriteMethod, setMethodName } = useContext(
    ContractCallPayloadContext,
  );

  useEffect(() => {
    setIsWriteMethod(widgetData.isWriteMethod);
  }, [widgetData]);

  const borderStyle = activeWidgets.includes(widgetData.id)
    ? "border-2 border-blue-500"
    : "border-2 border-transparent";

  const { defaultStyles } = useWidgetStyles();

  const deleteWidget = () => {
    const newCanvasWidgets = canvasWidgets.map((widgetGroup) =>
      widgetGroup.filter((widget) => !activeWidgets.includes(widget.id)),
    );

    setCanvasWidgets(newCanvasWidgets);
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
      const updatedWidgets = canvasWidgets.map((widgetGroup) =>
        widgetGroup.map((widget) => {
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
        }),
      );

      setCanvasWidgets(updatedWidgets);
    }
  };

  const setWidgetType = () => {
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
      canvasWidgets.map((widgetGroup) =>
        widgetGroup.map((widget) =>
          widget.id === widgetData.id ? updatedWidget : widget,
        ),
      ),
    );
  };

  const handleResizeStop = (e: any, direction: any, ref: any, delta: any) => {
    let x = widgetData.position.x;
    let y = widgetData.position.y;
    // update x and y position based on the direction and delta
    if (direction.includes("right")) {
      x = widgetData.position.x;
    } else if (direction.includes("left")) {
      x = widgetData.position.x - delta.width;
    }
    if (direction.includes("bottom")) {
      y = widgetData.position.y;
    } else if (direction.includes("top")) {
      y = widgetData.position.y - delta.height;
    }
    const updatedWidget = {
      ...widgetData,
      position: {
        x,
        y,
      },
      size: {
        width: ref.style.width,
        height: ref.style.height,
      },
    };
    setCanvasWidgets(
      canvasWidgets.map((widgetGroup) =>
        widgetGroup.map((widget) =>
          widget.id === widgetData.id ? updatedWidget : widget,
        ),
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
      onMouseDown={() => setActiveWidgets([...activeWidgets, widgetData.id])}
      onResize={() => setActiveWidgets([...activeWidgets, widgetData.id])}
      onResizeStop={handleResizeStop}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className={defaultStyles.baseWidgetParant}>
            {setWidgetType()}
          </div>
        </ContextMenuTrigger>
        {renderContextMenuContent()}
      </ContextMenu>
    </Rnd>
  );
};

export default CanvasWidgetOuter;
