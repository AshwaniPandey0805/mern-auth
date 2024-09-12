import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });
  const [loading, setLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const navigate = useNavigate();

  const handleFormData = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "email":
        validateEmail(value);
        break;
      case "password":
        validatePassword(value);
        break;
      default:
        break;
    }

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  console.log(formData);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Please enter a valid email",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, emailError: "" }));
    }
  };

  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError:
          "Password must be at least 8 characters long, with uppercase, lowercase, number, and special character",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, passwordError: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple form validation before submission
    if (errors.usernameError || errors.emailError || errors.passwordError) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:3000/auth/user/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const response = await res.json();
      setLoading(false);
      setServerResponse(response);
      if(serverResponse.success == true){
        console.log(serverResponse.data);
        navigate('/')
      }
      console.log("sdsds", response);
    } catch (error) {
      console.error("Error during sign-up:", error);
      setServerResponse({ error: "Sign-up failed. Please try again later." });
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Email Field */}
        <input
          type="text"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg hover:bg-slate-200"
          id="email"
          onChange={handleFormData}
        />
        <span className="text-red-600">{errors.emailError}</span>

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg hover:bg-slate-200"
          id="password"
          onChange={handleFormData}
        />
        <span className="text-red-600">{errors.passwordError}</span>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-slate-600 text-white font-semibold uppercase rounded-lg p-3 hover:bg-slate-500"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      {serverResponse && (
        <div className="mt-4 text-center ">
          {serverResponse.success == false ? (
            <p className="text-red-600">{serverResponse.message}</p>
          ) : (
            <p className="text-green-600">{serverResponse.message}</p>
          )}
        </div>
      )}

      <div className="flex flex-row justify-between p-2 my-1">
        <p>Already have an account?</p>
        <Link to='/sign-up' >
            <span className="text-blue-400 uppercase font-semibold mr-2">
            Sign Up
            </span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn