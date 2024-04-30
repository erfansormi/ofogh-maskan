import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login";
import { useAuth } from "./hooks/use-auth";
import AdDetails from "./pages/ad-details";
import SignupPage from "./pages/auth/signup";
import RegisterAdPage from "./pages/register-ad";
import ProtectedRoute from "./components/common/protected-route";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/auth/signup", element: <SignupPage /> },
  { path: "/auth/login", element: <LoginPage /> },
  {
    path: "/register-ad",
    element: (
      <ProtectedRoute>
        <RegisterAdPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ad-details/:id",
    element: <AdDetails />,
  },
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
