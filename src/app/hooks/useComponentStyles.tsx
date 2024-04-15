export const useComponentStyles = () => {
  const defaultStyles = {
    baseComponentParant: "h-full w-full rounded-sm bg-slate-100",
    baseComponentStyle: "w-full h-full rounded-sm",
    label: [],
    input: "border-2 border-slate-300 px-2 outline-none",
    button: "select-none",
  };

  const getDefaultStyles = (componentType: string) => {
    switch (componentType) {
      case "label":
        return `${defaultStyles.baseComponentStyle} ${defaultStyles.label}`;
      case "input":
        return `${defaultStyles.baseComponentStyle} ${defaultStyles.input}`;
      case "button":
        return `${defaultStyles.baseComponentStyle} ${defaultStyles.button}`;
      default:
        return "";
    }
  };

  return { defaultStyles, getDefaultStyles };
};
