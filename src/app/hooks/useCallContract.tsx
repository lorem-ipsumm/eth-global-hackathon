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
      console.log(contractAddress, methodName, args, isWriteMethod);
      try {
        if (!isWriteMethod) {
          const provider = new ethers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL,
          );
          const contract = new ethers.Contract(
            contractAddress,
            fullAbi,
            provider,
          );
          return await (contract[methodName] as Function)(
            ...Object.values(args),
          );
        } else if (isWriteMethod && wallet) {
          console.log(2);
          const provider = new ethers.BrowserProvider(wallet.provider);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            fullAbi,
            signer,
          );
          return await (contract[methodName] as Function)(
            ...Object.values(args),
          );
        } else {
          throw new Error("Wallet not connected");
        }
      } catch (err: any | null) {
        console.error(err);
      }
    },
    [],
  );
  return { callContract };
};
