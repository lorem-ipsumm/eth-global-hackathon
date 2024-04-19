import { WIDGET_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useWidgetStyles } from "~/app/hooks/useWidgetStyles";

const Rectangle = ({ widgetData }: WIDGET_RENDER_PROPS) => {

  const { getDefaultStyles } = useWidgetStyles();

  return (
    <div
      className={`${getDefaultStyles("rectangle")} ${widgetData.styles.length > 0 ? widgetData.styles.join(" ") : null}`}
    />
  );
};

export default Rectangle;