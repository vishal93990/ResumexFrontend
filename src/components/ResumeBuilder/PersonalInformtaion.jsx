import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
  UserIcon,
} from "lucide-react";
import React from "react";

const PersonalInformtaion = ({
  data,
  onChnage,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChnage({ ...data, [field]: value });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    { key: "email", label: "Email", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
    },
    { key: "linkedin", label: "Linkdin Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Porfolio", icon: Globe, type: "url" },
  ];
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-200">
        Personal Informtaion
      </h3>
      <p className="text-sm text-gray-500">
        Get Started with the personal Informtaions
      </p>
      <div className="flex items-center gap-2 ">
        <label>
          {data?.image ? (
            <img
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-offset-gray-400 hover:opacity-80"
              src={
                typeof data?.image === "string"
                  ? data?.image
                  : URL.createObjectURL(data?.image)
              }
              alt="User Image"
            />
          ) : (
            <div className="inline-flex items-center gap-2 mt-5 text-gray-500 hover:text-slate-700 cursor-pointer">
              <User className="size-10 p-2.5 border rounded-full" />
              Upload User image
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>
        {typeof data?.image === "object" && (
          <div className="flex flex-col pl-4 text-sm">
            <p>Remove Background</p>
            <label className="relative inline-flex items-center cursor-pointer text-gray-500 gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
              />
              <div className="w-9 h-5 bg-gray-500 rounded-full peer peer-checked:bg-purple-400 transition-colors duration-200"></div>
              <span className="dot absolute left-1 top-1 w-3 h-3 bg-gray-600 rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
            </label>
          </div>
        )}
      </div>
      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-500">
              <Icon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500 ">*</span>}
            </label>
            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInformtaion;
