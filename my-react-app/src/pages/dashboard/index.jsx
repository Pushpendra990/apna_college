import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, CheckSquare, BookOpen, BarChart3, Code } from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [completedProblems, setCompletedProblems] = useState({});
  const [userName, setUserName] = useState("");


  const progress = 2

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("current_user");
    navigate("/");
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome back, {userName}! 👋</h2>
          <p className="text-indigo-100">
            Continue your learning journey and master Data Structures & Algorithms
          </p>
        </div>
        {/* <button
          onClick={handleLogout}
          className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
        >
          Logout
        </button> */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Progress */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Progress</p>
              <p className="text-3xl font-bold text-gray-900">
                {progress.percentage}%
              </p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4 bg-gray-100 rounded-full h-2">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Completed</p>
              <p className="text-3xl font-bold text-green-600">
                {progress.completed}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckSquare className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">Problems solved</p>
        </div>

        {/* Remaining */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Remaining</p>
              <p className="text-3xl font-bold text-orange-600">
                {progress.total - progress.completed}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <BookOpen className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">Problems to go</p>
        </div>
      </div>

      {/* Topics Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Topics Overview</h3>
        <div className="space-y-4">
          {/* {dsaData.topics.map((topic) => {
            const topicProgress = getTopicProgress(topic);
            const percentage =
              topicProgress.total > 0
                ? Math.round((topicProgress.completed / topicProgress.total) * 100)
                : 0;

            return (
              <div
                key={topic.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-semibold text-gray-900">{topic.name}</h4>
                  </div>
                  <span className="text-sm text-gray-600">
                    {topicProgress.completed}/{topicProgress.total}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })} */}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/problems")}
            className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
          >
            <Code className="w-6 h-6 text-indigo-600" />
            <div className="text-left">
              <p className="font-semibold text-gray-900">Continue Practice</p>
              <p className="text-sm text-gray-600">Solve DSA problems</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/statistics")}
            className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
          >
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <p className="font-semibold text-gray-900">View Statistics</p>
              <p className="text-sm text-gray-600">Detailed progress report</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
