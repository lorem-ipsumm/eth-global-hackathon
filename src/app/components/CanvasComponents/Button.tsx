import { COMPONENT_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useComponentStyles } from "~/app/hooks/useComponentStyles";

const Button = ({ componentData }: COMPONENT_RENDER_PROPS) => {
  const { getDefaultStyles } = useComponentStyles();

  return (
    <button className={getDefaultStyles("button")}>{componentData.text}</button>
  );
};

export default Button;
