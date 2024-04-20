"use client";
import { usePathname } from "next/navigation";
import ConnectWallet from "./ConnectWallet";
import PublishButton from "./PublishButton";

const ActionsBar = () => {
  const pathname = usePathname();

  const renderPublish = () => {
    if (pathname === "/editor") {
      return (
        <>
          <div className="h-[80%] w-[1px] bg-slate-400" />
          <PublishButton />
        </>
      );
    }
  };

  return (
    <div className="fixed left-3 bottom-3 flex h-10 w-auto bg-white items-center gap-3 rounded-md border border-slate-500 px-3 shadow-lg">
      <ConnectWallet />
      {renderPublish()}
    </div>
  );
};

export default ActionsBar;
