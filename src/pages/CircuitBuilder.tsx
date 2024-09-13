import React, { useState } from "react";
import CircuitCanvas from "../features/circuit/components/CircuitCanvas";
import DraggableSymbol from "../components/DraggableSymbol";
import { electricalSymbols } from "@/const/electricalSymbols";
import { CircuitComponent, Connection } from "@/features/circuit/types/circuitTypes";

const CircuitBuilder: React.FC = () => {
  const [components, setComponents] = useState<CircuitComponent[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  const handleAddComponent = (newComponent: CircuitComponent) => {
    setComponents((prevComponents) => [...prevComponents, newComponent]);
  };

  const handleAddConnection = (newConnection: Connection) => {
    setConnections((prevConnections) => [...prevConnections, newConnection]);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">電気用図記号</h2>
        <div className="grid grid-cols-2 gap-4">
          {electricalSymbols.map((symbol) => (
            <DraggableSymbol key={symbol.id} symbol={symbol} />
          ))}
        </div>
      </div>
      <div className="w-3/4 p-4 bg-white">
        <CircuitCanvas
          components={components}
          connections={connections}
          onAddComponent={handleAddComponent}
          onAddConnection={handleAddConnection}
        />
      </div>
    </div>
  );
};

export default CircuitBuilder;