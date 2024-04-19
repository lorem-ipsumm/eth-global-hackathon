// ContractCallPayloadContext.tsx
import { createContext, useState, FC, ReactNode, useEffect } from "react";
import { useContractCall } from "~/app/hooks/useCallContract";
import { activeContractAtom } from "~/app/utils.ts/atoms";
import { useAtom } from "jotai";

export const ContractCallPayloadContext = createContext<any>(null);

export const ContractCallPayloadProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [methodName, setMethodName] = useState<string>("");
  const [contractCallPayload, setContractCallPayload] = useState({});

  const [contractCallReturnData, setContractCallReturnData] = useState<
    string | null
  >(null);

  const [activeContract] = useAtom(activeContractAtom);
  const { callContract } = useContractCall();

  useEffect(() => {
    if (!activeContract || !methodName) return;

    (async () => {
      try {
        const response = await callContract(
          activeContract!,
          methodName,
          contractCallPayload,
          true,
        );
        setContractCallReturnData(response);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [contractCallPayload]);

  return (
    <ContractCallPayloadContext.Provider
      value={{
        contractCallPayload,
        setContractCallPayload,
        setMethodName,
        contractCallReturnData,
      }}
    >
      {children}
    </ContractCallPayloadContext.Provider>
  );
};
