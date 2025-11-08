import * as studentController from "../controllers/StudentController.js";
import express from "express";

const studentRoutes = express.Router();

studentRoutes.get('/all', studentController.fetchstudent);

export default studentRoutes;