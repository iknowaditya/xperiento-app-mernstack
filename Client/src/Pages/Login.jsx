import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/UserContext";

function Login() {
  const [data, setData] = useState({
    mobileNumber: "",
    password: "",
  });
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const signinUser = async (e) => {
    e.preventDefault();
    const { mobileNumber, password } = data;
    try {
      const response = await axios.post("/login", { mobileNumber, password });
      const responseData = response.data;
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        login(responseData.token, responseData.user);
        localStorage.setItem("userId", responseData.userId);
        localStorage.setItem("token", responseData.token);
        setData({ mobileNumber: "", password: "" });
        navigate("/dashboard");
        toast.success(
          `Hi, ${responseData.user.firstName}! You have successfully logged in.`
        );
      }
    } catch (error) {
      console.error("Error in signinUser:", error);
      if (error.response) {
        console.error("Server responded with status:", error.response.status);
        console.error("Response data:", error.response.data);
        toast.error(error.response.data.message || "Failed to sign in");
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server");
      } else {
        console.error("Error setting up request:", error.message);
        toast.error("Error setting up request");
      }
    }
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-16">
      <h1 className="text-center text-4xl font-bold text-yellow-500">
        Xperiento
      </h1>
      <p
        className="text-center text-lg text-white mt-6"
        style={{
          fontFamily: "sans-serif",
          lineHeight: "25.25px",
          maxWidth: "150px",
        }}
      >
        New Insights almost every day!
      </p>
      <form className="space-y-8" onSubmit={signinUser}>
        <input
          className="block w-[249px] h-[35px] mt-12 px-2 text-white bg-transparent border-b-2 border-white outline-none"
          placeholder="Your Mobile Number"
          type="text"
          value={data.mobileNumber}
          onChange={(e) => setData({ ...data, mobileNumber: e.target.value })}
        />
        <input
          className="block w-[249px] h-[35px] mt-4 px-2 text-white bg-transparent border-b-2 border-white outline-none"
          placeholder="Password"
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button
          className="w-[240px] h-[50px] bg-yellow-500 text-black text-xl font-bold rounded-full mt-20 transition-opacity duration-300 ease-out"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <button
        className="mt-6 text-yellow-500 text-lg underline transition-opacity duration-300 ease-out"
        onClick={handleCreateAccount}
      >
        Create Account
      </button>
    </div>
  );
}

export default Login;
