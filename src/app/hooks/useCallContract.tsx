import { ethers } from "ethers";
import { useCallback } from "react";
import { fullAbiAtom } from "../utils.ts/atoms";
import { useAtom } from "jotai";

export const useContractCall = () => {
  const [fullAbi] = useAtom<any>(fullAbiAtom);

  const callContract = useCallback(
    async (contractAddress: string, methodName: string, args: Object) => {
      try {
        const provider = new ethers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL,
        );
        const contract = new ethers.Contract(
          contractAddress,
          fullAbi,
          provider,
        );

        return await (contract[methodName] as Function)(...Object.values(args));
      } catch (err: any | null) {
        console.error(err);
      }
    },
    [],
  );

  return { callContract };
};
