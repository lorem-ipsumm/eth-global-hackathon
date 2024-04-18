"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import Canvas from "~/app/editor/Canvas";
import { useWidgetStorage } from "~/app/hooks/useWidgetStorage";
import { canvasWidgetsAtom } from "~/app/utils.ts/atoms";

const Page = ({ params }: { params: { hash: string } }) => {
  const [, setCanvasWidgets] = useAtom(canvasWidgetsAtom);
  const storage = useWidgetStorage();

  useEffect(() => {
    loadWidgets();
  }, []);

  const loadWidgets = async () => {
    const widgets = await storage.loadWidgetData(params.hash);
    console.log(widgets)
    if (widgets) setCanvasWidgets(widgets);
  };

  return (
    <div className="h-screen w-screen">
      <Canvas />
    </div>
  );
};

export default Page;
