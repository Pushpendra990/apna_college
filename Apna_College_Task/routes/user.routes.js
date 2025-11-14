import express from "express";
import { body } from "express-validator";
import { register,login,getProfile,listUsers } from "../controller/usercontroller.js";
import { authenticate } from "../middlewere/auth.middlewere.js";
import { permit } from "../middlewere/role.middlewere.js";
const router = express.Router();

router.post("/register",
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
,register);

router.post("/login",
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required")
,login);

router.get("/getProfile",authenticate,permit("user"),getProfile);
router.get("/listing",authenticate,permit("admin"),listUsers);

export default router;

