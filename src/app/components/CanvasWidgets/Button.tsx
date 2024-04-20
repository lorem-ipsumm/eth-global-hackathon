"use client";
import { WIDGET_RENDER_PROPS } from "~/app/utils.ts/interfaces";
import { useWidgetStyles } from "~/app/hooks/useWidgetStyles";
import { useContractCall } from "~/app/hooks/useCallContract";
import { useContext, useState } from "react";
import { ContractCallPayloadContext } from "~/app/Contexts/ContractCallPayloadProvider";
import { activeContractAtom, walletAtom } from "~/app/utils.ts/atoms";
import { useAtom } from "jotai";
import { useToast } from "~/components/ui/use-toast";
import { BeatLoader } from "react-spinners";

const Button = ({ widgetData }: WIDGET_RENDER_PROPS) => {
  const { getDefaultStyles } = useWidgetStyles();
  const { callContract } = useContractCall();

  const [isPending, setIsPending] = useState<boolean>(false);

  const [activeContract] = useAtom(activeContractAtom);
  const [wallet] = useAtom(walletAtom);
  const { toast } = useToast();

  const { contractCallPayload, setContractCallReturnData } = useContext(
    ContractCallPayloadContext,
  );

  const handleClick = async () => {
    try {
      if (!wallet) {
        toast({
          title: "No Wallet Connected",
          description: "Please connect your wallet",
        });
        return;
      }
      setIsPending(true);
      const response = await callContract(
        activeContract!,
        widgetData.data.name,
        contractCallPayload,
        widgetData.isWriteMethod,
      );
      if (response) {
        toast({
          title: "Transaction Successful!",
        });
      } else {
        throw new Error("tx failed");
      }
      setContractCallReturnData(response);
    } catch (e) {
      console.error(e);
      toast({
        title: "Transaction Failed!",
        variant: "destructive",
      });
    }
    setIsPending(false);
  };

  const renderText = () => {
    if (isPending) return <BeatLoader size={8} color="#ffffff" />;
    else return widgetData.text;
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center ${getDefaultStyles("button")} ${widgetData.styles.length > 0 ? widgetData.styles.join(" ") : null}`}
    >
      {renderText()}
    </button>
  );
};

export default Button;
