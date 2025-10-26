import { Loader, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import apis from "../../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummary = ({ data, onChange, setReumeData }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlegenerateSummary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `enhance my professional summary "${data}"`;
      const response = await apis.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      // console.log("Enhanced content:", response.data.enhancedContent);

      setReumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedContent.content,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between ">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-200">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-400 ">
            Add summary for your resume here
          </p>
        </div>
        <button
          disabled={isGenerating}
          onClick={handlegenerateSummary}
          className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-600 text-white shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <Loader size={16} className="animate-spin text-yellow-300" />
              <p className="text-xs font-medium tracking-wide">Enhancing...</p>
            </div>
          ) : (
            <>
              <Sparkles className="w-4 h-4 group-hover:animate-pulse text-yellow-300" />
              <p className="text-xs font-medium tracking-wide">AI Enhance</p>
            </>
          )}
        </button>
      </div>
      <div className="mt-6">
        <textarea
          name=""
          id=""
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-purple-600 focus:border-indigo-600 outline-none transition-colors resize-none h-20 md:h-34"
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives"
        />
        <p className="text-[12px] text-gray-500">
          Tip:keep it concise (3-4 senteces) and focus on your most relevant
          achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
