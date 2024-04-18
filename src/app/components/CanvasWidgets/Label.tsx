import { WIDGET_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useWidgetStyles } from "~/app/hooks/useWidgetStyles";
import { useContext, useEffect } from "react";
import { ContractCallPayloadContext } from "~/app/Contexts/ContractCallPayloadProvider";
import { useState } from "react";

const Label = ({ widgetData }: WIDGET_RENDER_PROPS) => {
  const { getDefaultStyles } = useWidgetStyles();

  const { contractCallReturnData } = useContext(ContractCallPayloadContext);
  const [externalValue, setExternalValue] = useState(widgetData.externalValue);

  useEffect(() => {
    setExternalValue(contractCallReturnData);
    widgetData.externalValue = contractCallReturnData;
  }, [contractCallReturnData]);

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
