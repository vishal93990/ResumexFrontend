import { useState, useEffect } from "react";
import {
  FilePenLineIcon,
  Pen,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  X,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apis from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { user, accessToken } = useSelector((state) => state.auth);

  const colors = ["#7c3aed", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setshowCreateResume] = useState(false);
  const [showUploadResume, setshowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [resumeId, setresumeId] = useState("res123");
  const [EditResumeid, setEditResumeId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoadResumes = async () => {
    try {
      const { data } = await apis.get("/api/users/resumes", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAllResumes(data.resumes);
    } catch (error) {}
  };

  const handleCreateResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await apis.post(
        "/api/resumes/create",
        { title },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setshowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleUploddResume = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await apis.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("resume uploaded successfully");
      setTitle("");
      setResume(null);
      setshowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error("resume Uploading failed");
    }
  };

  const handleEditResumeId = async (e) => {
    try {
      e.preventDefault();
      setEditResumeId(false);
      const { data } = await apis.put(
        "/api/resumes/update",
        {
          resumeId: EditResumeid,
          resumeData: title,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAllResumes(
        allResumes.map((resume) =>
          resume._id === EditResumeid ? { ...resume, title } : resume
        )
      );
      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume"
      );
      if (confirm) {
        const { data } = await apis.delete(`/api/resumes/delete/${resumeId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setAllResumes((prev) =>
          prev.filter((resume) => resume._id !== resumeId)
        );
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    handleLoadResumes();
  }, []);

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="w-[800px] h-[800px] bg-gradient-to-r from-indigo-800/40 via-purple-700/30 to-transparent blur-[160px] opacity-70 absolute -top-[300px] left-1/2 -translate-x-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 py-10">
        <p className="text-2xl font-semibold mb-8 text-center md:text-left bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent hidden">
          Welcome, John Doe
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-12">
          <button
            onClick={() => setshowCreateResume(!showCreateResume)}
            className="w-44 h-48 bg-neutral-900/50 border border-neutral-700 rounded-xl flex flex-col items-center justify-center gap-3 text-purple-500 hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:border-indigo-500 hover:scale-[1.02] transition-all duration-300 group backdrop-blur"
          >
            <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full shadow-[0_0_20px_rgba(99,102,241,0.35)]" />
            <p className="text-sm group-hover:text-indigo-400 font-medium transition-colors">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setshowUploadResume(true)}
            className="w-44 h-48 bg-neutral-900/50 border border-neutral-700 rounded-xl flex flex-col items-center justify-center gap-3 text-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.3)] hover:border-purple-500 hover:scale-[1.02] transition-all duration-300 group backdrop-blur"
          >
            <UploadCloudIcon className="size-11 p-2.5 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full shadow-[0_0_20px_rgba(99,102,241,0.35)]" />
            <p className="text-sm group-hover:text-purple-400 font-medium transition-colors">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-t border-neutral-700/60 mb-10" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <div
                onClick={() => {
                  navigate(`/app/builder/${resume._id}`);
                }}
                key={index}
                style={{
                  boxShadow: `0 0 15px ${baseColor}55`,
                  borderColor: baseColor,
                }}
                className="relative h-48 rounded-lg w-full border bg-neutral-900/50 flex flex-col items-center justify-center gap-3 group hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(99,102,241,0.4)] transition-all duration-300 text-center"
              >
                <FilePenLineIcon
                  className="size-7 group-hover:rotate-3 transition-transform duration-300"
                  style={{ color: baseColor }}
                />
                <p
                  style={{ color: baseColor }}
                  className="font-medium px-2 truncate"
                >
                  {resume.title}
                </p>

                <p className="absolute bottom-2 text-[11px] text-neutral-400">
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-2 right-2 space-x-3 z-30"
                >
                  <button
                    onClick={() => deleteResume(resume._id)}
                    className=" opacity-0 group-hover:opacity-100 transition-all duration-300 text-neutral-400 hover:text-red-400 cursor-pointer"
                  >
                    <TrashIcon className="size-5" />
                  </button>
                  <button
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className=" opacity-0 group-hover:opacity-100 transition-all duration-300 text-neutral-400 hover:text-red-400 cursor-pointer"
                  >
                    <Pen className="size-5" />
                  </button>
                </div>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 rounded-xl blur-lg transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${baseColor}, transparent 70%)`,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
        {showCreateResume && (
          <form
            onSubmit={handleCreateResume}
            onClick={() => {
              setshowCreateResume(false);
            }}
            className="fixed inset-0 bg-black/10 backdrop-blur bg-opacity-50 -10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="text-center relative bg-black  shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-sm font-semibold text-center mb-6">
                Create a Resume
              </h2>
              <input
                type="text"
                placeholder="Enter resume title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="border border-gray-500 rounded-lg w-full px-4 py-2 mb-4 focus:border-purple-500 ring-indigo-600"
                required
              />
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 px-5 py-2 rounded-full font-semibold text-sm md:text-medium transition-all duration-300 w-full mt-5">
                Create Resume
              </button>
              <X
                className="absolute top-4 right-4 transition-colors text-gray-300 hover:text-gray-500 "
                onClick={() => {
                  setshowCreateResume(!showCreateResume);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={handleUploddResume}
            onClick={() => {
              setshowUploadResume(false);
            }}
            className="fixed inset-0 bg-black/10 backdrop-blur bg-opacity-50 -10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="text-center relative bg-black  shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-sm font-semibold text-center mb-6">
                Upload Resume
              </h2>
              <input
                type="text"
                placeholder="Enter resume title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="border border-gray-500 rounded-lg w-full px-4 py-2 mb-4 focus:border-purple-500 ring-indigo-600"
                required
              />
              <div>
                <label
                  htmlFor="resume-Input"
                  className="block text-sm text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center gap-2 border group text-gray-300 border-dashed rounded-md p-8 my-4 hover:border-purple-500 hover:text-indigo-600 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-purple-500 hover:text-indigo-600 font-semibold break-words text-center max-w-xs">
                        {resume.name}
                      </p>
                    ) : (
                      <>
                        <UploadCloudIcon />
                        <p>Upload Resume</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  id="resume-Input"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>

              <button
                disabled={loading}
                className={`flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 
    hover:from-indigo-700 hover:to-purple-700 px-5 py-2 rounded-full 
    font-semibold text-sm md:text-medium transition-all duration-300 w-full mt-5 
    ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span>Uploading...</span>
                  </>
                ) : (
                  "Upload Resume"
                )}
              </button>

              <X
                className="absolute top-4 right-4 transition-colors text-gray-300 hover:text-gray-500 "
                onClick={() => {
                  setshowUploadResume(!showUploadResume);
                  setResume(null);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {EditResumeid && (
          <form
            onSubmit={handleEditResumeId}
            onClick={() => {
              setEditResumeId(false);
            }}
            className="fixed inset-0 bg-black/10 backdrop-blur bg-opacity-50 -10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="text-center relative bg-black  shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-sm font-semibold text-center mb-6">
                Edit Resume Title
              </h2>
              <input
                type="text"
                placeholder="Enter resume title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="border border-gray-500 rounded-lg w-full px-4 py-2 mb-4 focus:border-purple-500 ring-indigo-600"
                required
              />
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 px-5 py-2 rounded-full font-semibold text-sm md:text-medium transition-all duration-300 w-full mt-5">
                Upadate
              </button>
              <X
                className="absolute top-4 right-4 transition-colors text-gray-300 hover:text-gray-500 "
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
