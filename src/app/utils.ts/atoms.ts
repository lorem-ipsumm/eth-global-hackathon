import { atom } from "jotai";
import { ABI_METHOD, WIDGET } from "./interfaces";

// the current contract address
export const activeContractAtom = atom<string | null>(null);
// the current view for the sidebar
export const activeSidebarViewAtom = atom<number>(0);
// the read methods of the contract
export const abiReadMethodsAtom = atom<ABI_METHOD[]>([]);
// the write methods of the contract
export const abiWriteMethodsAtom = atom<ABI_METHOD[]>([]);
// the full contract ABI
export const fullAbiAtom = atom<any>(null);
// the widget on the canvas
export const canvasWidgetsAtom = atom<Array<WIDGET>[]>([[]]);
