"use client";
import injectedModule from "@web3-onboard/injected-wallets";
import { init, useConnectWallet } from "@web3-onboard/react";
import { Wallet } from "lucide-react";

const injected = injectedModule();
const wallets = [injected];

const chains = [
  {
    id: 1,
    token: "ETH",
    label: "Ethereum Mainnet",
    rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
  },
];

const onboard = init({
  wallets,
  chains,
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
});

const ConnectWallet = () => {
  const [{ wallet }] = useConnectWallet();

  const renderConnectWalletButton = () => {
    let text = "Connect Wallet";
    if (wallet && wallet.accounts[0]?.address) {
      // set text to be truncated address
      text = `${wallet.accounts[0].address.slice(0, 6)}...${wallet.accounts[0].address.slice(-4)}`;
    }
    return (
      <button
        onClick={() => onboard.connectWallet()}
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
