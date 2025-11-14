// import React, { useEffect, useState } from "react";
// import { CheckSquare } from "lucide-react";

// export default function StatisticsPage() {
//   const [completedProblems, setCompletedProblems] = useState({});

//   // ✅ Embedded DSA Data (same structure as your ProblemsPage)
//   const dsaData = {
//     topics: [
//       {
//         id: 1,
//         name: "Arrays",
//         chapters: [
//           {
//             id: "arr-1",
//             name: "Basics",
//             problems: [
//               { id: "p1", title: "Reverse an Array", difficulty: "Easy" },
//               { id: "p2", title: "Find Maximum Element", difficulty: "Easy" },
//             ],
//           },
//           {
//             id: "arr-2",
//             name: "Advanced Arrays",
//             problems: [
//               {
//                 id: "p3",
//                 title: "Kadane’s Algorithm – Maximum Subarray Sum",
//                 difficulty: "Medium",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 2,
//         name: "Linked List",
//         chapters: [
//           {
//             id: "ll-1",
//             name: "Singly Linked List",
//             problems: [
//               { id: "p4", title: "Reverse a Linked List", difficulty: "Medium" },
//               { id: "p5", title: "Detect Loop in Linked List", difficulty: "Medium" },
//             ],
//           },
//         ],
//       },
//       {
//         id: 3,
//         name: "Binary Trees",
//         chapters: [
//           {
//             id: "bt-1",
//             name: "Tree Basics",
//             problems: [
//               { id: "p6", title: "Maximum Depth of Binary Tree", difficulty: "Easy" },
//               { id: "p7", title: "Lowest Common Ancestor", difficulty: "Hard" },
//             ],
//           },
//         ],
//       },
//     ],
//   };

//   // ✅ Load progress from localStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("completed_problems") || "{}");
//     setCompletedProblems(saved);
//   }, []);

//   // ✅ Calculate all stats
//   const calculateStats = () => {
//     const stats = {
//       easy: { total: 10, completed: 5 },
//       medium: { total: 0, completed: 0 },
//       hard: { total: 0, completed: 0 },
//       topicStats: [],
//     };

//     dsaData.topics.forEach((topic) => {
//       let topicCompleted = 0;
//       let topicTotal = 0;

//       topic.chapters.forEach((chapter) => {
//         chapter.problems.forEach((problem) => {
//           topicTotal++;
//           const difficulty = problem.difficulty.toLowerCase();
//           stats[difficulty].total++;

//           if (completedProblems[problem.id]) {
//             topicCompleted++;
//             stats[difficulty].completed++;
//           }
//         });
//       });

//       stats.topicStats.push({
//         name: topic.name,
//         completed: topicCompleted,
//         total: topicTotal,
//         percentage:
//           topicTotal > 0 ? Math.round((topicCompleted / topicTotal) * 100) : 0,
//       });
//     });

//     return stats;
//   };

//   const stats = calculateStats();

//   const totalSolved =
//     stats.easy.completed + stats.medium.completed + stats.hard.completed;
//   const totalProblems =
//     stats.easy.total + stats.medium.total + stats.hard.total;
//   const successRate =
//     totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

//   return (
//     <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Statistics & Analytics
//         </h2>
//         <p className="text-gray-600">Detailed breakdown of your DSA progress</p>
//       </div>

//       {/* Difficulty Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Easy */}
//         <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Easy Problems</h3>
//             <div className="bg-green-100 p-2 rounded-lg">
//               <CheckSquare className="w-5 h-5 text-green-600" />
//             </div>
//           </div>
//           <p className="text-3xl font-bold text-gray-900 mb-2">
//             {stats.easy.completed}/{stats.easy.total}
//           </p>
//           <div className="bg-gray-100 rounded-full h-2">
//             <div
//               className="bg-green-500 h-full rounded-full"
//               style={{
//                 width: `${
//                   stats.easy.total > 0
//                     ? Math.round((stats.easy.completed / stats.easy.total) * 100)
//                     : 0
//                 }%`,
//               }}
//             />
//           </div>
//         </div>

//         {/* Medium */}
//         <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-yellow-500">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Medium Problems</h3>
//             <div className="bg-yellow-100 p-2 rounded-lg">
//               <CheckSquare className="w-5 h-5 text-yellow-600" />
//             </div>
//           </div>
//           <p className="text-3xl font-bold text-gray-900 mb-2">
//             {stats.medium.completed}/{stats.medium.total}
//           </p>
//           <div className="bg-gray-100 rounded-full h-2">
//             <div
//               className="bg-yellow-500 h-full rounded-full"
//               style={{
//                 width: `${
//                   stats.medium.total > 0
//                     ? Math.round(
//                         (stats.medium.completed / stats.medium.total) * 100
//                       )
//                     : 0
//                 }%`,
//               }}
//             />
//           </div>
//         </div>

//         {/* Hard */}
//         <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-red-500">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Hard Problems</h3>
//             <div className="bg-red-100 p-2 rounded-lg">
//               <CheckSquare className="w-5 h-5 text-red-600" />
//             </div>
//           </div>
//           <p className="text-3xl font-bold text-gray-900 mb-2">
//             {stats.hard.completed}/{stats.hard.total}
//           </p>
//           <div className="bg-gray-100 rounded-full h-2">
//             <div
//               className="bg-red-500 h-full rounded-full"
//               style={{
//                 width: `${
//                   stats.hard.total > 0
//                     ? Math.round((stats.hard.completed / stats.hard.total) * 100)
//                     : 0
//                 }%`,
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Topic Progress */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h3 className="text-xl font-bold text-gray-900 mb-6">
//           Topic-wise Progress
//         </h3>
//         <div className="space-y-6">
//           {stats.topicStats.map((topic, index) => (
//             <div key={index}>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-semibold text-gray-900">{topic.name}</span>
//                 <span className="text-sm text-gray-600">
//                   {topic.completed}/{topic.total} ({topic.percentage}%)
//                 </span>
//               </div>
//               <div className="bg-gray-100 rounded-full h-3">
//                 <div
//                   className="bg-indigo-600 h-full rounded-full transition-all duration-500"
//                   style={{ width: `${topic.percentage}%` }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Achievements */}
//       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
//         <h3 className="text-xl font-bold mb-4">🏆 Achievements</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="bg-white/10 backdrop-blur rounded-lg p-4">
//             <p className="text-sm text-purple-100 mb-1">Total Solved</p>
//             <p className="text-2xl font-bold">{totalSolved} Problems</p>
//           </div>
//           <div className="bg-white/10 backdrop-blur rounded-lg p-4">
//             <p className="text-sm text-purple-100 mb-1">Success Rate</p>
//             <p className="text-2xl font-bold">{successRate}%</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { CheckSquare } from "lucide-react";
import {
  getOverallStatistics,
  getTopicWiseProgress,
  getAchievements
} from "../../service/apiFuntion";

export default function StatisticsPage() {
  const [overallStats, setOverallStats] = useState(null);
  const [topicStats, setTopicStats] = useState([]);
  const [achievements, setAchievements] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [overall, topics, achieve] = await Promise.all([
          getOverallStatistics(),
          getTopicWiseProgress(),
          getAchievements()
        ]);

        setOverallStats(overall);
        setTopicStats(topics);
        setAchievements(achieve);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg text-gray-600">
        Loading statistics...
      </div>
    );
  }

  if (!overallStats || !achievements) {
    return (
      <div className="p-10 text-center text-red-600 text-lg">
        Failed to load statistics
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Statistics & Analytics
        </h2>
        <p className="text-gray-600">Detailed breakdown of your DSA progress</p>
      </div>

      {/* Difficulty Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DifficultyCard
          label="Easy Problems"
          color="green"
          iconColor="green"
          stats={overallStats.easy}
        />

        <DifficultyCard
          label="Medium Problems"
          color="yellow"
          iconColor="yellow"
          stats={overallStats.medium}
        />

        <DifficultyCard
          label="Hard Problems"
          color="red"
          iconColor="red"
          stats={overallStats.hard}
        />
      </div>

      {/* Topic-wise Progress */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Topic-wise Progress
        </h3>

        <div className="space-y-6">
          {topicStats.map((topic, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">
                  {topic.chapterTitle}
                </span>
                <span className="text-sm text-gray-600">
                  {topic.completed}/{topic.total} ({topic.percentage}%)
                </span>
              </div>

              <ProgressBar percentage={topic.percentage} barColor="indigo" />
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">🏆 Achievements</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AchievementCard
            title="Total Solved"
            value={`${achievements.totalSolved} Problems`}
          />
          <AchievementCard
            title="Success Rate"
            value={`${achievements.successRate}%`}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function DifficultyCard({ label, color, iconColor, stats }) {
  const percentage =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const barColors = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-md border-l-4 border-${color}-500`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
        <div className={`bg-${color}-100 p-2 rounded-lg`}>
          <CheckSquare className={`w-5 h-5 text-${iconColor}-600`} />
        </div>
      </div>

      <p className="text-3xl font-bold text-gray-900 mb-2">
        {stats.completed}/{stats.total}
      </p>

      <div className="bg-gray-100 rounded-full h-2">
        <div
          className={`${barColors[color]} h-full rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function ProgressBar({ percentage, barColor }) {
  const barColors = {
    indigo: "bg-indigo-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
  };

  return (
    <div className="bg-gray-100 rounded-full h-2">
      <div
        className={`${barColors[barColor] || "bg-indigo-500"} h-full rounded-full`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

function AchievementCard({ title, value }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
      <p className="text-sm text-purple-100 mb-1">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
