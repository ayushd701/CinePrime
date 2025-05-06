import React from "react";
import { Link } from "react-router-dom";
import { RiCloseLine , RiClapperboardFill , RiFireLine ,RiBarChartFill , RiMovie2Fill , RiTv2Fill , RiTeamFill , RiInformationFill , RiCustomerServiceFill} from "react-icons/ri";

export default function Sidenav({ isOpen, onClose }) {
  const navItems1 = [
    { title: "Trending", to: "/trending", icon: <RiFireLine className="mr-2" /> },
    { title: "Popular", to: "/popular", icon: <RiBarChartFill className="mr-2" /> },
    { title: "Movies", to: "/movie", icon: <RiMovie2Fill className="mr-2" /> },
    { title: "TV Shows", to: "/tv", icon: <RiTv2Fill className="mr-2" /> },
    { title: "People", to: "/person", icon: <RiTeamFill className="mr-2" /> }
  ];

  const navItems2 = [
    { title: "About", to: "/about", icon: <RiInformationFill className="mr-2" /> },
    { title: "Contact", to: "/contact", icon: <RiCustomerServiceFill className="mr-2" /> },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-40 w-[70%] md:w-[20%] bg-zinc-800 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out shadow-xl`}>
      <div className="p-6 h-full overflow-y-auto">

        <button 
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 text-white"
        >
          <RiCloseLine size={24} />
        </button>

        <h1 className="text-2xl text-white font-bold flex items-center">
          <RiClapperboardFill className="text-[#6556CD] mr-2" />
          CinePrime
        </h1>

        <nav className="mt-10">
          <h1 className="text-lg text-zinc-300 font-semibold mb-4">New Feeds</h1>
          {navItems1.map((item, index) => (
            <Link 
              key={index} 
              to={item.to} 
              className="flex items-center py-3 px-4 text-zinc-400 hover:bg-[#6556CD]/50 hover:text-white rounded-lg transition-all duration-200 mb-2"
              onClick={onClose}
            >
              {item.icon} {item.title}
            </Link>
          ))}
        </nav>

        <hr className="border-zinc-700 my-6" />

        <nav>
          <h1 className="text-lg text-zinc-300 font-semibold mb-4">Information</h1>
          {navItems2.map((item, index) => (
            <Link 
              key={index} 
              to={item.to} 
              className="flex items-center py-3 px-4 text-zinc-400 hover:bg-[#6556CD]/50 hover:text-white rounded-lg transition-all duration-200 mb-2"
              onClick={onClose}
            >
              {item.icon} {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}