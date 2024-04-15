import Sidebar from "../components/Sidebar";
import Canvas from "./Canvas";

const Editor = () => {
  return (
    <div className="flex h-screen w-screen">
      <Canvas />
      <Sidebar />
    </div>
  );
};

export default Editor;
