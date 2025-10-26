import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { dummyResumeData } from "../../assets/assets";
import MouseFollower from "./MouseFollower";
import Classical from "../../assets/templates/Classical";
import { useSelector } from "react-redux";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [visibleSections, setVisibleSections] = useState([]);
  const accentColor = "#9810fa";

  useEffect(() => {
    if (!dummyResumeData) return;
    const baseData = dummyResumeData[0];
    setData(baseData);

    const keys = [
      "personal_info",
      "professional_summary",
      "experience",
      "skills",
      "education",
      "project",
    ];

    // progressive reveal with small delay chain
    keys.forEach((key, i) => {
      setTimeout(() => {
        setVisibleSections((prev) => [...prev, key]);
      }, (i + 1) * 1000);
    });
  }, []);

  if (!data) return null;

  return (
    <section className="relative min-h-screen bg-[#030014] text-white overflow-hidden">
      <MouseFollower />

      {/* background glow */}
      <div className="absolute inset-0 flex justify-center items-start -z-10">
        <div className="w-[900px] h-[900px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-full blur-3xl opacity-40 animate-pulse mt-[-400px]" />
      </div>

      {/* Navbar */}
      <nav className=" w-full max-w-7xl mx-auto flex justify-between items-center px-6 py-6">
        <Link to="/" className="text-3xl font-bold">
          Resumex
        </Link>
        <div className="flex gap-3">
          <Link
            to="/app?state=register"
            className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg font-semibold transition"
            hidden={user}
          >
            Get started
          </Link>
          <Link
            to="/login"
            className="border border-indigo-400 px-5 py-2 rounded-lg hover:bg-indigo-800 transition"
            hidden={user}
          >
            Login
          </Link>
          <Link
            to="/app"
            className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg font-semibold transition"
            hidden={!user}
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* HERO BODY */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12 mt-12 gap-10 ">
        {/* LEFT COLUMN */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center bg-neutral-800/70 border border-indigo-600/40 text-neutral-100 px-4 py-1.5 rounded-full text-xs mb-6 animate-pulse">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            See your resume build itself
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Build your <span className="text-indigo-500">AI‑powered</span>{" "}
            <br />
            resume effortlessly
          </h1>

          <p className="text-gray-300 text-base max-w-md mb-8 mx-auto md:mx-0">
            Simple, smart, and instant—see your professional resume form right
            before your eyes.
          </p>

          <Link
            to="/app?state=register"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex-1 flex justify-center md:justify-end">
          <div className="bg-neutral-800 shadow-2xl rounded-bl-2xl rounded-tr-2xl overflow-hidden transition-all duration-500 scale-[0.65] md:scale-[0.6] lg:scale-[0.7] border border-gray-500">
            <ResumeReveal
              data={data}
              visibleSections={visibleSections}
              accentColor={accentColor}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

function ResumeReveal({ data, visibleSections, accentColor }) {
  const allKeys = [
    "personal_info",
    "professional_summary",
    "experience",
    "skills",
    "education",
    "project",
  ];

  const partial = { ...data };
  allKeys.forEach((key) => {
    if (!visibleSections.includes(key)) {
      partial[key] = key === "personal_info" ? {} : [];
    }
  });

  return (
    <div
      className={`transition-all bg-neutral-800 duration-700 ${
        visibleSections.length ? "opacity-100" : "opacity-0"
      } `}
      style={{ width: "5.5in", minHeight: "7.2in" }}
    >
      <Classical data={partial} />
    </div>
  );
}

export default Hero;
