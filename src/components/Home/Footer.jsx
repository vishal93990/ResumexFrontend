import React from "react";
import { Linkedin, Github, Instagram, Facebook } from "lucide-react"; // Or your icon imports

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t-2 border-white px-5 py-6 mt-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-purple-500 text-xl md:text-2xl font-bold text-center md:text-left">
          <span className="text-white">Created by</span> - Vishal Jha
        </h1>
        <h1 className="text-indigo-500 text-xl md:text-2xl font-extrabold text-center md:text-right">
          Resumex
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/vishal-jha-897a7b256/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-center hover:text-purple-400 transition"
        >
          <Linkedin className="w-6 h-6 mb-1" />
          <span className="text-sm font-semibold">LinkedIn</span>
        </a>

        <a
          href="https://github.com/vishal93990"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-center hover:text-gray-300 transition"
        >
          <Github className="w-6 h-6 mb-1" />
          <span className="text-sm font-semibold">GitHub</span>
        </a>

        <a
          href="https://www.instagram.com/__vishal__jha___/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-center hover:text-pink-400 transition"
        >
          <Instagram className="w-6 h-6 mb-1" />
          <span className="text-sm font-semibold">Instagram</span>
        </a>

        <a
          href="https://www.facebook.com/v.jha.359"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-center hover:text-blue-500 transition"
        >
          <Facebook className="w-6 h-6 mb-1" />
          <span className="text-sm font-semibold">Facebook</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
