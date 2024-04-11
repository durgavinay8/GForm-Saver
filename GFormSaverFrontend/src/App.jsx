import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./ui/HomePage";
import MainPage from "./ui/MainPage";
import NotFound from "./ui/NotFound";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "login",
    element: <HomePage />,
  },
  {
    path: "home",
    element: <HomePage />,
  },
  {
    element: <PersistLogin />,
    children: [
      {
        path: "/",
        element: <RequireAuth />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
//TODO: loading animation
function App() {
  return (
    <GoogleOAuthProvider clientId="1070878439165-a7ikdvq886p5o50jkhsvd2f9qous59qm.apps.googleusercontent.com">
      <RouterProvider router={router} />
      <ToastContainer />
    </GoogleOAuthProvider>
  );
}

export default App;
