import Register from "../containers/Register";

const RegisterPage: React.FC = () => {
  const handleRegisterSuccess = () => {};

  return (
    <div className="App">
      <Register onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
};

export default RegisterPage;
