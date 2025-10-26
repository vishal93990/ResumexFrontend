import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950 text-white">
      <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-6"></div>

      <h1 className="text-2xl font-bold tracking-widest text-purple-400 animate-pulse">
        Resumex
      </h1>

      <p className="text-sm text-gray-400 mt-2">Loading your resume...</p>
    </div>
  );
};

export default Loader;
