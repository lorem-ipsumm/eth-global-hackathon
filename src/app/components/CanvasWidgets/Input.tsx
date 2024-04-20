import { useState, useContext, useEffect } from "react";
import { WIDGET_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useWidgetStyles } from "~/app/hooks/useWidgetStyles";
import { useDebounce } from "~/app/hooks/useDebounce";
import { ContractCallPayloadContext } from "../../Contexts/ContractCallPayloadProvider";

const Input = ({ widgetData }: WIDGET_RENDER_PROPS) => {
  const [inputValue, setInputValue] = useState<string>(
    widgetData.defaultValue || "",
  );
  const { getDefaultStyles } = useWidgetStyles();

  useEffect(() => {
    // if there is a default value, trigger input change and search
    if (widgetData.defaultValue) {
      setInputValue(widgetData.defaultValue);
      handleSearch(widgetData.defaultValue);
    }
  }, []);

  const handleSearch = useDebounce((term: any) => {
    setContextValsAndCallContract(term);
  }, 1000);

  const { setContractCallPayload, setMethodName } = useContext(
    ContractCallPayloadContext,
  );

  const setContextValsAndCallContract = async (value: any) => {
    setContractCallPayload((prevState: any) => ({
      ...prevState,
      [widgetData.id]: value,
    }));
    setMethodName(widgetData.data.name);
  };

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
