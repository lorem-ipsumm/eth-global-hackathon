"use client";
import ContractMethodsView from "./ContractMethodsView";
import SelectContractView from "./SelectContractView";
import { useAtom } from "jotai";
import { activeSidebarViewAtom } from "../utils.ts/atoms";

const Sidebar = () => {

  const [activeSidebarView, setActiveSidebarView] = useAtom(activeSidebarViewAtom);

  const views = [
    <SelectContractView/>,
    <ContractMethodsView/>
  ];

  return (
    <div className="h-full w-1/5 bg-slate-200 p-3 shadow-lg">
      {views[activeSidebarView % views.length]}
    </div>
  );
};

export default Sidebar;
