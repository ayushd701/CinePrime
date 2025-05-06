import React from "react";

const Contact = () => {
  document.title = "Contact Us";
  const contactItems = [
    {
      name: "Email",
      link: "mailto:dixitayush363@gmail.com",
      icon: <i className="ri-mail-line text-2xl"></i>,
      color: "text-red-400 hover:text-red-300",
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/ayush-dixit-0107ad",
      icon: <i className="ri-linkedin-box-fill text-2xl"></i>,
      color: "text-blue-400 hover:text-blue-300",
    },
    {
      name: "GitHub",
      link: "https://github.com/ayushd701",
      icon: <i className="ri-github-fill text-2xl"></i>,
      color: "text-gray-200 hover:text-white",
    },
  ];

  return (
    <div className="bg-[#1F1E24] w-full min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#2D2B32] rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-[#6556CD]/30">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6556CD] to-[#8B7AE4] mb-4">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-zinc-300">
            Looking forward to connecting! Feel free to reach out through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {contactItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center p-6 rounded-lg bg-[#3A3841] hover:bg-[#4A4752] transition-all duration-300 ${item.color}`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <span className="text-lg font-medium">{item.name}</span>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center text-zinc-400 text-sm">
          <p>I typically respond within 24 hours</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
