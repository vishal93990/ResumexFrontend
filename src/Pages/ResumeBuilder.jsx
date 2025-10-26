import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  EyeClosed,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share,
  Sparkles,
  User,
} from "lucide-react";

import PersonalInformtaion from "../components/ResumeBuilder/PersonalInformtaion";
import ResumePreview from "../components/ResumeBuilder/ResumePreview";
import TemplateSelector from "../components/ResumeBuilder/TemplateSelector";
import ColorPicker from "../components/ResumeBuilder/ColorPicker";
import ProfessionalSummary from "../components/ResumeBuilder/ProfessionalSummary";
import ProfessionalExpreience from "../components/ResumeBuilder/ProfessionalExpreience";
import Education from "../components/ResumeBuilder/Eduaction";
import Projects from "../components/ResumeBuilder/Projects";
import Skills from "../components/ResumeBuilder/Skills";
import { useSelector } from "react-redux";
import apis from "../configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { id } = useParams();
  const { accessToken } = useSelector((state) => state.auth);

  const [resumeId, setresumeId] = useState(id);
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
    professional_summary: "",
  });

  const section = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Professional Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "project", name: "Project", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const activeSection = section[activeSectionIndex];
  const navigate = useNavigate();

  const handleLoadExstingData = async () => {
    try {
      const { data } = await apis.get("/api/resumes/get/" + resumeId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
      }
    } catch (error) {
      toast.error("can't upload");
    }
  };

  useEffect(() => {
    handleLoadExstingData();
  }, [resumeId]);

  const handlePrev = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeSectionIndex < section.length - 1) {
      setActiveSectionIndex((prev) => prev + 1);
    }
  };
  const handleChangeResumeVisiblity = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public })
      );
      const { data } = await apis.get(`/api/resumes/update/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      toast.error("Error saving resume", error);
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share not supported on this browser.");
    }
  };

  const handleDownload = () => {
    navigate(`/view/${resumeId}`);
  };

  const saveResume = async () => {
    try {
      const updateResumeData = structuredClone(resumeData);

      if (typeof resumeData.personal_info.image === "object") {
        delete updateResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updateResumeData));

      if (removeBackground) {
        formData.append("removeBackground", "yes");
      }

      if (typeof resumeData.personal_info.image === "object") {
        formData.append("image", resumeData.personal_info.image);
      }

      const { data } = await apis.put("/api/resumes/update", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error(error?.response?.data?.message || "Error saving Resume data");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          to="/app"
          className="flex items-center text-sm text-purple-500 hover:underline"
        >
          <ArrowLeftIcon className="size-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>

      <div className="grid lg:grid-cols-14 gap-6">
        <div className="lg:col-span-6">
          <div className="border border-gray-700 rounded-lg bg-gray-900 p-6 shadow-lg">
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden mb-6">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-500"
                style={{
                  width: `${
                    (activeSectionIndex * 100) / (section.length - 1)
                  }%`,
                }}
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3">
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onChnage={(template) =>
                    setResumeData((prev) => ({ ...prev, template }))
                  }
                />
                <ColorPicker
                  selectedColor={resumeData.accent_color}
                  onChange={(color) =>
                    setResumeData((prev) => ({ ...prev, accent_color: color }))
                  }
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className={`flex items-center gap-1 px-3 py-2 text-sm rounded-md ${
                    activeSectionIndex === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "bg-purple-700 text-white hover:bg-purple-800"
                  }`}
                  disabled={activeSectionIndex === 0}
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  className={`flex items-center gap-1 px-3 py-2 text-sm rounded-md ${
                    activeSectionIndex === section.length - 1
                      ? "opacity-50 cursor-not-allowed"
                      : "bg-purple-700 text-white hover:bg-purple-800"
                  }`}
                  disabled={activeSectionIndex === section.length - 1}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-6 text-white">
              {activeSection.id === "personal" && (
                <PersonalInformtaion
                  data={resumeData.personal_info}
                  onChnage={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personal_info: data,
                    }))
                  }
                  removeBackground={removeBackground}
                  setRemoveBackground={setRemoveBackground}
                />
              )}

              {activeSection.id === "summary" && (
                <ProfessionalSummary
                  data={resumeData.professional_summary}
                  setReumeData={setResumeData}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      professional_summary: data,
                    }))
                  }
                />
              )}

              {activeSection.id === "experience" && (
                <ProfessionalExpreience
                  data={resumeData.experience}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      experience: data,
                    }))
                  }
                />
              )}

              {activeSection.id === "education" && (
                <Education
                  data={resumeData.education}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      education: data,
                    }))
                  }
                />
              )}

              {activeSection.id === "project" && (
                <Projects
                  data={resumeData.project}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      project: data,
                    }))
                  }
                />
              )}

              {activeSection.id === "skills" && (
                <Skills
                  data={resumeData.skills}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      skills: data,
                    }))
                  }
                />
              )}
            </div>
            <button
              onClick={saveResume}
              className="bg-gradient-to-br from-purple-500 to-indigo-600 text-gray-100 hover:ring hover:ring-indigo-500 transition-all rounded-md px-6 py-2 mt-6 text-sm"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 max-lg:mt-8">
          <div className="relative w-full">
            <div className="absolute bottom-4 left-0 right-0 px-4 flex items-center justify-end gap-3 z-10">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-gradient-to-br from-green-500 to-teal-500 rounded-md shadow hover:shadow-md hover:scale-105 transition-all duration-300"
              >
                <Share className="w-4 h-4" />
              </button>

              {/* <button
                onClick={handleChangeResumeVisiblity}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md transition-all duration-300 ${
                  resumeData.public
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                {resumeData.public ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOffIcon className="w-4 h-4" />
                )}
                {resumeData.public ? "Public" : "Private"}
              </button> */}

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 hover:shadow-md transition-all duration-300"
              >
                <Eye className="size-4" />
                Preview
              </button>
            </div>
          </div>
          <div className="print:block">
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
