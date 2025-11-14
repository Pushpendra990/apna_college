import express, { Router } from "express";
import { 
    createChapter,
    addProblem,
    getAllChapters,
    getChapterById,
    markProblemComplete,
    getOverallStatistics,
    getTopicWiseProgress,
    getAchievements
 } from "../controller/DsaTpoicController.js";
import { authenticate} from "../middlewere/auth.middlewere.js";
import { permit } from "../middlewere/role.middlewere.js";
import { validateChapter ,validateProblem, validateProgressParams} from "./DsaValidation.js";
const router = Router();

router.post("/createChapters",validateChapter, authenticate, permit("admin"), createChapter);

router.get("/getAllchapters",authenticate, getAllChapters);

router.get("/getChaptersById/:id", authenticate, getChapterById);

router.post("/addProblemForchapter/:chapterId",validateProblem,authenticate, permit("admin"), addProblem);

router.patch('/chapters/:chapterId/problems/:problemId/toggle',validateProgressParams, authenticate,permit("user"), 
  markProblemComplete
);

router.get('/overall-statistics', authenticate, getOverallStatistics);

router.get('/topic-wise-progress', authenticate, getTopicWiseProgress);

router.get('/achievements', authenticate, getAchievements);

export default router;


