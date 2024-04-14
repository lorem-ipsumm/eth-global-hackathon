import { atom } from "jotai";
import { ABI_METHOD, COMPONENT } from "./interfaces";

// the current contract address
export const activeContractAtom = atom<string | null>(null);
// the current view for the sidebar
export const activeSidebarViewAtom = atom<number>(0);
// the read methods of the contract
export const abiReadMethodsAtom = atom<ABI_METHOD[]>([]);
// the write methods of the contract
export const abiWriteMethodsAtom = atom<ABI_METHOD[]>([]);
export const fullAbiAtom = atom<ABI_METHOD[]>([]);
// the components on the canvas
export const canvasComponentsAtom = atom<COMPONENT[]>([]);
