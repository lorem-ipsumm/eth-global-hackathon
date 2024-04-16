// ContractCallPayloadContext.tsx
import { createContext, useState, FC, ReactNode, useEffect } from "react";

export const ContractCallPayloadContext = createContext<any>(null);

export const ContractCallPayloadProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contractCallPayload, setContractCallPayload] = useState({});

  return (
    <ContractCallPayloadContext.Provider
      value={{ contractCallPayload, setContractCallPayload }}
    >
      {children}
    </ContractCallPayloadContext.Provider>
  );
};
