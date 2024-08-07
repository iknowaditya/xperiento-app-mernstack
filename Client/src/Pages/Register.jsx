import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import icon01 from "../assets/icon1.svg";
import icon02 from "../assets/icon2.svg";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    mobileNumber: "",
    address: "",
    password: "",
  });

  const isValidMobileNumber = (mobileNumber) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobileNumber);
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!isValidMobileNumber(data.mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      const {
        firstName,
        lastName,
        businessName,
        mobileNumber,
        address,
        password,
      } = data;
      const response = await axios.post("/register", {
        firstName,
        lastName,
        businessName,
        mobileNumber,
        address,
        password,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          firstName: "",
          lastName: "",
          businessName: "",
          mobileNumber: "",
          address: "",
          password: "",
        });
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (err) {
      toast.error("Failed to create account");
      console.error("Error in registerUser:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-16">
      <h1
        className="text-center text-4xl font-bold text-yellow-500"
        style={{ lineHeight: "45.46px" }}
      >
        Xperiento
      </h1>
      <p
        className="text-center text-lg text-white mt-6"
        style={{
          fontFamily: "sans-serif",
          lineHeight: "25.25px",
          maxWidth: "200px",
        }}
      >
        Complete Your Profile for the right insights.
      </p>
      <form className="space-y-2 sm:space-y-4" onSubmit={registerUser}>
        <input
          className="block w-[249px] h-[35px] mt-12 px-2 text-white bg-transparent border-b-2 border-white outline-none"
          placeholder="First Name"
          type="text"
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
        />
        <input
          className="block w-[249px] h-[35px] mt-12 px-2 text-white bg-transparent border-b-2 border-white outline-none"
          placeholder="Last Name"
          type="text"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
        />
        <input
          className="block w-[249px] h-[35px] mt-12 px-2 text-white bg-transparent border-b-2 border-white outline-none"
          placeholder="Business Name"
          type="text"
          value={data.businessName}
          onChange={(e) => setData({ ...data, businessName: e.target.value })}
        />
        <input
          className="block w-[249px] h-[35px] mt-12 px-2 text-white bg-transparent border-b-2 border-white outline-none"
          placeholder="Your Mobile Number"
          type="text"
          value={data.mobileNumber}
          onChange={(e) => setData({ ...data, mobileNumber: e.target.value })}
        />
        <input
          className="block w-[249px] h-[35px] mt-12 px-2 text-white bg-transparent border-b-2 border-white outline-none"
          placeholder="Address"
          type="text"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
        <input
          className="block w-[249px] h-[35px] mt-12 px-2 text-white bg-transparent border-b-2 border-white outline-none"
          placeholder="Password"
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <div className="flex justify-center mt-8">
          <div className="bg-black cursor-pointer rounded-full w-20 h-20 flex items-center justify-center mr-8 icon-container">
            <img
              src={icon01}
              alt="Restaurant Icon"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="bg-black cursor-pointer rounded-full w-20 h-20 flex items-center justify-center icon-container">
            <img
              src={icon02}
              alt="Retail Icon"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <button
          className="bg-yellow-500 text-black mt-10 px-20 py-3 rounded-full font-bold"
          type="submit"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
