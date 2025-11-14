import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code } from "lucide-react";
import { loginUser, registerUser } from "../../service/apiFuntion";

const AuthPage = () => {
  const navigate = useNavigate();

  // ✅ Combined state object for all form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  // ✅ Generic input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;
    console.log(formData);

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    let data = {
      email: email,
      password: password,
    };
    loginUser(data, navigate);
  };

  // ✅ Handle Signup
  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword)
      return setError("Please fill in all fields");

    if (password !== confirmPassword) return setError("Passwords do not match");

    if (password.length < 6)
      return setError("Password must be at least 6 characters");
    if (!role) return setError("Please choose role");

    let data = {
      name: name,
      email: email,
      password:password,
      role: role,
    };
    registerUser(data,navigate)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">DSA Sheet</h1>
          <p className="text-gray-600 mt-2">Track your coding journey</p>
        </div>

        {/* Toggle Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => {
              setIsSignup(false);
              setError("");
            }}
            className={`flex-1 py-2 rounded-md font-medium transition ${
              !isSignup ? "bg-white text-indigo-600 shadow" : "text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsSignup(true);
              setError("");
            }}
            className={`flex-1 py-2 rounded-md font-medium transition ${
              isSignup ? "bg-white text-indigo-600 shadow" : "text-gray-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* LOGIN FORM */}
        {!isSignup ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="student@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
            >
              Login
            </button>
          </form>
        ) : (
          // SIGNUP FORM
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="student@example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* ✅ Role Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                {/* <option value="admin">Admin</option> */}
                <option value="">Select Role</option> 
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
            >
              Sign Up
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          {!isSignup
            ? "Don't have an account? Click Sign Up above"
            : "Already have an account? Click Login above"}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
