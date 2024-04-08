"use client";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import { Tabs, TabsList } from "~/components/ui/tabs";
import { ABI_METHOD } from "../utils.ts/interfaces";
import { PlusCircle } from "react-feather";
import { useAtom } from "jotai";
import { abiReadMethodsAtom, abiWriteMethodsAtom } from "../utils.ts/atoms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const ContractMethodsView = () => {
  const [readMethods] = useAtom<ABI_METHOD[]>(abiReadMethodsAtom);
  const [writeMethods] = useAtom<ABI_METHOD[]>(abiWriteMethodsAtom);

  // state vars
  const [activeTab, setActiveTab] = useState<string>("read");

  const renderTabs = () => {
    const tab = (label: string, tabValue: string) => (
      <TabsTrigger
        className="h-full w-1/2 rounded-sm hover:bg-slate-200 data-[state=active]:bg-slate-300"
        value={tabValue}
        onClick={() => setActiveTab(tabValue)}
      >
        {label}
      </TabsTrigger>
    );

    return (
      <Tabs className="w-full" value={activeTab}>
        <TabsList className="w-full gap-2">
          {tab("Read", "read")}
          {tab("Write", "write")}
        </TabsList>
      </Tabs>
    );
  };

  // render method params
  const renderParams = (params: any[]) => {
    return (
      <div className="ml-4 flex flex-col gap-1 pt-4">
        {params.map((param, index) => (
          <span key={index} className="text-xs text-gray-500">
            {param.name}: {param.type}
          </span>
        ))}
      </div>
    );
  };

  // logic for individual methods
  const renderMethod = (methodData: ABI_METHOD) => {
    // layout for method
    const method = (
      <div className="flex items-center">
        <PlusCircle size={12} className="mr-2" />
        <span className="text-sm font-semibold">{methodData.name}</span>
      </div>
    );
    // if there are params render them in an accordion
    if (methodData.inputs.length > 0) {
      return (
        <AccordionItem
          value={methodData.name}
          key={methodData.name}
          className="cursor-pointer rounded-sm p-2 hover:bg-slate-300"
        >
          <AccordionTrigger className="p-0">{method}</AccordionTrigger>
          <AccordionContent className="pb-2">
            {renderParams(methodData.inputs)}
          </AccordionContent>
        </AccordionItem>
      );
    } else {
      return (
        <div
          className="flex h-10 cursor-pointer items-center rounded-sm p-2 hover:bg-slate-300"
          key={methodData.name}
        >
          {method}
        </div>
      );
    }
  };

  const renderMethods = () => {
    // get methods based on active tab
    const methods = activeTab === "read" ? readMethods : writeMethods;
    return (
      <Accordion
        type="multiple"
        className="mt-3 flex flex-col gap-2 overflow-y-auto"
      >
        {methods.map((method) => renderMethod(method))}
      </Accordion>
    );
  };

  return (
    <div className="flex h-full w-full flex-col">
      {renderTabs()}
      {renderMethods()}
    </div>
  );
};

export default ContractMethodsView;
