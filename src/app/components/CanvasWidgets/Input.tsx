import { useState, useContext, useEffect } from "react";
import { WIDGET_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useWidgetStyles } from "~/app/hooks/useWidgetStyles";
import { useDebounce } from "~/app/hooks/useDebounce";
import { ContractCallPayloadContext } from "../../Contexts/ContractCallPayloadProvider";

const Input = ({ widgetData }: WIDGET_RENDER_PROPS) => {
  const [inputValue, setInputValue] = useState<string>("");

  const { getDefaultStyles } = useWidgetStyles();
  // const { callContract } = callContract();

  const { contractCallPayload, setContractCallPayload } = useContext(
    ContractCallPayloadContext,
  );

  const handleSearch = useDebounce((term: any) => {
    setContractCallPayload((prevState: any) => ({
      ...prevState,
      [widgetData.id]: term,
    }));
  }, 500);

  const handleChange = (event: { target: { value: any } }) => {
    const { value } = event.target;

    setInputValue(value);
    handleSearch(value);
  };

  return (
    <input
      value={inputValue}
      onChange={handleChange}
      className={`${getDefaultStyles("input")} ${widgetData.styles.length > 0 ? widgetData.styles.join(" ") : null}`}
      placeholder={widgetData.placeholder || ""}
    />
  );
};

export default Input;
