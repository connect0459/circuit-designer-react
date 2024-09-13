import React, { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import CircuitComponent from "./CircuitComponent";
import {
  ElectricalSymbol,
  CircuitComponent as CircuitComponentType,
  Connection,
  Point
} from "../types/circuitTypes";

interface CircuitCanvasProps {
  components: CircuitComponentType[];
  connections: Connection[];
  onAddComponent: (component: CircuitComponentType) => void;
  onAddConnection: (connection: Connection) => void;
}

const CircuitCanvas: React.FC<CircuitCanvasProps> = ({
  components,
  connections,
  onAddComponent,
  onAddConnection
}) => {
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);
  const [drawingConnection, setDrawingConnection] = useState<{
    start: Point;
    end: Point;
  } | null>(null);

  const [, drop] = useDrop(() => ({
    accept: "symbol",
    drop: (item: ElectricalSymbol, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (offset && canvasRect) {
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;
        onAddComponent({ ...item, position: { x, y }, connections: [] });
      }
    }
  }));

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        setCanvasRect(node.getBoundingClientRect());
      }
      drop(node);
    },
    [drop]
  );

  const handleMouseDown = (e: React.MouseEvent, componentId: string) => {
    const startPoint = { x: e.clientX, y: e.clientY };
    setDrawingConnection({ start: startPoint, end: startPoint });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (drawingConnection) {
      setDrawingConnection({
        ...drawingConnection,
        end: { x: e.clientX, y: e.clientY }
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent, componentId: string) => {
    if (drawingConnection) {
      // ここで接続を確立する論理を実装
      onAddConnection({
        from: { componentId: componentId, pointIndex: 0 },
        to: { componentId: "targetComponentId", pointIndex: 0 }
      });
      setDrawingConnection(null);
    }
  };

  return (
    <div
      ref={setRef}
      className="w-full h-full bg-white border-2 border-gray-300 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {components.map((component, index) => (
        <CircuitComponent
          key={index}
          component={component}
          onMouseDown={(e) => handleMouseDown(e, component.id)}
          onMouseUp={(e) => handleMouseUp(e, component.id)}
        />
      ))}
      {drawingConnection && (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <line
            x1={drawingConnection.start.x}
            y1={drawingConnection.start.y}
            x2={drawingConnection.end.x}
            y2={drawingConnection.end.y}
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
  );
};

export default CircuitCanvas;
