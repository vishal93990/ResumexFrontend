import React from "react";
import ModernTemplate from "../../assets/templates/ModernTemplate";
import ClassicTemplate from "../../assets/templates/ClassicTemplate";
import MinimalImageTemplate from "../../assets/templates/MinimalImageTemplate";
import MinimalTemplate from "../../assets/templates/MinimalTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "classic":
        return <ClassicTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full flex justify-center items-start ">
      <div
        id="resume-preview"
        className={`
          bg-white 
          rounded-md 
          shadow-lg 
          border border-gray-200 
          print:shadow-none 
          print:border-none 
          overflow-hidden
          transition-all 
          duration-300 
          ${classes}
        `}
      >
        {renderTemplate()}
      </div>

      {/* Responsive + print-specific styles */}
      <style jsx>{`
        /* ------------- Resume Layout ------------- */
        #resume-preview {
          width: 100%;
          max-width: 740px; /* Compact A4 feel */
          min-height: 1000px; /* Maintain visual shape */
          transform-origin: top center;
          background-color: white;
        }

        /* Slight scaling for smaller screens */
        @media screen and (max-width: 1024px) {
          #resume-preview {
            transform: scale(0.95);
          }
        }

        @media screen and (max-width: 768px) {
          #resume-preview {
            transform: scale(0.85);
          }
        }

        @media screen and (max-width: 480px) {
          #resume-preview {
            transform: scale(0.75);
          }
        }

        /* Center alignment for scaled layouts */
        @media screen and (max-width: 768px) {
          .w-full {
            justify-content: center;
            align-items: flex-start;
          }
        }

        /* ------------- Printing Styles ------------- */
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            background: white;
          }

          #resume-preview {
            width: 100%;
            max-width: 100%;
            box-shadow: none !important;
            border: none !important;
            padding: 0;
            margin: 0;
            transform: none !important;
          }

          /* Hide interface elements like buttons or sidebar */
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;