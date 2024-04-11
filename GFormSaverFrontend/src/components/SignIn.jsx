/* eslint-disable no-unused-vars */
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import notify from "../services/notify.js";
import axios from "../api/axios";

// eslint-disable-next-line react/prop-types
function SignIn({ CSS, children }) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "/api/oauth/callback",
        JSON.stringify({
          code: credentialResponse.code,
        })
      );

      notify("Successfully logged in!", "success");
      const accessToken = response?.data?.accessToken;
      const userName = response?.data?.name;
      const userEmail = response?.data?.email;
      const userProfileUrl = response?.data?.profileUrl;
      const googleAccessToken = response?.data?.googleAccessToken;
      setAuth({
        userName,
        userEmail,
        userProfileUrl,
        accessToken,
        googleAccessToken,
      });
      navigate("/");
    } catch (error) {
      notify(
        error?.response ? error.response.message : "No server response",
        "error"
      );
    }
  };

  const handleError = (errorResponse) => {
    console.error("Google login failed", errorResponse);
  };
  //TODO: explore one-tap
  const googleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.file",
    flow: "auth-code",
  });

  return (
    <>
      <button onClick={() => googleLogin()} className={CSS}>
        {children}
      </button>
    </>
  );
}

export default SignIn;
