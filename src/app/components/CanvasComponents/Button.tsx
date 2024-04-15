import { COMPONENT_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useComponentStyles } from "~/app/hooks/useComponentStyles";

const Button = ({ componentData }: COMPONENT_RENDER_PROPS) => {
  const { getDefaultStyles } = useComponentStyles();

  return (
    <button
      className={`${getDefaultStyles("button")} ${componentData.styles.length > 0 ? componentData.styles.join(" ") : null}`}
    >
      {componentData.text}
    </button>
  );
};

export default Button;
