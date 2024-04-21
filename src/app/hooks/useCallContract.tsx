import { ethers } from "ethers";
import { useCallback, useEffect, useRef } from "react";
import {
  fullAbiAtom,
  walletAtom,
  contractCallIncrementAtom,
} from "../utils.ts/atoms";
import { useAtom } from "jotai";

export const useContractCall = () => {
  const [fullAbi] = useAtom<any>(fullAbiAtom);
  const [wallet] = useAtom(walletAtom);
  const walletRef = useRef(null);
  const fullAbiRef = useRef(null);
  const [contractCallCnt, setContractCallCnt] = useAtom(
    contractCallIncrementAtom,
  );

  // this is kind of wacky but I don't feel like
  // figuring out the ins and outs of react to
  // get the wallet and fullAbi to be available
  useEffect(() => {
    if (wallet) walletRef.current = wallet;
    if (fullAbi) fullAbiRef.current = fullAbi;
  }, [wallet, fullAbi]);

  const callContract = (
    contractAddress: string,
    methodName: string,
    args: Object,
    isWriteMethod?: boolean,
  ) => {
    const response = callContractCallback(
      contractAddress,
      methodName,
      args,
      isWriteMethod,
    );
    setContractCallCnt(contractCallCnt + 1);
    return response;
  };

  const callContractCallback = useCallback(
    async (
      contractAddress: string,
      methodName: string,
      args: Object,
      isWriteMethod?: boolean,
    ) => {
      let provider;
      let contract;
      let contractRes;
      try {
        if (!isWriteMethod && fullAbiRef.current) {
          provider = new ethers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
          );
          const fullAbi: any = fullAbiRef.current;
          contract = new ethers.Contract(contractAddress, fullAbi, provider);
          contractRes = await (contract[methodName] as Function)(
            ...Object.values(args),
          );
        } else if (isWriteMethod && walletRef.current && fullAbiRef.current) {
          const wallet: any = walletRef.current;
          const fullAbi: any = fullAbiRef.current;
          provider = new ethers.BrowserProvider(wallet.provider);
          const signer = await provider.getSigner();
          contract = new ethers.Contract(contractAddress, fullAbi, signer);
          contractRes = await (contract[methodName] as Function)(
            ...Object.values(args),
          );
        } else {
          throw new Error("Invalid contract call");
        }

        return contractRes;
      } catch (err: any | null) {
        console.error(err);
      }
    },
    [],
  );
  return { callContract };
};
