"use client";
import Draggable from 'react-draggable';

const View = () => {
  return (
    <div className="w-4/5 h-full">
      <Draggable
        axis='both'
        allowAnyClick
        defaultPosition={{x: 300, y: 130}}
        grid={[25, 25]}
        scale={1}
        bounds='parent'
      >
        <div className="w-60 h-60 bg-blue-500 rounded-md shadow-xl"></div>
      </Draggable>
    </div>
  );
};

export default View;
