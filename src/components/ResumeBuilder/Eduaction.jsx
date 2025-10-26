import React from "react";
import { GraduationCap, Plus, Trash } from "lucide-react";

const Education = ({ data, onChange }) => {
  const handleAddEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      gpa: "",
      graduation_date: "",
    };
    onChange([...data, newEducation]);
  };

  const handleRemoveEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleUpdateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-100">
              Education
            </h3>
            <p className="text-sm text-gray-400">
              Add your academic qualifications here
            </p>
          </div>
          <button
            onClick={handleAddEducation}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-600 text-white shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-4 h-4 group-hover:animate-pulse text-yellow-300" />
            <p className="text-xs font-medium tracking-wide">Add Education</p>
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-300 border border-dashed border-gray-500 rounded-lg">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-base">No education added yet.</p>
            <p className="text-sm text-gray-400 mt-1">
              Click "Add Education" to get started
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((edu, index) => (
              <div
                key={index}
                className="p-5 border border-gray-700 rounded-lg bg-gray-900 space-y-4 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-purple-400">
                    Education #{index + 1}
                  </h4>
                  <button
                    onClick={() => handleRemoveEducation(index)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    value={edu.institution || ""}
                    onChange={(e) =>
                      handleUpdateEducation(index, "institution", e.target.value)
                    }
                    type="text"
                    placeholder="Institution Name"
                    className="px-4 py-3 text-sm bg-gray-800 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    value={edu.degree || ""}
                    onChange={(e) =>
                      handleUpdateEducation(index, "degree", e.target.value)
                    }
                    type="text"
                    placeholder="Degree"
                    className="px-4 py-3 text-sm bg-gray-800 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    value={edu.field || ""}
                    onChange={(e) =>
                      handleUpdateEducation(index, "field", e.target.value)
                    }
                    type="text"
                    placeholder="Field of Study"
                    className="px-4 py-3 text-sm bg-gray-800 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    value={edu.gpa || ""}
                    onChange={(e) =>
                      handleUpdateEducation(index, "gpa", e.target.value)
                    }
                    type="text"
                    placeholder="GPA (optional)"
                    className="px-4 py-3 text-sm bg-gray-800 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    value={edu.graduation_date || ""}
                    onChange={(e) =>
                      handleUpdateEducation(index, "graduation_date", e.target.value)
                    }
                    type="month"
                    className="px-4 py-3 text-sm bg-gray-800 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;
