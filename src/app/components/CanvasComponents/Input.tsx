import { baseComponentStyle } from "~/app/utils.ts/constants";
import { COMPONENT_RENDER_PROPS } from "~/app/utils.ts/interfaces";

const Input = ({ componentData }: COMPONENT_RENDER_PROPS) => {
  return (
    <input
      className={`border-2 border-slate-300 px-2 outline-none ${baseComponentStyle}`}
      placeholder={componentData.placeholder || ""}
    />
  );
};

export default Input;
