import React from "react";
import {
  Zap,
  ThumbsUp,
  Settings,
  Palette,
  Eye,
  Download,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "AI‑Powered Summaries",
    desc: "Generate professional experience summaries instantly using AI — tailored to your role, industry, and tone.",
  },
  {
    icon: ThumbsUp,
    title: "Modern Templates",
    desc: "Choose from a library of sleek, ATS‑friendly resume templates crafted for any profession.",
  },
  {
    icon: Settings,
    title: "Fully Customizable",
    desc: "Easily tweak fonts, sections, and layouts using our intuitive builder built with Tailwind utilities.",
  },
  {
    icon: Palette,
    title: "Color Themes",
    desc: "Apply curated color palettes to personalize your resume’s visual identity.",
  },
  {
    icon: Download,
    title: "Download & Share",
    desc: "Export high‑quality PDFs or share a live interactive link instantly.",
  },
  {
    icon: Eye,
    title: "Live Preview",
    desc: "See real‑time edits as you work — what you see is exactly what you’ll get.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative bg-black text-white py-20 md:py-28 px-6 overflow-hidden"
    >
      {/* background glow */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[500px] h-[500px] bg-indigo-700/20 blur-[120px] rounded-full mt-16" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <span className="inline-block bg-indigo-900/50 text-indigo-300 text-xs font-medium tracking-wide px-4 py-1 rounded-full mb-6 uppercase">
          Features
        </span>

        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
          Build your resume like you build your career
        </h2>

        <p className="text-neutral-400 text-base md:text-lg mb-16 max-w-2xl mx-auto">
          Smart, elegant tools that help you create, refine, and showcase your
          perfect professional resume.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-left">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="group bg-neutral-900/50 border border-neutral-700 rounded-xl p-6 md:p-8 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/60 hover:bg-neutral-900/70"
            >
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110 bg-indigo-500/10">
                <Icon
                  size={22}
                  strokeWidth={2}
                  className="text-indigo-400 transition-colors group-hover:text-indigo-300"
                />
              </div>

              <h3 className="text-lg font-semibold text-indigo-100 mb-2">
                {title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;