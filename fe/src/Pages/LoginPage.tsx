import Login from "../containers/Login";

function LoginPage() {
  const handleLoginSuccess = (token: string, role: string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("role", role);
    localStorage.setItem("isLoggedIn", "true");

    window.location.replace("/dashboard");
  };

  return (
    <div className="App">
      <Login onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default LoginPage;
