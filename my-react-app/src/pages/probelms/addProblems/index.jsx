import React, { useState, useEffect } from "react";
import { Youtube, Code, FileText } from "lucide-react";
import { addProblems } from "../../../service/apiFuntion";

export default function AddProblemModal({ isOpen, onClose, id }) {
  const [title, setTitle] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [leetcodeLink, setLeetcodeLink] = useState("");
  const [codeforcesLink, setCodeforcesLink] = useState("");
  const [articleLink, setArticleLink] = useState("");
  const [level, setLevel] = useState("Easy");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Reset all fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setYoutubeLink("");
      setLeetcodeLink("");
      setCodeforcesLink("");
      setArticleLink("");
      setLevel("Easy");
      setError("");
      setSuccess("");
    }
  }, [isOpen]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Hard":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Problem title is required");
      return;
    }

    let data = {
      title: title,
      youtubeLink: youtubeLink,
      leetcodeLink: leetcodeLink,
      articleLink:
      codeforcesLink,
      level: level,
    };
    addProblems(data, id);
    onClose()
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      {/* Outer Container (Scroll Wrapper) */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden relative flex flex-col animate-fadeIn">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Add New Problem
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Add a new DSA problem with its resource links
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="px-6 pt-4 pb-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Problem Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="e.g., Two Sum"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Difficulty Level <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                {["Easy", "Medium", "Hard"].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setLevel(diff)}
                    className={`flex-1 py-3 rounded-lg font-semibold border-2 transition ${
                      level === diff
                        ? getDifficultyColor(diff) + " border-current"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Resource Links */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resource Links
              </h3>
              <div className="space-y-4">
                {/* YouTube */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Youtube className="w-4 h-4 text-red-600 mr-2" />
                    YouTube Tutorial Link
                  </label>
                  <input
                    type="url"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                {/* LeetCode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Code className="w-4 h-4 text-blue-600 mr-2" />
                    LeetCode Link
                  </label>
                  <input
                    type="url"
                    value={leetcodeLink}
                    onChange={(e) => setLeetcodeLink(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="https://leetcode.com/problems/..."
                  />
                </div>

                {/* Codeforces */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Code className="w-4 h-4 text-indigo-600 mr-2" />
                    Codeforces Link
                  </label>
                  <input
                    type="url"
                    value={codeforcesLink}
                    onChange={(e) => setCodeforcesLink(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="https://codeforces.com/problemset/problem/..."
                  />
                </div>

                {/* Article */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FileText className="w-4 h-4 text-green-600 mr-2" />
                    Article Link
                  </label>
                  <input
                    type="url"
                    value={articleLink}
                    onChange={(e) => setArticleLink(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="https://www.geeksforgeeks.org/..."
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Sticky Footer (Bottom Buttons) */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 bg-white sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-md hover:shadow-lg transition"
          >
            Add Problem
          </button>
        </div>
      </div>
    </div>
  );
}
