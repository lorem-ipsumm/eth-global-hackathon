import { useState, useContext, useEffect } from "react";
import { WIDGET_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useWidgetStyles } from "~/app/hooks/useWidgetStyles";
import { useDebounce } from "~/app/hooks/useDebounce";
import { ContractCallPayloadContext } from "../../Contexts/ContractCallPayloadProvider";
import { useContractCall } from "~/app/hooks/useCallContract";
import { activeContractAtom } from "~/app/utils.ts/atoms";
import { useAtom } from "jotai";

const Input = ({ widgetData }: WIDGET_RENDER_PROPS) => {
  const [activeContract] = useAtom(activeContractAtom);
  const [inputValue, setInputValue] = useState<string>("");
  const { getDefaultStyles } = useWidgetStyles();
  const { callContract } = useContractCall();
  const { contractCallPayload, setContractCallPayload } = useContext(
    ContractCallPayloadContext,
  );

  // useEffect(() => {
  //   (async () => {
  //     console.log(
  //       await callContract(
  //         activeContract!,
  //         widgetData.data.name,
  //         contractCallPayload,
  //       ),
  //     );
  //   })();
  // }, [contractCallPayload]);

  const handleSearch = useDebounce((term: any) => {
    setContextValsAndCallContract(term);
  }, 1000);

  const setContextValsAndCallContract = async (value: any) => {
    setContractCallPayload((prevState: any) => ({
      ...prevState,
      [widgetData.id]: value,
    }));
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
