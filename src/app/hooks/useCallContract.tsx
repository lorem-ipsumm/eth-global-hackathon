import { ethers } from "ethers";
import { useCallback } from "react";
import { fullAbiAtom } from "../utils.ts/atoms";
import { useAtom } from "jotai";
import { useConnectWallet } from "@web3-onboard/react";

export const useContractCall = () => {
  const [fullAbi] = useAtom<any>(fullAbiAtom);

  const [{ wallet }] = useConnectWallet();

  const callContract = useCallback(
    async (
      contractAddress: string,
      methodName: string,
      args: Object,
      isWriteMethod?: boolean,
    ) => {
      let provider;
      let contract;
      try {
        if (!isWriteMethod) {
          provider = new ethers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL,
          );
          contract = new ethers.Contract(contractAddress, fullAbi, provider);
          return await (contract[methodName] as Function)(
            ...Object.values(args),
          );
        } else if (isWriteMethod && wallet) {
          provider = new ethers.BrowserProvider(wallet.provider);
          const signer = await provider.getSigner();
          contract = new ethers.Contract(contractAddress, fullAbi, signer);
          return await (contract[methodName] as Function)(
            ...Object.values(args),
          );
        } else {
          throw new Error("Invalid contract call");
        }
      } catch (err: any | null) {
        console.error(err);
      }
    },
    [],
  );
  return { callContract };
};
