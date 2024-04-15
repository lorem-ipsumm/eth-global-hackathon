import { COMPONENT_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useComponentStyles } from "~/app/hooks/useComponentStyles";

const Input = ({ componentData }: COMPONENT_RENDER_PROPS) => {
  const { getDefaultStyles } = useComponentStyles();

  return (
    <input
      className={getDefaultStyles("input")}
      placeholder={componentData.placeholder || ""}
    />
  );
};

export default Input;
