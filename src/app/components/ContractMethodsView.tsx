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
import { useCanvasWidget } from "../hooks/useCanvasWidget";
import MiscellaneousView from "./MiscellaneousView";

type ACTIVE_TAB = "read" | "write" | "misc";

const ContractMethodsView = () => {
  const [readMethods] = useAtom<ABI_METHOD[]>(abiReadMethodsAtom);
  const [writeMethods] = useAtom<ABI_METHOD[]>(abiWriteMethodsAtom);

  // state vars
  const [activeTab, setActiveTab] = useState<ACTIVE_TAB>("read");

  const { createCanvasWidget } = useCanvasWidget();

  const renderTabs = () => {
    const tab = (label: string, tabValue: string) => (
      <TabsTrigger
        className="h-full w-1/2 rounded-sm hover:bg-slate-200 data-[state=active]:bg-slate-300"
        value={tabValue}
        onClick={() => setActiveTab(tabValue as ACTIVE_TAB)}
      >
        {label}
      </TabsTrigger>
    );

    return (
      <Tabs className="w-full" value={activeTab}>
        <TabsList className="w-full gap-2">
          {tab("Read", "read")}
          {tab("Write", "write")}
          {tab("Misc", "misc")}
        </TabsList>
      </Tabs>
    );
  };

  // render method params
  const renderParams = (abiInputs: any[]) => {
    return (
      <div className="ml-4 flex flex-col gap-1 pt-4">
        {abiInputs.map((input, index) => (
          <span key={index} className="text-xs text-gray-500">
            {input.name}: {input.type}
          </span>
        ))}
      </div>
    );
  };

  const renderReturnValues = (abiOutputs: any[]) => {
    return (
      <div className="ml-4 flex flex-col gap-1">
        {abiOutputs.map((output, index) => (
          <span key={index} className="text-xs text-gray-500">
            {output.name || "returns"}: {output.type}
          </span>
        ))}
      </div>
    );
  };
  // logic for individual methods
  const renderMethod = (methodData: ABI_METHOD) => {
    // layout for method
    const method = (
      <span className="pl-5 text-sm font-semibold">{methodData.name}</span>
    );
    const addButton = (
      <div
        className="absolute flex h-full w-auto items-center justify-center"
        onClick={() => createCanvasWidget(methodData)}
      >
        <PlusCircle size={12} />
      </div>
    );

    if (methodData.inputs.length > 0 && methodData.outputs.length > 0) {
      return (
        <AccordionItem
          value={methodData.name}
          key={methodData.name}
          className="cursor-pointer rounded-sm p-2 hover:bg-slate-300"
        >
          <div className="relative flex items-center">
            {addButton}
            <AccordionTrigger className="p-0">{method}</AccordionTrigger>
          </div>
          <AccordionContent className="pb-0">
            {renderParams(methodData.inputs)}
            <span className="pl-4 text-gray-600">-------</span>
            {renderReturnValues(methodData.outputs)}
          </AccordionContent>
        </AccordionItem>
      );
    } else if (methodData.inputs.length > 0) {
      return (
        <AccordionItem
          value={methodData.name}
          key={methodData.name}
          className="cursor-pointer rounded-sm p-2 hover:bg-slate-300"
        >
          <div className="relative flex items-center">
            {addButton}
            <AccordionTrigger className="p-0">{method}</AccordionTrigger>
          </div>
          <AccordionContent className="pb-2">
            {renderParams(methodData.inputs)}
          </AccordionContent>
        </AccordionItem>
      );
    } else if (methodData.outputs.length > 0) {
      return (
        <AccordionItem
          value={methodData.name}
          key={methodData.name}
          className="cursor-pointer rounded-sm p-2 hover:bg-slate-300"
        >
          <div className="relative flex items-center">
            {addButton}
            <AccordionTrigger className="p-0">{method}</AccordionTrigger>
          </div>
          <AccordionContent className="pb-2">
            {renderReturnValues(methodData.outputs)}
          </AccordionContent>
        </AccordionItem>
      );
    } else {
      return (
        <div
          className="relative flex h-10 cursor-pointer items-center rounded-sm p-2 hover:bg-slate-300"
          key={methodData.name}
        >
          {addButton}
          {method}
        </div>
      );
    }
  };

  const renderMethods = () => {
    if (activeTab === "misc") {
      return <MiscellaneousView/>
    } else {
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
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      {renderTabs()}
      {renderMethods()}
    </div>
  );
};

export default ContractMethodsView;
