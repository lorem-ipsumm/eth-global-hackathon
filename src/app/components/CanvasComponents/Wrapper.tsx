import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useContractCall } from "~/app/hooks/useCallContract";
import { useDebounce } from "~/app/hooks/useDebounce";
import { activeContractAtom } from "~/app/utils.ts/atoms";
import { baseComponentStyle } from "~/app/utils.ts/constants";
import { COMPONENT_RENDER_PROPS } from "~/app/utils.ts/interfaces";

const Wrapper = ({ componentData }: COMPONENT_RENDER_PROPS) => {

  const [activeContract] = useAtom(activeContractAtom);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const contractCall = useContractCall();

  useEffect(() => {
    const children = componentData.children;
    const childElements = children.map((child) => {
      return document.getElementById(child.id);
    });
    // add event listeners to the child elements.
    // this is to validate the input and update the label if necessary
    childElements.forEach((childElement) => {
      if (!childElement) return;
      childElement.addEventListener("input", childElementInputChanged);
    });
    // cleanup
    return () => {
      childElements.forEach((childElement) => {
        if (!childElement) return;
        childElement.removeEventListener("input", childElementInputChanged);
      });
    };

  }, []);

  // update the label text
  const updateLabel = async (
    value: string,
  ) => {
    const children = componentData.children;
    // find the label element and updated the text
    const label = children.find((child) => child.type === "label");
    if (!label) return;
    const labelComponent = document.getElementById(label.id);
    if (!labelComponent || !activeContract) return;
    // labelComponent.textContent = value;
    // const res = await contractCall.callContract(
    //   activeContract,
    //   [componentData.data],
    //   componentData.data.name,
    //   [value],
    // );
    // labelComponent.textContent = res;
  }

  // handle input change
  const childElementInputChanged = (e: any) => {
    const component = document.getElementById(e.target.id);
    const componentId = component?.id;
    const parts = componentId?.split("_");
    const componentType = parts?.[0];
    if (componentType === "input") {
      updateLabel(e.target.value);
    }
  }

  return (
    <div
      className={`bg-blue-500 border-2 border-slate-300 px-2 outline-none ${baseComponentStyle}`}
      id={componentData.id}
    />
  );
};

export default Wrapper;