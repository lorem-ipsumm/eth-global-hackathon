import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useContractCall } from "~/app/hooks/useCallContract";
import { useDebounce } from "~/app/hooks/useDebounce";
import { activeContractAtom, canvasComponentsAtom } from "~/app/utils.ts/atoms";
import { baseComponentStyle } from "~/app/utils.ts/constants";
import { COMPONENT, COMPONENT_RENDER_PROPS } from "~/app/utils.ts/interfaces";

const Label = ({ componentData }: COMPONENT_RENDER_PROPS) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [parentComponent, setParentComponent] = useState<COMPONENT | null>(
    null,
  );

  const [activeContract] = useAtom(activeContractAtom);
  const [canvasComponents] = useAtom(canvasComponentsAtom);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const contractCall = useContractCall();

  useEffect(() => {
    if (debouncedSearchTerm && activeContract) {
      const x = contractCall.callContract(
        activeContract,
        componentData.data,
        componentData.data.name,
        [debouncedSearchTerm],
      );
      console.log(x);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    getParentComponent();
  }, []);

  const getParentComponent = () => {
    const parentComponent = canvasComponents.find(
      (component) => component.id === componentData.parent,
    );
    if (parentComponent) {
      setParentComponent(parentComponent);
      const siblings = parentComponent.children.filter(
        (child) => child.id !== componentData.id,
      );
      console.log(siblings);
    }
  };

  const handleChange = (event: any) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  return (
    <label className={`${baseComponentStyle}`}>{debouncedSearchTerm}</label>
  );
};

export default Label;
