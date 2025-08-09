import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/Alert/ErrorAlert";
import SuccessAlert from "../components/Alert/SuccessAlert";

const ResendActivation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { resendActivation, errorMsg, successMsg } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await resendActivation(data.email);
    } catch (error) {
      console.error("Resend activation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {errorMsg && <ErrorAlert error={errorMsg} />}
          {successMsg && <SuccessAlert success={successMsg} />}

          <h2 className="card-title text-2xl font-bold">Resend Activation</h2>
          <p className="text-base-content/70">
            Enter your email address and we'll resend the activation link to
            your inbox.
          </p>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="input input-bordered w-full"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <span className="label-text-alt text-error">
                  {errors.email.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Sending..." : "Resend Activation Link"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-base-content/70">
              Already activated?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
            <p className="text-base-content/70 mt-2">
              Don't have an account?{" "}
              <Link to="/register" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendActivation;
