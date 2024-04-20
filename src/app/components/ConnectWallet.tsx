"use client";
import injectedModule from "@web3-onboard/injected-wallets";
import { init, useConnectWallet } from "@web3-onboard/react";
import { useAtom } from "jotai";
import { Wallet } from "lucide-react";
import { onboardAtom } from "../utils.ts/atoms";


const ConnectWallet = () => {
  const [{ wallet }] = useConnectWallet();
  const [onboard] = useAtom(onboardAtom);

  const connect = () => {
    console.log("connecting wallet");
    onboard.connectWallet();
  }

  const renderConnectWalletButton = () => {
    let text = "Connect Wallet";
    if (wallet && wallet.accounts[0]?.address) {
      // set text to be truncated address
      text = `${wallet.accounts[0].address.slice(0, 6)}...${wallet.accounts[0].address.slice(-4)}`;
    }
    return (
      <button
        onClick={connect}
        className="flex items-center gap-2 transition-all hover:text-blue-500"
      >
        <Wallet size={14} />
        {text}
      </button>
    );
  };

  return <div className="flex">{renderConnectWalletButton()}</div>;
};

export default ConnectWallet;
