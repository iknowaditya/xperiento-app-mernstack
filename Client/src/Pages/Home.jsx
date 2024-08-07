import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  const handleMouseUp = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate("/login"); // Navigate to the next page
    }, 500); // 500ms delay
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-16">
      <h1
        className="text-center text-4xl font-bold text-yellow-500 mb-8"
        style={{ fontFamily: "Oxygen", lineHeight: "45.46px" }}
      >
        Xperiento
      </h1>
      <p
        className="text-center text-lg text-white mb-8"
        style={{
          fontFamily: "sans-serif",
          lineHeight: "25.25px",
          maxWidth: "300px",
        }}
      >
        Smart insights to improve your sales, marketing, customer retention &
        customer satisfaction.
      </p>
      <button
        className={`w-[170px] h-[50px] bg-yellow-500 text-black text-xl font-bold rounded-full transition-opacity duration-300 ease-out ${
          animate ? "opacity-85" : "opacity-100"
        }`}
        onMouseUp={handleMouseUp}
      >
        Start
      </button>
    </div>
  );
}

export default Home;
