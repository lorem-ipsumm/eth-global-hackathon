import { COMPONENT_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useComponentStyles } from "~/app/hooks/useComponentStyles";

const Input = ({ componentData }: COMPONENT_RENDER_PROPS) => {
  const { getDefaultStyles } = useComponentStyles();

  return (
    <input
      className={`${getDefaultStyles("input")} ${componentData.styles.length > 0 ? componentData.styles.join(" ") : null}`}
      placeholder={componentData.placeholder || ""}
    />
  );
};

export default Input;
