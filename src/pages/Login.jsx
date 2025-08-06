import useAuthContext from "../hooks/useAuthContext";

const Login = () => {
  const { loginUser } = useAuthContext();

  return (
    <div>
      <h1>Login page...</h1>
      <button
        onClick={() => loginUser("admin@admin.com", "admin")}
        className="btn btn-primary"
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
