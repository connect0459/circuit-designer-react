import React from "react";
import { useDrag } from "react-dnd";
import { ElectricalSymbol } from "../features/circuit/types/circuitTypes";

interface DraggableSymbolProps {
  symbol: ElectricalSymbol;
}

const DraggableSymbol: React.FC<DraggableSymbolProps> = ({ symbol }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "symbol",
    item: symbol,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 border rounded cursor-move bg-white ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <img src={symbol.image} alt={symbol.name} className="w-12 h-12 mx-auto" />
      <p className="text-center mt-2 text-sm">{symbol.name}</p>
    </div>
  );
};

export default DraggableSymbol;
