import * as studentController from "../controllers/StudentController.js";
import express from "express";

const studentRoutes = express.Router();

studentRoutes.get('/all', studentController.fetchstudents);
studentRoutes.post('/new', studentController.createStudent);
studentRoutes.put('/edit/:studentId', studentController.editStudent);
studentRoutes.delete('/delete/:studentId', studentController.deleteStudent);

export default studentRoutes;