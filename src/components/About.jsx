import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  document.title = "About";
  const navigate = useNavigate();

  return (
    <div className="bg-[#1F1E24] w-full min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl bg-[#2D2B32] rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-[#6556CD]/20 hover:translate-y-[-5px]">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6556CD] to-[#8B7AE4]">
            About Me
          </h1>

          <div className="space-y-4 text-zinc-300">
            <p className="text-lg md:text-xl leading-relaxed">
              I'm Ayush Dixit, a student at IIIT Ranchi with a strong passion
              for coding, web development, and data structures. I love blending
              technology with creativity to build practical and impactful
              projects.
            </p>

            <p className="text-lg md:text-xl leading-relaxed">
              I'm always eager to learn new technologies and build innovative
              projects that solve real-world problems.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 bg-gradient-to-r from-[#6556CD] to-[#8B7AE4] text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg hover:shadow-[#6556CD]/30"
            >
              Contact Me
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-[#6556CD] text-[#6556CD] font-medium rounded-lg hover:bg-[#6556CD]/10 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
