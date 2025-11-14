// import React, { useState, useEffect } from "react";
// import { Code, User, LogOut, Home, BarChart3 } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Header() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [currentPage, setCurrentPage] = useState("dashboard");
//   const [userName, setUserName] = useState("");

//   // ✅ Load user from localStorage
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("current_user"));
//     if (user && user.name) {
//       setUserName(user.name);
//     } else {
//       setUserName("");
//     }
//   }, []);

//   // ✅ Update currentPage based on route
//   useEffect(() => {
//     if (location.pathname.includes("problems")) setCurrentPage("problems");
//     else if (location.pathname.includes("statistics")) setCurrentPage("statistics");
//     else setCurrentPage("dashboard");
//   }, [location.pathname]);

//   // ✅ Logout Function (Safe)
//   const handleLogout = () => {
//     try {
//       localStorage.removeItem("current_user");
//       setUserName("");
//       // Navigate safely to login page instead of root
//       navigate("/login", { replace: true });
//     } catch (err) {
//       console.error("Logout Error:", err);
//     }
//   };
// const user = JSON.parse(localStorage.getItem("user"));

//   // ✅ Handle page navigation
//   const handleNavigation = (page) => {
//     setCurrentPage(page);
//     navigate(`/${page}`);
//   };

//   return (
//     <div className="bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <div className="flex items-center space-x-3">
//               <div className="bg-indigo-600 p-2 rounded-lg">
//                 <Code className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 DSA Sheet Tracker
//               </h1>
//             </div>

//             {/* User + Logout */}
//             <div className="flex items-center space-x-4">
//               {user?.name ? (
//                 <>
//                   <div className="hidden sm:flex items-center space-x-2 text-sm">
//                     <User className="w-4 h-4 text-gray-600" />
//                     <span className="text-gray-700 font-medium">{user?.name}</span>
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//                 >
//                   Login
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Navigation Tabs */}
//       <nav className="bg-white border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex space-x-8">
//             {/* Dashboard */}
//             <button
//               onClick={() => handleNavigation("dashboard")}
//               className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition ${
//                 currentPage === "dashboard"
//                   ? "border-indigo-600 text-indigo-600"
//                   : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
//               }`}
//             >
//               <Home className="w-5 h-5" />
//               <span>Dashboard</span>
//             </button>

//             {/* Problems */}
//             <button
//               onClick={() => handleNavigation("problems")}
//               className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition ${
//                 currentPage === "problems"
//                   ? "border-indigo-600 text-indigo-600"
//                   : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
//               }`}
//             >
//               <Code className="w-5 h-5" />
//               <span>Problems</span>
//             </button>

//             {/* Statistics */}
//             <button
//               onClick={() => handleNavigation("statistics")}
//               className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition ${
//                 currentPage === "statistics"
//                   ? "border-indigo-600 text-indigo-600"
//                   : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
//               }`}
//             >
//               <BarChart3 className="w-5 h-5" />
//               <span>Statistics</span>
//             </button>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Code, User, LogOut, Home, BarChart3 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState("dashboard");
  const [userName, setUserName] = useState("");

  // ✅ Load user from localStorage on first render
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    } else {
      setUserName("");
    }
  }, []);

  // ✅ Update currentPage based on route
  useEffect(() => {
    if (location.pathname.includes("problems")) setCurrentPage("problems");
    else if (location.pathname.includes("statistics")) setCurrentPage("statistics");
    else setCurrentPage("dashboard");
  }, [location.pathname]);

  // ✅ Complete Frontend Logout
  const handleLogout = () => {
    try {
      // Remove all user-related data
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("completed_problems");

      setUserName("");

      // Redirect to login
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Handle page navigation
  const handleNavigation = (page) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                DSA Sheet Tracker
              </h1>
            </div>

            {/* User + Logout */}
            <div className="flex items-center space-x-4">
              {user?.name ? (
                <>
                  <div className="hidden sm:flex items-center space-x-2 text-sm">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 font-medium">{user?.name}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {/* Dashboard */}
            <button
              onClick={() => handleNavigation("dashboard")}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition ${
                currentPage === "dashboard"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            {/* Problems */}
            <button
              onClick={() => handleNavigation("problems")}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition ${
                currentPage === "problems"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <Code className="w-5 h-5" />
              <span>Problems</span>
            </button>

            {/* Statistics */}
            <button
              onClick={() => handleNavigation("statistics")}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition ${
                currentPage === "statistics"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Statistics</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
