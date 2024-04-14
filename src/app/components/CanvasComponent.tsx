import { Rnd } from "react-rnd";
import { COMPONENT } from "../utils.ts/interfaces";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { Trash } from "react-feather";
import { canvasComponentsAtom } from "../utils.ts/atoms";
import { useAtom } from "jotai";
import Input from "./CanvasComponents/Input";
import Button from "./CanvasComponents/Button";
import Label from "./CanvasComponents/Label";
import Wrapper from "./CanvasComponents/Wrapper";

interface CanvasComponentProps {
  componentData: COMPONENT;
  activeComponents: string[];
  setActiveComponents: Function;
}

const CanvasComponent = ({
  componentData,
  activeComponents,
  setActiveComponents,
}: CanvasComponentProps) => {
  const [canvasComponents, setCanvasComponents] = useAtom(canvasComponentsAtom);

  const borderStyle = activeComponents.includes(componentData.id)
    ? "border-2 border-blue-500"
    : "border-2 border-transparent";

  const deleteComponent = () => {
    // delete the component from the canvas
    const component = canvasComponents.find(
      (component) => component.id === componentData.id,
    );
    if (component)
      setCanvasComponents(
        canvasComponents.filter((c) => c.id !== componentData.id),
      );
    setActiveComponents([]);
  };

  const renderContextMenuContent = () => {
    return (
      <ContextMenuContent>
        <ContextMenuItem onClick={deleteComponent}>
          <Trash className="mr-2 h-4 w-4 stroke-red-500" />
          Delete Component
        </ContextMenuItem>
      </ContextMenuContent>
    );
  };

  // move any children components with the parent
  const handleDrag = (e: any) => {
    const children = componentData.children.map((child) => child.id);
    const movementX = e.movementX;
    const movementY = e.movementY;

    // move all selected components
    if (children.length > 0) {
      const updatedComponents = canvasComponents.map((component) => {
        if (children.includes(component.id)) {
          return {
            ...component,
            position: {
              x: component.position.x + movementX,
              y: component.position.y + movementY,
            },
          };
        }
        return component;
      });

      setCanvasComponents(updatedComponents);
    }
  };

  const renderComponent = () => {
    if (componentData.type === "input") {
      return <Input componentData={componentData} />;
    }
    if (componentData.type === "label") {
      return <Label componentData={componentData} />;
    }
    if (componentData.type === "button") {
      return <Button componentData={componentData} />;
    }
    if (componentData.type === "wrapper") {
      return <Wrapper componentData={componentData} />;
    }
  };

  // update the component position on drag stop
  const handleDragStop = (e: any, d: any) => {
    const { lastX, lastY } = d;
    // update the component position
    const updatedComponent = {
      ...componentData,
      position: {
        x: lastX,
        y: lastY,
      },
    };
    // update the component in the canvas components
    setCanvasComponents(
      canvasComponents.map((component) =>
        component.id === componentData.id ? updatedComponent : component,
      ),
    );
  };


  return (
    <Rnd
      default={{
        x: componentData.position.x,
        y: componentData.position.y,
        width: componentData.size.width,
        height: componentData.size.height,
      }}
      bounds={"parent"}
      resizeGrid={[25, 25]}
      dragGrid={[25, 25]}
      className={`${borderStyle} rounded-sm transition-[border]`}
      onMouseDown={() => setActiveComponents([componentData.id])}
      onResize={() => setActiveComponents([componentData.id])}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="h-full w-full rounded-sm bg-slate-100">
            {renderComponent()}
          </div>
        </ContextMenuTrigger>
        {renderContextMenuContent()}
      </ContextMenu>
    </Rnd>
  );
};

export default CanvasComponent;
