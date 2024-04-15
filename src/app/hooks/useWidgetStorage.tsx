import lighthouse from "@lighthouse-web3/sdk";
import { WIDGET } from "../utils.ts/interfaces";

export const useWidgetStorage = () => {
  const uploadWidgetData = async (widgets: WIDGET[]) => {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY as string;

    const json = JSON.stringify(widgets);

    return await lighthouse.uploadText(json, apiKey);
  };

  return { uploadWidgetData };
};
