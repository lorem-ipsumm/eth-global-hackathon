"use client";
import { TabsTrigger } from "@radix-ui/react-tabs";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Tabs, TabsList } from "~/components/ui/tabs";
import { ABI_METHOD } from "../utils.ts/interfaces";
import { PlusCircle } from "react-feather";
import { useAtom } from "jotai";
import { activeContractAtom } from "../utils.ts/atoms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const ContractMethodsView = () => {
  // state vars
  const [readMethods, setReadMethods] = useState<ABI_METHOD[]>([]);
  const [writeMethods, setWriteMethods] = useState<ABI_METHOD[]>([]);
  const [activeTab, setActiveTab] = useState<string>("read");

  // atoms
  const [activeContract] = useAtom(activeContractAtom);

  // fetch the contract abi from etherscan
  const getContractAbi = useCallback(async () => {
    try {
      // build url
      const url = new URL("https://api.etherscan.io/api");
      url.searchParams.append("module", "contract");
      url.searchParams.append("action", "getabi");
      url.searchParams.append("address", activeContract as string);
      url.searchParams.append(
        "apikey",
        process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string,
      );
      // fetch abi
      const response = await axios.get(url.toString());
      // set abi
      // setAbi(response.data.result);
      separateMethods(response.data.result);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getContractAbi();
  }, [getContractAbi]);

  const separateMethods = (abiString: string) => {
    const abi: ABI_METHOD[] = JSON.parse(abiString);
    // list of read and write methods
    const readMethods: ABI_METHOD[] = [];
    const writeMethods: ABI_METHOD[] = [];
    // iterate over abi and separate read and write methods
    abi.forEach((method) => {
      if (method.type === "function") {
        // check if method is read or write
        if (
          method.stateMutability === "view" ||
          method.stateMutability === "pure"
        ) {
          readMethods.push(method);
        } else {
          writeMethods.push(method);
        }
      }
    });
    // update state
    setReadMethods(readMethods);
    setWriteMethods(writeMethods);
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
