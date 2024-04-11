import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/api/oauth/refresh", {
      withCredentials: true,
    });
    const accessToken = response?.data?.accessToken;
    const userName = response?.data?.name;
    const userEmail = response?.data?.email;
    const userProfileUrl = response?.data?.profileUrl;
    const googleAccessToken = response?.data?.googleAccessToken;
    setAuth((prev) => {
      return {
        ...prev,
        userName,
        userEmail,
        userProfileUrl,
        accessToken,
        googleAccessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
}

export default useRefreshToken;
