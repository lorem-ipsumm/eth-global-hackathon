"use client";
import injectedModule from "@web3-onboard/injected-wallets";
import { init, useConnectWallet } from "@web3-onboard/react";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { walletAtom, onboardAtom } from "../utils.ts/atoms";

const injected = injectedModule();
const wallets = [injected];

const chains = [
  {
    id: 42161,
    token: "ETH",
    label: "Arbitrum One",
    rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
  },
];

const WalletWrapper = (props: { children: any }) => {
  const [, setUserWallet] = useAtom(walletAtom);
  const [, setOnboard] = useAtom(onboardAtom);
  const [{ wallet }] = useConnectWallet();

  useEffect(() => {
    const onboard = init({
      apiKey: process.env.NEXT_PUBLIC_ONBOARD_API_KEY,
      wallets,
      chains,
      accountCenter: {
        desktop: {
          enabled: false
        },
        mobile: {
          enabled: false
        }
      }

    });
    setOnboard(onboard);
  }, []);

  useEffect(() => {
    if (wallet) 
      setUserWallet(wallet);
  }, [wallet]);

  return props.children;
};

export default WalletWrapper;
