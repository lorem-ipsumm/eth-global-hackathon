import { WIDGET_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useWidgetStyles } from "~/app/hooks/useWidgetStyles";
import { useContext, useEffect } from "react";
import { ContractCallPayloadContext } from "~/app/Contexts/ContractCallPayloadProvider";
import { useState } from "react";
import { useContractCall } from "~/app/hooks/useCallContract";
import { useAtom } from "jotai";
import { activeContractAtom } from "~/app/utils.ts/atoms";

const Label = ({ widgetData }: WIDGET_RENDER_PROPS) => {
  const { getDefaultStyles } = useWidgetStyles();
  const { callContract } = useContractCall();
  const [activeContract] = useAtom(activeContractAtom);
  const [styles, setStyles] = useState(widgetData.styles);

  const { contractCallReturnData } = useContext(ContractCallPayloadContext);
  const [externalValue, setExternalValue] = useState(widgetData.externalValue);

  useEffect(() => {
    setExternalValue(contractCallReturnData);
    widgetData.externalValue = contractCallReturnData;
  }, [contractCallReturnData]);

  useEffect(() => {
    if (widgetData.data.inputs.length > 0) return;
    (async () => {
      try {
        const value = await callContract(
          activeContract!,
          widgetData.data.name,
          {},
        );
        setExternalValue(value);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  console.log(`${styles.join(" ").trim()}`);
  const displayValue = () => {
    try {
      if (externalValue !== null) {
        return externalValue!.toString();
      }
    } catch (error: any) {
      console.error("Error converting externalValue to string:", error);
      return error.message;
    }
    return widgetData.type;
  };

  return (
    <div
      className={`${getDefaultStyles("label")} ${widgetData.styles.length > 0 ? widgetData.styles.join(" ") : null}`}
    >
      <p>{displayValue()}</p>
    </div>
  );
};

export default Label;
