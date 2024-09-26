import { Router } from "express";
import studentController from "../controller/studentController.js";
const Routes =Router()

Routes.post('/create',studentController.createStudent)
Routes.get('/availableStudents',studentController.getAvailableStudents)
Routes.post('/:studentId/assignMentor/:mentorId',studentController.assignMentor)
Routes.get('/:studentId/previousMentor',studentController.getPreviousMentor)


export default Routes