"use client";
import { Rnd } from "react-rnd";

const Canvas = () => {
  return (
    <div className="h-full w-4/5">
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
        bounds={"parent"}
        resizeGrid={[25, 25]}
        dragGrid={[25, 25]}
        className="border border-gray-300 p-2"
      >
        <input
          placeholder="Enter text here"
          className="h-full w-full outline-none"
        />
      </Rnd>
    </div>
  );
};

export default Canvas;
