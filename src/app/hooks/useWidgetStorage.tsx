import lighthouse from "@lighthouse-web3/sdk";
import { WIDGET } from "../utils.ts/interfaces";
import axios from "axios";

export const useWidgetStorage = () => {
  const uploadWidgetData = async (
    contractAddress: string,
    widgets: WIDGET[][]
  ) => {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY as string;
    // make BigInt serializable
    (BigInt.prototype as any).toJSON = function () {
      return this.toString();
    };
    const data = {
      contractAddress: contractAddress,
      widgets: widgets,
    };
    return await lighthouse.uploadText(JSON.stringify(data), apiKey);
  };

  const loadWidgetData = async (
    hash: string,
  ): Promise<WIDGET[][] | undefined> => {
    try {
      const response = await axios.get(
        "https://gateway.lighthouse.storage/ipfs/" + hash,
      );
      return response.data;
    } catch (e) {
      return undefined;
    }
  };

  return { uploadWidgetData, loadWidgetData };
};
