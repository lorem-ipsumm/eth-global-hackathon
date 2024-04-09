import { ethers } from "ethers";
import { useCallback } from "react";

export const useContractCall = () => {
  const callContract = useCallback(
    async (
      contractAddress: string,
      abi: Object[],
      methodName: string,
      args: string[] | number[],
    ) => {
      try {
        const provider = new ethers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL,
        );

        const contract = new ethers.Contract(contractAddress, abi, provider);

        return await (contract[methodName] as Function)(...args);
      } catch (err: any | null) {
        console.error(err);
      }
    },
    [],
  );

  return { callContract };
};
