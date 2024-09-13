import React from "react";
import { useDrag } from "react-dnd";
import { CircuitComponent as CircuitComponentType } from "../types/circuitTypes";

interface CircuitComponentProps {
  component: CircuitComponentType;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
}

const CircuitComponent: React.FC<CircuitComponentProps> = ({
  component,
  onMouseDown,
  onMouseUp
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "circuit-component",
    item: component,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left: component.position.x,
        top: component.position.y,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move"
      }}
      className="circuit-component"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <img src={component.image} alt={component.name} className="w-12 h-12" />
      <div className="text-xs text-center mt-1">{component.name}</div>
      {component.value && (
        <div className="text-xs text-center">
          {component.value} {component.unit}
        </div>
      )}
    </div>
  );
};

export default CircuitComponent;
