import React from "react";
import { Folder, Plus, Trash ,Sparkles} from "lucide-react";

const Projects = ({ data, onChange }) => {
  const handleAddProject = () => {
    const newProject = {
      name: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const handleRemoveProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleUpdateProject = (index, field, value) => {
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
              Projects
            </h3>
            <p className="text-sm text-gray-400">
              Showcase your best personal or academic projects
            </p>
          </div>
          <button
            onClick={handleAddProject}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-600 text-white shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-4 h-4 group-hover:animate-pulse text-yellow-300" />
            <p className="text-xs font-medium tracking-wide">Add Project</p>
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-300 border border-dashed border-gray-500 rounded-lg">
            <Folder className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-base">No projects added yet.</p>
            <p className="text-sm text-gray-400 mt-1">
              Click "Add Project" to begin
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((project, index) => (
              <div
                key={index}
                className="p-5 border border-gray-700 rounded-lg bg-gray-900 space-y-4 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-purple-400">
                    Project #{index + 1}
                  </h4>
                  <button
                    onClick={() => handleRemoveProject(index)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    value={project.name || ""}
                    onChange={(e) =>
                      handleUpdateProject(index, "name", e.target.value)
                    }
                    type="text"
                    placeholder="Project Title"
                    className="w-full px-4 py-3 text-sm bg-gray-800 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    value={project.type || ""}
                    onChange={(e) =>
                      handleUpdateProject(index, "type", e.target.value)
                    }
                    type="text"
                    placeholder="Project Type"
                    className="w-full px-4 py-3 text-sm bg-gray-800 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="flex items-center justify-between">
                    <label>Project Description</label>
                    <button className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-600 text-white shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300">
                      <Sparkles className="w-4 h-4 group-hover:animate-pulse text-yellow-300" />
                      <p className="text-xs font-medium tracking-wide">
                        AI Enhance
                      </p>
                    </button>
                  </div>
                  <textarea
                    value={project.description || ""}
                    onChange={(e) =>
                      handleUpdateProject(index, "description", e.target.value)
                    }
                    rows={4}
                    className="w-full p-3 px-4 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-purple-600 focus:border-indigo-600 outline-none transition-colors resize-none h-20 md:h-28"
                    placeholder="Describe what the project is about, tools used, and your contributions..."
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

export default Projects;
