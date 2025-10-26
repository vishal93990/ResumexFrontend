import React, { useState } from "react";
import { Plus, Trash, Sparkles, Code } from "lucide-react";

const Skills = ({ data, onChange }) => {
  const [input, setInput] = useState("");

  const handleAddSkill = () => {
    if (input.trim() === "") return;
    onChange([...data, input.trim()]);
    setInput("");
  };

  const handleRemoveSkill = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-100">
              Core Skills
            </h3>
            <p className="text-sm text-gray-400">Add your top skills</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="e.g. JavaScript, React, Tailwind"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
            className="flex-1 px-4 py-3 text-sm bg-gray-800 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleAddSkill}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-600 text-white shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-medium">Add</span>
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-300 border border-dashed border-gray-500 rounded-lg">
            <Code className="w-10 h-10 mx-auto mb-2 text-gray-400" />
            <p className="text-base">No skills added yet.</p>
            <p className="text-sm text-gray-400 mt-1">
              Add your key strengths to get started
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {data.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-800 text-gray-100 border border-gray-600 px-3 py-1.5 rounded-full text-sm"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  <Trash className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
