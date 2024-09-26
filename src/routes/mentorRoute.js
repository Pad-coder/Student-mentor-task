import { Router } from "express";
import mentorController from "../controller/mentorController.js";
const Routes = Router();

Routes.post("/create", mentorController.createMentor);
Routes.post("/assignStudent/:mentorId",mentorController.assignStudentsToMentor);
Routes.get("/:mentorId/getStudents", mentorController.getStudentsForMentor);

export default Routes;
