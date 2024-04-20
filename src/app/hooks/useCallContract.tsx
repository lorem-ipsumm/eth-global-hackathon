import { ethers } from "ethers";
import { useCallback, useEffect, useRef } from "react";
import { fullAbiAtom, walletAtom } from "../utils.ts/atoms";
import { useAtom } from "jotai";

export const useContractCall = () => {
  const [fullAbi] = useAtom<any>(fullAbiAtom);
  const [wallet] = useAtom(walletAtom);
  const walletRef = useRef(null);
  const fullAbiRef = useRef(null);

  // this is kind of wacky but I don't feel like
  // figuring out the ins and outs of react to 
  // get the wallet and fullAbi to be available
  useEffect(() => {
    if (wallet) walletRef.current = wallet;
    if (fullAbi) fullAbiRef.current = fullAbi;
  }, [wallet, fullAbi]);

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
        if (!isWriteMethod && fullAbiRef.current) {
          provider = new ethers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL,
          );
          const fullAbi: any = fullAbiRef.current;
          contract = new ethers.Contract(contractAddress, fullAbi, provider);
          return await (contract[methodName] as Function)(
            ...Object.values(args),
          );
        } else if (isWriteMethod && walletRef.current && fullAbiRef.current) {
          const wallet: any = walletRef.current;
          const fullAbi: any = fullAbiRef.current;
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
