import React, { useContext, useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div
        className="w-full max-w-md md:max-w-lg lg:w-[70%] h-auto md:h-full flex flex-col justify-center mx-auto my-8 md:my-0 shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 60%, #90CAF9 100%)",
          borderRadius: "18px",
          padding: "2rem",
        }}
      >
        <h3
          className="text-2xl font-bold text-center mb-1"
          style={{ color: "#0D47A1", fontFamily: "Poppins, sans-serif" }}
        >
          Welcome Back
        </h3>
        <p className="text-sm text-blue-900 mb-6 text-center">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="Enter your email"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="btn-primary w-full"
            style={{
              backgroundColor: "#1565C0", // Deep blue
              color: "#fff",
            }}
          >
            LOGIN
          </button>

          <p className="text-sm text-blue-900 mt-3 text-center">
            Don't have an account?{" "}
            <Link
              className="font-semibold underline"
              to="/signup"
              style={{ color: "#1976D2" }}
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;
