import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertTriangle, Loader, Download } from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import ResumePreview from "../components/ResumeBuilder/ResumePreview";
import apis from "../configs/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Preview = () => {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useSelector((state) => state.auth);
  const handleLoadResumeData = async () => {
    try {
      const { data } = await apis.get(`/api/resumes/get/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setResumeData(data.resume);
    } catch (error) {
      toast.error("failed to show resume preview", error.message);
    }
  };

  useEffect(() => {
    handleLoadResumeData();
  }, []);

  const handleDownload = () => {
    window.print();
  };

  return resumeData ? (
    <div className="bg-slate-100">
      {/* Header with download button */}
      <div className="flex justify-end items-center max-w-3xl mx-auto pt-8 pb-2 px-4 print:hidden">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 shadow transition-all duration-300"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>

      {/* Resume preview */}
      <div className="max-w-3xl mx-auto py-6 px-4 bg-white print:p-0">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          className="print:block"
        />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        <div className="h-screen w-full flex items-center justify-center bg-gray-900">
          <Loader className="animate-spin text-purple-500 w-8 h-8" />
        </div>
      ) : (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-950 text-white px-4">
          <AlertTriangle className="text-yellow-400 w-16 h-16 mb-4 animate-pulse" />
          <h1 className="text-3xl font-bold mb-2 text-red-500">
            Invalid Resume ID
          </h1>
          <p className="text-gray-400 mb-6 text-center max-w-md">
            The resume you're trying to access doesn't exist, might have been
            deleted, or the link is broken.
          </p>

          <Link
            to="/app"
            className="px-6 py-3 rounded-md bg-purple-600 hover:bg-purple-700 transition text-white text-sm font-medium"
          >
            Go back to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default Preview;
