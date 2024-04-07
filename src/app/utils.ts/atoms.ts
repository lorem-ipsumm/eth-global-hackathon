import { atom } from "jotai";

// the current contract address
export const activeContractAtom = atom<string | null>(null);
// the current view for the sidebar
export const activeSidebarViewAtom = atom<number>(0);