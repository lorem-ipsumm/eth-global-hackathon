import { useCallback } from "react";
import axios from "axios";
import { ABI_METHOD } from "../utils.ts/interfaces";
import { useAtom } from "jotai";
import { abiReadMethodsAtom, abiWriteMethodsAtom } from "../utils.ts/atoms";

export const useContractAbi = () => {
  const [readMethods, setReadMethods] =
    useAtom<ABI_METHOD[]>(abiReadMethodsAtom);
  const [writeMethods, setWriteMethods] =
    useAtom<ABI_METHOD[]>(abiWriteMethodsAtom);

  const fetchAbiRequest = async (address: string, apiKey: string) => {
    const url = new URL("https://api.etherscan.io/api");
    url.searchParams.append("module", "contract");
    url.searchParams.append("action", "getabi");
    url.searchParams.append("address", address);
    url.searchParams.append("apikey", apiKey);

    return await axios.get(url.toString());
  };

  const separateMethods = (abi: ABI_METHOD[]) => {
    const readMethods: ABI_METHOD[] = [];
    const writeMethods: ABI_METHOD[] = [];

    abi.forEach((method) => {
      if (method.type === "function") {
        if (
          method.stateMutability === "view" ||
          method.stateMutability === "pure"
        ) {
          readMethods.push(method);
        } else {
          writeMethods.push(method);
        }
      }
    });

    return { readMethods, writeMethods };
  };

  const determineContractValidity = useCallback(async (address: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not defined");
      }

      const response = await fetchAbiRequest(address, apiKey);

      if (response.data.status === "0") {
        return false;
      }

      const { readMethods, writeMethods } = separateMethods(
        JSON.parse(response.data.result),
      );

      // Sets Global Atom ABI context if contract is valid (has ABI)
      setReadMethods(readMethods);
      setWriteMethods(writeMethods);

      return true;
    } catch (e) {
      console.error(e);
    }
  }, []);

  return { determineContractValidity, readMethods, writeMethods };
};
