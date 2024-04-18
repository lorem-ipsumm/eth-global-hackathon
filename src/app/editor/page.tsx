import ActionsBar from "../components/ActionsBar";
import Sidebar from "../components/Sidebar";
import Canvas from "./Canvas";

const Editor = () => {
  return (
    <div className="flex h-screen w-screen relative">
      <Canvas />
      <Sidebar />
      <ActionsBar/>
    </div>
  );
};

export default Editor;
