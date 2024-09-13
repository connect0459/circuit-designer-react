import type { ElectricalSymbol } from "@/features/circuit/types/circuitTypes";
// assets
import powerSupplySymbol from "@/assets/symbols/power_supply.png";
import switchSymbol from "@/assets/symbols/switch.png";
import lightBulbSymbol from "@/assets/symbols/light_bulb.png";
import resistorSymbol from "@/assets/symbols/resistor.png";

export const electricalSymbols: ElectricalSymbol[] = [
  {
    id: "powerSupply",
    name: "電源",
    image: powerSupplySymbol,
    type: "power_supply",
    value: 100,
    unit: "V"
  },
  {
    id: "switch",
    name: "スイッチ",
    image: switchSymbol,
    type: "switch"
  },
  {
    id: "lightBulb",
    name: "電球",
    image: lightBulbSymbol,
    type: "light_bulb"
  },
  {
    id: "resistor",
    name: "抵抗器",
    image: resistorSymbol,
    type: "resistor",
    value: 10,
    unit: "Ω"
  }
];
