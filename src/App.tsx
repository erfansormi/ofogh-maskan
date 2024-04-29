import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login";
import { useAuth } from "./hooks/use-auth";
import SignupPage from "./pages/auth/signup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/auth/signup", element: <SignupPage /> },
  { path: "/auth/login", element: <LoginPage /> },
]);

const App = () => {
  useAuth();

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" containerStyle={{ fontSize: 14 }} />
    </>
  );
};

export default App;
