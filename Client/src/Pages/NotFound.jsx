import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-12">
      <h1 className="text-4xl font-bold text-red-500 text-center">
        No results found
      </h1>
      <p className="text-lg mt-4 text-center">
        Please login first to access this page.
      </p>
      <Link
        to="/login"
        className="mt-6 text-blue-400 underline text-lg hover:text-blue-300 transition-colors duration-300"
      >
        Go to Login
      </Link>
    </div>
  );
}

export default NotFound;
