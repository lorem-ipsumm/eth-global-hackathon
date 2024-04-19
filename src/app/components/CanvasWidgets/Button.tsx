import { WIDGET_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useWidgetStyles } from "~/app/hooks/useWidgetStyles";
import { useContractCall } from "~/app/hooks/useCallContract";
import { useContext } from "react";
import { ContractCallPayloadContext } from "~/app/Contexts/ContractCallPayloadProvider";
import { activeContractAtom } from "~/app/utils.ts/atoms";
import { useAtom } from "jotai";

const Button = ({ widgetData }: WIDGET_RENDER_PROPS) => {
  const { getDefaultStyles } = useWidgetStyles();
  const { callContract } = useContractCall();

  const [activeContract] = useAtom(activeContractAtom);

  const { contractCallPayload, setContractCallReturnData } = useContext(
    ContractCallPayloadContext,
  );

  const handleClick = async () => {
    try {
      const response = await callContract(
        activeContract!,
        widgetData.data.name,
        contractCallPayload,
        widgetData.isWriteMethod,
      );
      setContractCallReturnData(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${getDefaultStyles("button")} ${widgetData.styles.length > 0 ? widgetData.styles.join(" ") : null}`}
    >
      {widgetData.text}
    </button>
  );
};

export default Button;
