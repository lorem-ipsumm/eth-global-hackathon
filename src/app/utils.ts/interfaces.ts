export interface ABI_METHOD {
  constant: boolean;
  name: string;
  inputs: any[];
  stateMutability: string;
  outputs: any[];
  type: string;
}

export interface WIDGET {
  id: string;
  type: "input" | "label" | "button" | "wrapper";
  text?: string;
  placeholder?: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  children: WIDGET[];
  parent?: string;
  styles: [];
  data: any;
  externalValue?: null | string | number;
}

export interface WIDGET_RENDER_PROPS {
  widgetData: WIDGET;
}
