import { useState } from "react";
import { Briefcase, Loader, Plus, Trash, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import apis from "../../configs/api";
import toast from "react-hot-toast";

const ProfessionalExpreience = ({ data, onChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingIndex, setGeneratingIndex] = useState(-1);
  const { accessToken } = useSelector((state) => state.auth);
  const handleAddExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const handleRemoveExperience = (index) => {
    const removed = data.filter((_, i) => i !== index);
    onChange(removed);
  };

  const handleUpdateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handlegenerateSummary = async (index) => {
    if (!accessToken) {
      toast.error("You must be logged in to enhance job descriptions.");
      return;
    }

    try {
      setIsGenerating(true);
      setGeneratingIndex(index);
      const experience = data[index];
      const prompt = `Enhance this job description: "${experience.description}" for the position of ${experience.position} at ${experience.company}.`;

      const response = await apis.post(
        "/api/ai/enhance-job-sum",
        { userContent: prompt },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      const enhanced = response?.data?.enhancedContent;
      const enhancedText =
        typeof enhanced === "object" ? enhanced.content : enhanced;

      handleUpdateExperience(index, "description", enhancedText);
      toast.success("Job description enhanced!");
    } catch (error) {
      console.error("Error enhancing job description:", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-100">
              Professional Experience
            </h3>
            <p className="text-sm text-gray-400">
              Add your professional experience here
            </p>
          </div>
          <button
            onClick={handleAddExperience}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br bg-indigo-500 text-white shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-4 h-4 group-hover:animate-pulse text-yellow-300" />
            <p className="text-xs font-medium tracking-wide">Add Experience</p>
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-300 border border-dashed border-gray-500 rounded-lg">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-base">No work experience added yet.</p>
            <p className="text-sm text-gray-400 mt-1">
              Click "Add Experience" to get started
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((experience, index) => (
              <div
                key={index}
                className="p-5 border border-gray-700 rounded-lg bg-gray-900 space-y-4 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-purple-400">
                    Experience #{index + 1}
                  </h4>
                  <button
                    onClick={() => handleRemoveExperience(index)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    value={experience.company || ""}
                    onChange={(e) =>
                      handleUpdateExperience(index, "company", e.target.value)
                    }
                    type="text"
                    placeholder="Company Name"
                    className="px-4 py-3 text-sm bg-gray-800 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    value={experience.position || ""}
                    onChange={(e) =>
                      handleUpdateExperience(index, "position", e.target.value)
                    }
                    type="text"
                    placeholder="Job Title"
                    className="px-4 py-3 text-sm bg-gray-800 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    value={experience.start_date || ""}
                    onChange={(e) =>
                      handleUpdateExperience(
                        index,
                        "start_date",
                        e.target.value
                      )
                    }
                    type="month"
                    className="px-4 py-3 text-sm bg-gray-800 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    value={experience.end_date || ""}
                    onChange={(e) =>
                      handleUpdateExperience(index, "end_date", e.target.value)
                    }
                    type="month"
                    disabled={experience.is_current}
                    className={`px-4 py-3 text-sm border rounded-md ${
                      experience.is_current
                        ? "bg-gray-700 text-gray-400 border-gray-500 cursor-not-allowed"
                        : "bg-gray-800 text-white border-gray-600"
                    } placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                </div>

                <label className="inline-flex items-center gap-2 cursor-pointer select-none text-sm text-gray-200 mt-1">
                  <input
                    type="checkbox"
                    checked={experience.is_current || false}
                    onChange={(e) =>
                      handleUpdateExperience(
                        index,
                        "is_current",
                        e.target.checked
                      )
                    }
                    className="h-5 w-5 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  />
                  <span className="text-sm text-gray-400">
                    Currently Working here
                  </span>
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label>Job Description</label>
                    <button
                      disabled={generatingIndex === index}
                      onClick={() => handlegenerateSummary(index)}
                      className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-600 text-white shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
                    >
                      {generatingIndex === index ? (
                        <div className="flex items-center gap-2">
                          <Loader
                            size={16}
                            className="animate-spin text-yellow-300"
                          />
                          <p className="text-xs font-medium tracking-wide">
                            Enhancing...
                          </p>
                        </div>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 group-hover:animate-pulse text-yellow-300" />
                          <p className="text-xs font-medium tracking-wide">
                            AI Enhance
                          </p>
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    name=""
                    id=""
                    value={experience.description || ""}
                    onChange={(e) =>
                      handleUpdateExperience(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows={4}
                    className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-purple-600 focus:border-indigo-600 outline-none transition-colors resize-none h-20 md:h-32"
                    placeholder="Write a compelling professional summary that highlights your key strengths and career objectives"
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

export default ProfessionalExpreience;
