import { Router } from "express";
import mentorRoute from "./mentorRoute.js";
import studentRoute from "./studentRoute.js";

const Routes = Router();

Routes.use("/mentor", mentorRoute);
Routes.use("/student", studentRoute);

export default Routes;
