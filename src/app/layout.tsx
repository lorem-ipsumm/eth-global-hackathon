"use client";
import "~/styles/globals.css";
import { Inter } from "next/font/google";
import injectedModule from "@web3-onboard/injected-wallets";
import { init, useConnectWallet } from "@web3-onboard/react";
import { useAtom } from "jotai";
import { walletAtom } from "./utils.ts/atoms";
import { useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const injected = injectedModule();
const wallets = [injected];

const chains = [
  {
    id: 1,
    token: "ETH",
    label: "Ethereum Mainnet",
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [, setUserWallet] = useAtom(walletAtom);
  const [{ wallet }] = useConnectWallet();

  useEffect(() => {
    if (wallet) setUserWallet(wallet);
  }, [wallet]);

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>{children}</body>
    </html>
  );
}
