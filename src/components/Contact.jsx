import React from "react";

const Contact = () => {
  const items = [
    {
      name: "Email",
      link: "mailto:dixitayush363@gmail.com",
      icon: <i class="ri-mail-line mr-2"></i>,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/ayush-dixit-0107ad",
      icon: <i class="ri-linkedin-box-fill mr-2"></i>,
    },
    {
      name: "GitHub",
      link: "https://github.com/ayushd701",
      icon: <i class="ri-github-fill mr-2"></i>,
    },
  ];
  return (
    <div className="bg-gradient-to-r from-slate-700 to-gray-900 w-full h-screen flex justify-center items-center">
      <div className="w-[50%] h-auto rounded-lg p-[2%] hover:scale-105 duration-500 bg-gray-800 overflow-hidden">
        <div className="flex justify-center flex-col items-center h-[90%]">
          <h1 className=" text-3xl font-extrabold text-blue-400">
            Get in Touch
          </h1>
          <p className="mt-[3%] text-lg text-white">
            Looking forward to connecting! Feel free to reach out through the
            contact details below.
          </p>
        </div>
        <ul className="flex justify-around text-gray-400 text-xl mt-[3%]">
          {items.map((item, index) => (
            <li key={index}>
              {item.icon}
              <a  className="cursor-pointer" href={item.link} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contact;
