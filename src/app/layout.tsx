import "~/styles/globals.css";
import { Karla } from "next/font/google";
import WalletWrapper from "./components/WalletWrapper";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = {
  title: "DappCanvas",
  description: "Your Web3 Wix",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${karla.className}`}>
        <WalletWrapper>
          {children}
        </WalletWrapper>
      </body>
    </html>
  );
}
