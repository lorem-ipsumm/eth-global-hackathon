export interface ABI_METHOD {
  constant: boolean;
  name: string;
  inputs: any[];
  stateMutability: string;
  outputs: any[];
  type: string;
}

export interface COMPONENT {
  id: string;
  type: "input" | "label" | "button" | "wrapper";
  text?: string;
  placeholder?: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  children: COMPONENT[];
  parent?: string;
  data: any;
}

export interface COMPONENT_RENDER_PROPS {
  componentData: COMPONENT;
}