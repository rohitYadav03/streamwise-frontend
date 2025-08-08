import type React from "react";

const Header: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full p-4">
      <div className="w-32 h-12  rounded flex items-center justify-center mx-8">
        <span className=" text-red-600 font-bold text-4xl">StreamWise</span>
      </div>
    </div>
  );
};

export default Header;