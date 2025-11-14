
import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  BookOpen,
  CheckSquare,
  Square,
  Code,
  Youtube,
  FileText,
} from "lucide-react";

import AddChapterModal from "./addChapter";
import AddProblemModal from "./addProblems";
import { getAllChapters, toggleProblemAPI } from "../../service/apiFuntion";

export default function ProblemsPage() {
  const [expandedChapters, setExpandedChapters] = useState({});
  const [completedProblems, setCompletedProblems] = useState({});
  const [chapterModal, setChapterModal] = useState(false);
  const [showProblemModal, setShowProblemModal] = useState({});
  const [dsaData, setDsaData] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch chapters
  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    setLoading(true);

    const data = await getAllChapters();
    const chapters = data?.chapters || [];

    setDsaData(chapters);

    // Build completed problem map
    const completedMap = {};
    chapters.forEach((ch) => {
      ch.problems?.forEach((p) => {
        if (p.isCompleted) {
          completedMap[p._id] = true;
        }
      });
    });

    setCompletedProblems(completedMap);
    setLoading(false);
  };

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const toggleProblem = async (chapterId, problemId) => {
    try {
      // Update UI instantly
      setCompletedProblems((prev) => ({
        ...prev,
        [problemId]: !prev[problemId],
      }));

      await toggleProblemAPI(chapterId, problemId);

      // Always refresh from backend
      await fetchChapters();
    } catch (err) {
      console.error("Error:", err);

      // Revert change
      setCompletedProblems((prev) => ({
        ...prev,
        [problemId]: !prev[problemId],
      }));

      alert("Failed to update problem status.");
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "text-green-600 bg-green-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "hard":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">DSA Problem Tracker</h2>
          <p className="text-gray-600">Manage and track your DSA problems chapter-wise</p>
        </div>

        {user?.role !== "user" && (
          <button
            onClick={() => setChapterModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            + Add Chapter
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-600 text-center">Loading chapters...</p>
      ) : dsaData.length === 0 ? (
        <p className="text-gray-600 text-center">No chapters available</p>
      ) : (
        dsaData.map((chapter) => (
          <div key={chapter._id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-5 flex items-center justify-between">
              <button
                onClick={() => toggleChapter(chapter._id)}
                className="flex items-center space-x-4 flex-1 text-left hover:opacity-80 transition"
              >
                {expandedChapters[chapter._id] ? (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
                <BookOpen className="w-6 h-6 text-indigo-600" />
                <div className="flex flex-col items-start">
                  <h3 className="text-xl font-bold text-gray-900">{chapter.chapterTitle}</h3>
                  <p className="text-gray-600 text-sm">{chapter.description}</p>
                </div>
              </button>

              {user?.role !== "user" && (
                <button
                  onClick={() =>
                    setShowProblemModal({ id: chapter._id, isOpen: true })
                  }
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition ml-4"
                >
                  + Add Problem
                </button>
              )}
            </div>

            {expandedChapters[chapter._id] && (
              <div className="border-t border-gray-200 divide-y divide-gray-100">
                {chapter.problems?.length === 0 ? (
                  <p className="px-6 py-4 text-gray-500 text-center">
                    No problems added yet
                  </p>
                ) : (
                  chapter.problems.map((problem) => (
                    <div key={problem._id} className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex items-start space-x-4">
                        <button
                          onClick={() => toggleProblem(chapter._id, problem._id)}
                          className="mt-1"
                        >
                          {completedProblems[problem._id] ? (
                            <CheckSquare className="w-5 h-5 text-green-600" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-400" />
                          )}
                        </button>

                        <div className="flex-1">
                          <h5
                            className={`text-base font-medium ${
                              completedProblems[problem._id]
                                ? "line-through text-gray-500"
                                : "text-gray-900"
                            }`}
                          >
                            {problem.title}
                          </h5>

                          <div className="flex items-center space-x-4 mt-2 flex-wrap gap-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(
                                problem.level
                              )}`}
                            >
                              {problem.level}
                            </span>

                            {problem.leetcodeLink && (
                              <a
                                href={problem.leetcodeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:underline text-sm"
                              >
                                <Code className="w-4 h-4 mr-1" /> LeetCode
                              </a>
                            )}

                            {problem.youtubeLink && (
                              <a
                                href={problem.youtubeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-red-600 hover:underline text-sm"
                              >
                                <Youtube className="w-4 h-4 mr-1" /> Tutorial
                              </a>
                            )}

                            {problem.articleLink && (
                              <a
                                href={problem.articleLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-green-600 hover:underline text-sm"
                              >
                                <FileText className="w-4 h-4 mr-1" /> Article
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))
      )}

      {/* Modals */}
      {chapterModal && (
        <AddChapterModal
          isOpen={chapterModal}
          onClose={() => {
            setChapterModal(false);
            fetchChapters();
          }}
        />
      )}

      {showProblemModal?.isOpen && (
        <AddProblemModal
          isOpen={showProblemModal.isOpen}
          id={showProblemModal.id}
          onClose={() => {
            setShowProblemModal({ isOpen: false, id: "" });
            fetchChapters();
          }}
        />
      )}
    </div>
  );
}







