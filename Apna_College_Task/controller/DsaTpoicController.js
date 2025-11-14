import DSATopic from "../model/dsaTopicModel.js";
import { validationResult } from "express-validator";

//  Create a new DSA Chapter
export const createChapter = async (req, res) => {
  try {
    const { chapterTitle, description } = req.body;
    const newChapter = await DSATopic.create({ chapterTitle, description });
    res.status(201).json({ message: "Chapter created successfully", chapter: newChapter });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add problem under a chapter
export const addProblem = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const chapter = await DSATopic.findById(chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    chapter.problems.push(req.body);
    await chapter.save();
    res.status(201).json({ message: "Problem added successfully", chapter });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Get all chapters with problems 
// export const getAllChapters = async (req, res) => {
//   try {
//     const chapters = await DSATopic.find().sort({ createdAt: 1 });
//     res.json(chapters);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
export const getAllChapters = async (req, res) => {
  try {
    const userId = req.user.id;
    const chapters = await DSATopic.find();

    const formatted = chapters.map((ch) => ({
      ...ch._doc,
      problems: ch.problems.map((p) => {
        const userCompleted = p.completedBy.some(
          (entry) =>
            entry.userId.toString() === userId && entry.completed === true
        );

        return {
          ...p._doc,
          isCompleted: userCompleted,
        };
      }),
    }));

    res.json({ chapters: formatted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get single chapter with all problems
export const getChapterById = async (req, res) => {
  try {
    const chapter = await DSATopic.findById(req.params.id);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });
    res.json(chapter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Mark/unmark problem as completed
// export const markProblemComplete = async (req, res) => {
//   try {
//     const userId = req.user.id; // from JWT middleware
//     const { chapterId, problemId } = req.params; // ✅ From URL params

//     // Find the chapter
//     const chapter = await DSATopic.findById(chapterId);
//     if (!chapter) {
//       return res.status(404).json({ message: "Chapter not found" });
//     }

//     const problem = chapter.problems.id(problemId);
//     if (!problem) {
//       return res.status(404).json({ message: "Problem not found" });
//     }

//     const existingIndex = problem.completedBy.findIndex(
//       (entry) => entry.userId.toString() === userId
//     );

//     if (existingIndex !== -1) {
//       // User exists - toggle completion
//       problem.completedBy[existingIndex].completed = 
//         !problem.completedBy[existingIndex].completed;
      
//       problem.completedBy[existingIndex].completedAt = 
//         problem.completedBy[existingIndex].completed ? new Date() : null;
//     } else {
//       // User doesn't exist - add new entry
//       problem.completedBy.push({
//         userId,
//         completed: true,
//         completedAt: new Date()
//       });
//     }

//     await chapter.save();

//     res.json({
//       message: "Progress updated successfully",
//       completed: existingIndex !== -1 
//         ? problem.completedBy[existingIndex].completed 
//         : true,
//       problem: {
//         _id: problem._id,
//         title: problem.title,
//         completedBy: problem.completedBy
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const markProblemComplete = async (req, res) => {
  try {
    const userId = req.user.id;
    const { chapterId, problemId } = req.params;

    const chapter = await DSATopic.findById(chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const problem = chapter.problems.id(problemId);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    const existingIndex = problem.completedBy.findIndex(
      (entry) => entry.userId.toString() === userId
    );

    if (existingIndex !== -1) {
      problem.completedBy[existingIndex].completed =
        !problem.completedBy[existingIndex].completed;

      problem.completedBy[existingIndex].completedAt =
        problem.completedBy[existingIndex].completed ? new Date() : null;
    } else {
      problem.completedBy.push({
        userId,
        completed: true,
        completedAt: new Date(),
      });
    }

    await chapter.save();

    return res.json({
      message: "Progress updated successfully",
      completed:
        existingIndex !== -1
          ? problem.completedBy[existingIndex].completed
          : true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/dsa/overall-statistics = (Top Cards: Easy/Medium/Hard)
export const getOverallStatistics = async (req, res) => {
  try {
    const userId = req.user.id;
    const chapters = await DSATopic.find();

    const stats = {
      easy: { completed: 0, total: 0 },
      medium: { completed: 0, total: 0 },
      hard: { completed: 0, total: 0 }
    };

    chapters.forEach(chapter => {
      chapter.problems.forEach(problem => {
        const level = problem.level.toLowerCase();
        stats[level].total++;

        const userProgress = problem.completedBy.find(
          p => p.userId.toString() === userId
        );

        if (userProgress && userProgress.completed) {
          stats[level].completed++;
        }
      });
    });

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Topic-wise Progress API (Arrays, Linked List, Binary Trees)
export const getTopicWiseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const chapters = await DSATopic.find();

    const topicProgress = chapters.map(chapter => {
      let completed = 0;
      let total = chapter.problems.length;

      chapter.problems.forEach(problem => {
        const userProgress = problem.completedBy.find(
          p => p.userId.toString() === userId
        );
        if (userProgress && userProgress.completed) {
          completed++;
        }
      });

      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        chapterId: chapter._id,
        chapterTitle: chapter.chapterTitle,
        completed,
        total,
        percentage
      };
    });

    res.json(topicProgress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Achievements API (Total Solved & Success Rate)
export const getAchievements = async (req, res) => {
  try {
    const userId = req.user.id;
    const chapters = await DSATopic.find();

    let totalSolved = 0;
    let totalProblems = 0;

    chapters.forEach(chapter => {
      chapter.problems.forEach(problem => {
        totalProblems++;
        const userProgress = problem.completedBy.find(
          p => p.userId.toString() === userId
        );
        if (userProgress && userProgress.completed) {
          totalSolved++;
        }
      });
    });

    const successRate = totalProblems > 0 
      ? Math.round((totalSolved / totalProblems) * 100) 
      : 0;

    res.json({
      totalSolved,
      totalProblems,
      successRate
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


