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

  return (
    <div
      className={`${getDefaultStyles("label")} ${widgetData.styles.length > 0 ? widgetData.styles.join(" ") : null}`}
    >
      <p>
        {externalValue !== null ? externalValue!.toString() : widgetData.type}
      </p>
    </div>
  );
};

export default Label;
