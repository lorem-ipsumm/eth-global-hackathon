"use client";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import { Tabs, TabsList } from "~/components/ui/tabs";
import { ABI_METHOD, COMPONENT } from "../utils.ts/interfaces";
import { PlusCircle } from "react-feather";
import { useAtom } from "jotai";
import {
  abiReadMethodsAtom,
  abiWriteMethodsAtom,
  canvasComponentsAtom,
} from "../utils.ts/atoms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const ContractMethodsView = () => {
  const [readMethods] = useAtom<ABI_METHOD[]>(abiReadMethodsAtom);
  const [writeMethods] = useAtom<ABI_METHOD[]>(abiWriteMethodsAtom);
  const [canvasComponents, setCanvasComponents] = useAtom(canvasComponentsAtom);

  // state vars
  const [activeTab, setActiveTab] = useState<string>("read");

  // check if method is a write method
  const isWriteMethod = (methodData: ABI_METHOD) => {
    return (
      methodData.stateMutability === "payable" ||
      methodData.stateMutability === "nonpayable"
    );
  };

  const repositionComponents = (components: COMPONENT[]) => {
    let lastYCoordinate = 0;
    components.forEach((component) => {
      component.position = { x: 0, y: lastYCoordinate };
      lastYCoordinate += 50;
    });
  };

  const addComponent = (methodData: ABI_METHOD) => {
    let newComponents: COMPONENT[] = [];
    let children: COMPONENT[] = [];
    let length = newComponents.length;

    const isReadMethod = !isWriteMethod(methodData);

    // create new component
    const parentComponent: COMPONENT = {
      id: `wrapper_${methodData.name}_${length++}`,
      type: "wrapper",
      position: { x: 0, y: 0 },
      size: { width: 100, height: 50 },
      styles: [],
      data: methodData,
      children: [],
    };

    // if there are params add them as children
    methodData.inputs.forEach((param) => {
      children.push({
        id: `input_${param.name}_${length++}`,
        type: "input",
        position: { x: 0, y: 0 },
        size: { width: 100, height: 50 },
        styles: [],
        data: param,
        parent: parentComponent.id,
        children: [],
      });
      newComponents = [...children];
    });

    // if it's a write method add a button
    if (!isReadMethod) {
      const component: COMPONENT = {
        id: `button_${methodData.name}_${length++}`,
        type: "button",
        text: "Submit",
        position: { x: 0, y: 0 },
        size: { width: 100, height: 50 },
        styles: [],
        data: methodData,
        parent: parentComponent.id,
        children: [],
      };
      children.push(component);
      newComponents = [...children];
    }

    parentComponent.children = children;
    newComponents = [parentComponent, ...newComponents];
    repositionComponents(newComponents);
    setCanvasComponents([...canvasComponents, ...newComponents]);
  };

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
        onClick={() => addComponent(methodData)}
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
