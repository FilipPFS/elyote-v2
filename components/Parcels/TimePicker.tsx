"use client";

import { Range } from "react-range";

const MIN = 9 * 60;
const MAX = 21 * 60;
const MIN_GAP = 2 * 60;

function toEuropeanTime(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export default function TimeRangeSlider({
  values,
  onChange,
}: {
  values: number[];
  onChange: (values: number[]) => void;
}) {
  function handleChange(newValues: number[]) {
    const [start, end] = newValues;
    if (end - start < MIN_GAP) return;
    onChange(newValues);
  }

  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">Plage horaire</h2>

      <div className="mb-4 text-lg">
        {toEuropeanTime(values[0])} — {toEuropeanTime(values[1])}
      </div>

      <Range
        step={60}
        min={MIN}
        max={MAX}
        values={values}
        onChange={handleChange}
        renderTrack={({ props, children }) => {
          const { ...rest } = props;

          return (
            <div {...rest} className="h-2 w-full bg-gray-300 rounded relative">
              <div
                className="absolute h-full bg-blue-500 rounded"
                style={{
                  left: `${((values[0] - MIN) / (MAX - MIN)) * 100}%`,
                  width: `${((values[1] - values[0]) / (MAX - MIN)) * 100}%`,
                }}
              />
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          const { key, ...rest } = props;

          return (
            <div
              key={key}
              {...rest}
              className="w-4 h-4 bg-blue-600 rounded-full shadow"
            />
          );
        }}
      />
    </div>
  );
}
