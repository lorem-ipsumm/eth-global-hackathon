import lighthouse from "@lighthouse-web3/sdk";
import { COMPONENT } from "../utils.ts/interfaces";

export const useComponentStorage = () => {
  const uploadComponentData = async (components: COMPONENT[]) => {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY as string;

    const json = JSON.stringify(components);

    return await lighthouse.uploadText(json, apiKey);
  };

  return { uploadComponentData };
};
