import PublishButton from "../components/PublishButton";
import PublishModal from "../components/PublishModal";
import Sidebar from "../components/Sidebar";
import Canvas from "./Canvas";

const Editor = () => {
  return (
    <div className="flex h-screen w-screen">
      <Canvas />
      <Sidebar />
      <PublishButton/>
      <PublishModal/>
    </div>
  );
};

export default Editor;
