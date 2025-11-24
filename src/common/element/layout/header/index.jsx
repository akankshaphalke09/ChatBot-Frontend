import { route } from "../../../config/route";

import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full px-6 py-3 flex justify-between items-center bg-transparent">
      {/* Left: Logo / Title */}
      <div className="flex items-center text-xl">
        <span className="text-black font-semibold">Valuemate</span>
      </div>

      {/* Right: Auth buttons */}
      <div className="flex items-center gap-x-4">
        <button onClick={() => navigate(route.login.path)} className="px-4 py-2 rounded-full border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50">
          Login
        </button>
        <button onClick={() => navigate(route.signup.path)}
          className="cursor-pointer  px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Header;
