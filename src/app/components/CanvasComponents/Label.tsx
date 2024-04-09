import { baseComponentStyle } from "~/app/utils.ts/constants";
import { COMPONENT, COMPONENT_RENDER_PROPS } from "~/app/utils.ts/interfaces";

const Label = ({ componentData }: COMPONENT_RENDER_PROPS) => {
  return (
    <label
      className={`${baseComponentStyle}`}
    />
  )
}

export default Label;