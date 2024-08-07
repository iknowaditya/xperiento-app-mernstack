import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Logout() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-4 px-12 py-2 rounded-md font-normal text-2xl text-neutral-200">
      <h1
        className="rounded-md font-normal text-2xl text-neutral-200 hover:text-yellow-500 cursor-pointer"
        onClick={handleLogout}
      >
        Sign Out
      </h1>
    </div>
  );
}

export default Logout;
