// ContractCallPayloadContext.tsx
import { createContext, useState, FC, ReactNode } from "react";

export const contractCallPayloadContext = createContext<any>({});

export const ContractCallPayloadProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contractCallPayload, setContractCallPayload] = useState<any>({});

  return (
    <contractCallPayloadContext.Provider
      value={{ contractCallPayload, setContractCallPayload }}
    >
      {children}
    </contractCallPayloadContext.Provider>
  );
};
