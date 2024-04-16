import { WIDGET_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useWidgetStyles } from "~/app/hooks/useWidgetStyles";

const Label = ({ widgetData }: WIDGET_RENDER_PROPS) => {
  const { getDefaultStyles } = useWidgetStyles();

  return (
    <label
      className={`${getDefaultStyles("label")} ${widgetData.styles.length > 0 ? widgetData.styles.join(" ") : null}`}
    />
  );
};

export default Label;