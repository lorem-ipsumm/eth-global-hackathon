import { baseComponentStyle } from "~/app/utils.ts/constants";
import { COMPONENT_RENDER_PROPS } from "~/app/utils.ts/interfaces";

const Button = ({ componentData }: COMPONENT_RENDER_PROPS) => {
  return (
    <button
      className={`select-none ${baseComponentStyle}`}
    >
      {componentData.text}
    </button>
  )
}

export default Button;