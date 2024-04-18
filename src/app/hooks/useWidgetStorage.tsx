import lighthouse from "@lighthouse-web3/sdk";
import { WIDGET } from "../utils.ts/interfaces";
import axios from "axios";

export const useWidgetStorage = () => {
  const uploadWidgetData = async (widgets: WIDGET[][]) => {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY as string;

    const json = JSON.stringify(widgets);

    return await lighthouse.uploadText(json, apiKey);
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
