import { WIDGET_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useWidgetStyles } from "~/app/hooks/useWidgetStyles";
import { useRef, useState } from "react";
import { findWidgetById } from "~/app/utils.ts/utils";
import { useAtom } from "jotai";
import { canvasWidgetsAtom } from "~/app/utils.ts/atoms";
import { Edit, Image as ImageIcon } from "react-feather";

const Image = ({ widgetData }: WIDGET_RENDER_PROPS) => {
  const [canvasWidgets, setCanvasWidgets] = useAtom(canvasWidgetsAtom);
  const { getDefaultStyles } = useWidgetStyles();

  const [imgSrc, setImgSrc] = useState<string | null>(
    (widgetData.defaultValue as string) || null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const selectImage = (event: any) => {
    const file = event?.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = (e: any) => {
      const imgSrc = e.target.result;
      const selectedWidget = findWidgetById(widgetData.id, canvasWidgets);
      if (!selectedWidget) return;
      const newProps = {
        ...selectedWidget,
        defaultValue: imgSrc,
      };
      // update widgets atom
      const newWidgets: any = canvasWidgets.map((widgetRow) => {
        return widgetRow.map((widget) => {
          if (widget.id === selectedWidget.id) {
            return newProps;
          }
          return widget;
        });
      });
      setCanvasWidgets(newWidgets);
      setImgSrc(imgSrc);
    };
    reader.readAsDataURL(file);
  };

  const renderImage = () => {
    if (imgSrc) {
      return (
        <img
          className="h-full w-full select-none object-cover"
          ref={imageRef}
          src={imgSrc}
        />
      );
    } else {
      return (
        <ImageIcon
          size={15}
          className="h-full w-full stroke-1 text-slate-300"
        />
      );
    }
  };

  const renderOptions = () => {
    return (
      <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 px-2">
        <Edit className="text-white" onClick={handleClick} />
      </div>
    );
  };

  return (
    <div
      className={`relative h-full w-full ${getDefaultStyles("image")} ${widgetData.styles.length > 0 ? widgetData.styles.join(" ") : null}`}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={selectImage}
        className="hidden"
      />
      {renderImage()}
      {renderOptions()}
    </div>
  );
};

export default Image;
