import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const Classical = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };
  const accentColor = "#818cf8";
  return (
    <div className="max-w-2xl mx-auto px-4 py-4 bg-neutral-800 text-white leading-tight text-[0.78rem]">
      {/* Header */}
      <header
        className="text-center mb-4 pb-2 border-b border-gray-300"
        style={{ borderColor: accentColor }}
      >
        <h1
          className="text-xl font-bold mb-[2px] tracking-tight"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "John"}
        </h1>

        <div className="flex flex-wrap justify-center gap-2 text-[0.7rem] text-white">
          {data.personal_info?.email && (
            <div className="flex items-center gap-[2px]">
              <Mail className="size-3" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-[2px]">
              <Phone className="size-3" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-[2px]">
              <MapPin className="size-3" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-[2px]">
              <Linkedin className="size-3" />
              <span className="truncate max-w-[100px]">{data.personal_info.linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-[2px]">
              <Globe className="size-3" />
              <span className="truncate max-w-[100px]">{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-3">
          <h2
            className="text-[0.85rem] font-semibold mb-1 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>
          <p className="text-white leading-snug text-[0.75rem]">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-3">
          <h2
            className="text-[0.85rem] font-semibold mb-1 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Professional Experience
          </h2>

          <div className="space-y-2">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 pl-2" style={{ borderColor: accentColor }}>
                <div className="flex justify-between items-start mb-[2px]">
                  <div>
                    <h3 className="font-semibold text-[0.8rem] text-white">
                      {exp.position}
                    </h3>
                    <p className="text-white text-[0.7rem] font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <p className="text-[0.65rem] text-white">
                    {formatDate(exp.start_date)} –
                    {exp.is_current ? " Present" : ` ${formatDate(exp.end_date)}`}
                  </p>
                </div>
                {exp.description && (
                  <p className="text-white leading-tight text-[0.7rem] whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <section className="mb-3">
          <h2
            className="text-[0.85rem] font-semibold mb-1 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <ul className="space-y-1.5">
            {data.project.map((proj, index) => (
              <li key={index} className="border-l-2 pl-3" style={{ borderColor: accentColor }}>
                <p className="font-semibold text-white text-[0.78rem] leading-snug">
                  {proj.name}
                </p>
                <p className="text-white text-[0.7rem] leading-tight">
                  {proj.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-3">
          <h2
            className="text-[0.85rem] font-semibold mb-1 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-1.5">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-[0.78rem] text-white">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </h3>
                  <p className="text-white text-[0.7rem]">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-[0.65rem] text-white">GPA: {edu.gpa}</p>
                  )}
                </div>
                <p className="text-[0.65rem] text-white whitespace-nowrap">
                  {formatDate(edu.graduation_date)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2
            className="text-[0.85rem] font-semibold mb-1 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Core Skills
          </h2>

          <div className="flex flex-wrap gap-x-2 gap-y-1 text-[0.7rem]">
            {data.skills.map((skill, index) => (
              <span key={index} className="text-white">
                • {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Classical;