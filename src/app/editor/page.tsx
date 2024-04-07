import Sidebar from "../components/Sidebar";
import View from "./View";

const Editor = () => {
  return (
    <div className="w-screen h-screen flex">
      <View/>
      <Sidebar/>
    </div>
  )
}

export default Editor;