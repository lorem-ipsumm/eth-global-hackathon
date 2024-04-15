import { COMPONENT_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useComponentStyles } from "~/app/hooks/useComponentStyles";

const Label = ({ componentData }: COMPONENT_RENDER_PROPS) => {
  const { getDefaultStyles } = useComponentStyles();

  return (
    <label
      className={`${getDefaultStyles("label")} ${componentData.styles.length > 0 ? componentData.styles.join(" ") : null}`}
    />
  );
};

export default Label;
