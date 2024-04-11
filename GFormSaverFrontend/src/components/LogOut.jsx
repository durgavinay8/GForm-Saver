import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth.js";
import notify from "../services/notify.js";
import LoadingComponent from "./LoadingComponent.jsx";

function LogOut() {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      await axiosPrivate.delete("/api/oauth/logout");
      setAuth({});
      navigate("/");
    } catch (error) {
      notify("Failed to log out", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="border-2 border-[#F47F18] rounded-lg text-center p-2 hover:bg-[#F47F18] hover:text-white"
        onClick={handleLogOut}
      >
        logOut
      </div>
      {isLoading && <LoadingComponent text="Logging Out" />}
    </>
  );
}

export default LogOut;
