import { body, param } from "express-validator";

export const validateChapter = [
  body("chapterTitle")
    .trim()
    .notEmpty()
    .withMessage("Chapter title is required")
    .isLength({ min: 3 })
    .withMessage("Chapter title must be at least 3 characters long"),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters")
];

export const validateProblem = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Problem title is required"),

  body("youtubeLink")
    .optional()
    .isURL()
    .withMessage("YouTube link must be a valid URL"),

  body("leetcodeLink")
    .optional()
    .isURL()
    .withMessage("LeetCode link must be a valid URL"),

  body("codeforcesLink")
    .optional()
    .isURL()
    .withMessage("Codeforces link must be a valid URL"),

  body("articleLink")
    .optional()
    .isURL()
    .withMessage("Article link must be a valid URL"),

  body("level")
    .optional()
    .isIn(["Easy", "Medium", "Hard"])
    .withMessage("Level must be Easy, Medium, or Hard")
];

export const validateProgressParams = [
  param("chapterId")
    .isMongoId()
    .withMessage("Invalid chapter ID format"),

  param("problemId")
    .isMongoId()
    .withMessage("Invalid problem ID format")
];
