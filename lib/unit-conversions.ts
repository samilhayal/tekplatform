export interface UnitCategory {
  name: string;
  units: Unit[];
}

export interface Unit {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export const unitCategories: Record<string, UnitCategory> = {
  length: {
    name: "Uzunluk",
    units: [
      {
        name: "Metre",
        symbol: "m",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: "Kilometre",
        symbol: "km",
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
      },
      {
        name: "Santimetre",
        symbol: "cm",
        toBase: (v) => v / 100,
        fromBase: (v) => v * 100,
      },
      {
        name: "Milimetre",
        symbol: "mm",
        toBase: (v) => v / 1000,
        fromBase: (v) => v * 1000,
      },
      {
        name: "Mil",
        symbol: "mi",
        toBase: (v) => v * 1609.34,
        fromBase: (v) => v / 1609.34,
      },
      {
        name: "Yard",
        symbol: "yd",
        toBase: (v) => v * 0.9144,
        fromBase: (v) => v / 0.9144,
      },
      {
        name: "Feet",
        symbol: "ft",
        toBase: (v) => v * 0.3048,
        fromBase: (v) => v / 0.3048,
      },
      {
        name: "İnch",
        symbol: "in",
        toBase: (v) => v * 0.0254,
        fromBase: (v) => v / 0.0254,
      },
    ],
  },
  weight: {
    name: "Ağırlık",
    units: [
      {
        name: "Kilogram",
        symbol: "kg",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: "Gram",
        symbol: "g",
        toBase: (v) => v / 1000,
        fromBase: (v) => v * 1000,
      },
      {
        name: "Miligram",
        symbol: "mg",
        toBase: (v) => v / 1000000,
        fromBase: (v) => v * 1000000,
      },
      {
        name: "Ton",
        symbol: "t",
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
      },
      {
        name: "Pound",
        symbol: "lb",
        toBase: (v) => v * 0.453592,
        fromBase: (v) => v / 0.453592,
      },
      {
        name: "Ons",
        symbol: "oz",
        toBase: (v) => v * 0.0283495,
        fromBase: (v) => v / 0.0283495,
      },
    ],
  },
  volume: {
    name: "Hacim",
    units: [
      {
        name: "Litre",
        symbol: "L",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: "Mililitre",
        symbol: "mL",
        toBase: (v) => v / 1000,
        fromBase: (v) => v * 1000,
      },
      {
        name: "Metreküp",
        symbol: "m³",
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
      },
      {
        name: "Galon (US)",
        symbol: "gal",
        toBase: (v) => v * 3.78541,
        fromBase: (v) => v / 3.78541,
      },
      {
        name: "Quart",
        symbol: "qt",
        toBase: (v) => v * 0.946353,
        fromBase: (v) => v / 0.946353,
      },
    ],
  },
  temperature: {
    name: "Sıcaklık",
    units: [
      {
        name: "Celsius",
        symbol: "°C",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: "Fahrenheit",
        symbol: "°F",
        toBase: (v) => (v - 32) * 5 / 9,
        fromBase: (v) => (v * 9 / 5) + 32,
      },
      {
        name: "Kelvin",
        symbol: "K",
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
      },
    ],
  },
  speed: {
    name: "Hız",
    units: [
      {
        name: "Metre/Saniye",
        symbol: "m/s",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: "Kilometre/Saat",
        symbol: "km/h",
        toBase: (v) => v / 3.6,
        fromBase: (v) => v * 3.6,
      },
      {
        name: "Mil/Saat",
        symbol: "mph",
        toBase: (v) => v * 0.44704,
        fromBase: (v) => v / 0.44704,
      },
      {
        name: "Knot",
        symbol: "kn",
        toBase: (v) => v * 0.514444,
        fromBase: (v) => v / 0.514444,
      },
    ],
  },
  data: {
    name: "Veri Depolama",
    units: [
      {
        name: "Byte",
        symbol: "B",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: "Kilobyte",
        symbol: "KB",
        toBase: (v) => v * 1024,
        fromBase: (v) => v / 1024,
      },
      {
        name: "Megabyte",
        symbol: "MB",
        toBase: (v) => v * 1024 * 1024,
        fromBase: (v) => v / (1024 * 1024),
      },
      {
        name: "Gigabyte",
        symbol: "GB",
        toBase: (v) => v * 1024 * 1024 * 1024,
        fromBase: (v) => v / (1024 * 1024 * 1024),
      },
      {
        name: "Terabyte",
        symbol: "TB",
        toBase: (v) => v * 1024 * 1024 * 1024 * 1024,
        fromBase: (v) => v / (1024 * 1024 * 1024 * 1024),
      },
    ],
  },
};

export const convertUnit = (
  value: number,
  fromUnit: Unit,
  toUnit: Unit
): number => {
  const baseValue = fromUnit.toBase(value);
  return toUnit.fromBase(baseValue);
};
