import { Check, Layout } from "lucide-react";
import React, { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChnage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, traditional resume format with clear sections and professional typography",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "Sleek design with strategic use of color and modern font choices",
    },
    {
      id: "minimal-image",
      name: "Minimal_image",
      preview: "Minimal design with a single image and clean typography",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Ultra-clean design that puts your content front and center",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1 text-sm text-purple-300 bg-gradient-to-br from-purple-800 to-black border border-purple-600 rounded-lg transition-all hover:ring-2 hover:ring-purple-500 px-3 py-2"
      >
        <Layout size={14} />
        <span>Templates</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-72 z-10 p-3 space-y-3 bg-black border border-purple-700 rounded-lg shadow-lg">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChnage(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 rounded-md transition-all cursor-pointer 
                ${
                  selectedTemplate === template.id
                    ? "bg-purple-700 border border-purple-400"
                    : "bg-gray-900 border border-gray-700 hover:bg-purple-900 hover:border-purple-600"
                }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <h1 className="font-medium text-purple-100">{template.name}</h1>
                <div className="mt-2 p-2 bg-purple-800 text-purple-200 text-xs italic rounded">
                  {template.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
