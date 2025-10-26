import { Check, Palette } from "lucide-react";
import React, { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Red", value: "#EF4444" },
    { name: "Green", value: "#10B981" },
    { name: "Yellow", value: "#FACC15" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Orange", value: "#F97316" },
    { name: "Gray", value: "#6B7280" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Cyan", value: "#22D3EE" },
    { name: "Lime", value: "#84CC16" },
    { name: "Amber", value: "#F59E0B" },
    { name: "Rose", value: "#F43F5E" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-purple-300 bg-gradient-to-br from-purple-800 to-black border border-purple-700 hover:ring-2 ring-purple-500 px-3 py-2 rounded-lg transition-all"
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>
      </button>

      {isOpen && (
        <div className="grid grid-cols-4 w-64 gap-3 absolute top-full left-0 p-4 mt-2 z-10 bg-black border border-purple-800 rounded-lg shadow-xl">
          {colors.map((color) => (
            <div
              key={color.value}
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
              className="relative cursor-pointer group flex flex-col items-center"
            >
              <div
                className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === color.value
                    ? "ring-2 ring-purple-500"
                    : "border-gray-700 group-hover:border-purple-400"
                }`}
                style={{ backgroundColor: color.value }}
              ></div>

              {selectedColor === color.value && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Check size={16} className="text-white drop-shadow" />
                </div>
              )}

              <p className="text-xs mt-2 text-purple-200 text-center">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
