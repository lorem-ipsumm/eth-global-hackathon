import Logo from "./assets/logo";
import Link from "next/link";

export default function HomePage() {

  const renderText = () => {
    return (
      <div className="flex flex-col mt-20">
        <h1 className="text-5xl font-bold">
          Your Wix for Web3
        </h1>
        <p className="text-2xl mt-5">
          Seamlessly craft shareable UIs for on-chain contracts with intuitive drag-and-drop tooling.
        </p>
        <Link
          href="/editor"
          className="w-96 bg-blue-500 h-16 rounded-md text-white font-bold text-2xl hover:bg-blue-600 transition-all flex items-center justify-center mt-5 shadow-xl"
        >
          Launch App
        </Link>
      </div>
    );
  }
  
  const renderLogo = () => {
    return (
      <div className="absolute top-0 left-0">
        <Logo/>
      </div>
    );
  }

  return (
    <main className="bg animated flex w-screen h-screen flex-col p-20 fade-in">
      <div
        className="relative w-1/3 h-full flex items-center fade-in"
      >
        {renderLogo()}
        {renderText()}
      </div>
    </main>
  );
}
