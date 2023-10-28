import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";
import RegisterPage from "./Pages/RegisterPage";
import VerifyInfoPage from "./Pages/VerifyInfoPage";
import VerifyEmailPage from "./Pages/VerifyEmailPage";
import LandingPage from "./Pages/LandingPage";
import RequestPasswordResetPage from "./Pages/RequestPasswordResetPage";
import ResetPasswordInfoPage from "./Pages/ResetPasswordInfoPage";
import ResetPasswordFromPage from "./Pages/ResetPasswordFormPage";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />{" "}
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyInfoPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<RequestPasswordResetPage />} />
        <Route
          path="/forgot-password-info"
          element={<ResetPasswordInfoPage />}
        />
        <Route
          path="/reset-password/:resetToken"
          element={<ResetPasswordFromPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
