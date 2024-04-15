import { WIDGET_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useWidgetStyles } from "~/app/hooks/useWidgetStyles";

const Input = ({ widgetData }: WIDGET_RENDER_PROPS) => {
  const { getDefaultStyles } = useWidgetStyles();

  return (
    <input
      className={`${getDefaultStyles("input")} ${widgetData.styles.length > 0 ? widgetData.styles.join(" ") : null}`}
      placeholder={widgetData.placeholder || ""}
    />
  );
};

export default Input;
