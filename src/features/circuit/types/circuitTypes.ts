export interface Point {
  x: number;
  y: number;
}

export interface ElectricalSymbol {
  id: string;
  name: string;
  image: string;
  type:
    | "power_supply"
    | "switch"
    | "light_bulb"
    | "resistor"
    | "capacitor"
    | "inductor"
    | "voltage_source"
    | "current_source"
    | "ground";
  value?: number;
  unit?: string;
  x?: number;
  y?: number;
}

export interface CircuitComponent extends ElectricalSymbol {
  position: Point;
  connections: Point[];
}

export interface Circuit {
  components: CircuitComponent[];
  connections: Connection[];
}

export interface Connection {
  from: {
    componentId: string;
    pointIndex: number;
  };
  to: {
    componentId: string;
    pointIndex: number;
  };
}
