import Sidebar from "../components/Sidebar";
import Canvas from "./Canvas";

const Editor = () => {
  return (
    <div className="w-screen h-screen flex">
      <Canvas/>
      <Sidebar/>
    </div>
  )
}

export default Editor;