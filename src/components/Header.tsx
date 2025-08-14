import type React from "react";
import useUserStore from "../store/userStore";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Header: React.FC = () => {
  const location = useLocation();
  // Get user from store 
  const user = useUserStore((state) => state.user);
  const { removeUser } = useUserStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      console.log('Signing out user...');
      
      // Call logout API to clear JWT cookie
      await axios.post(
        'http://localhost:3000/api/auth/logout',
        {},
        { withCredentials: true }
      );
      
      console.log('Logout API successful');
      
      // Remove user from store (like dispatch(removeUser()) in Redux)
      removeUser();
      
      // Navigate to login page
      navigate("/");
      
    } catch (error) {
      console.error('Logout error:', error);
      
      removeUser();
      navigate("/");
    }
  };

  return (
    <div className=" top-0 left-0 w-full p-5">
      <div className=" flex justify-between items-center mx-6">
        <div className=" w-32 h-13 rounded flex items-center justify-center mx-9">
          <span 
          className="text-red-600 font-bold text-4xl cursor-pointer">
            StreamWise</span>
        </div>
        
        {/* Show user info only if user exists in store */}
        {location.pathname !=="/" && user && (
          <div className=" flex items-center gap-4 mx-8">
            <img 
              className="w-12 h-12 rounded-full" 
              alt="user avatar" 
              src={`https://ui-avatars.com/api/?name=${user.name}&background=ef4444&color=fff`}
            />
            <span className="font-semibold shadow-2xl text-lg capitalize">
              Welcome, {user.name}!
            </span>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

