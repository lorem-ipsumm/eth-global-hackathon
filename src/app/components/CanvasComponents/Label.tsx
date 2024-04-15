import { baseComponentStyle } from "~/app/utils.ts/constants";
import { COMPONENT, COMPONENT_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useComponentStyles } from "~/app/hooks/useComponentStyles";

const Label = ({ componentData }: COMPONENT_RENDER_PROPS) => {
  const { getDefaultStyles } = useComponentStyles();

  return <label className={getDefaultStyles("label")} />;
};

export default Label;
