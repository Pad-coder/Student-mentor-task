import mentorModel from "../models/mentorModel.js";
import studentModel from "../models/studentModel.js";

const createMentor = async (req, res) => {
  try {
    const { name, username } = req.body;
    if (!name || !username) {
      return res.status(400).json({ message: "Name and Username is Required" });
    }
    const existingMentor = await mentorModel.findOne({ username });
    if (existingMentor) {
      return res.status(400).json({ message: "Username is already taken" });
    }
    const newMentor = new mentorModel({
      name,
      username,
    });
    await newMentor.save();
    res.status(201).json({ message: "Mentor created successfully", newMentor });
  } catch (error) {
    console.log("Error in create mentor controller", error.message);
    res.status(500).json({
      error: "Intrenal Server Error",
    });
  }
};

const assignStudentsToMentor = async (req, res) => {
  try {
    const mentor = await mentorModel.findById(req.params.mentorId);
    const students = await studentModel.find({
      _id: { $in: req.body.studentIds },
      mentor: null,
    });
    console.log(req.body.studentIds);

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    students.forEach(async (student) => {
      student.mentor = mentor._id;
      await student.save();
    });

    mentor.students.push(...req.body.studentIds);
    await mentor.save();

    res.status(200).json({ message: "Students assigned to mentor", mentor });
  } catch (error) {
    console.log(
      "Error in assign Students To Mentor  controller",
      error.message
    );
    res.status(500).json({
      error: "Intrenal Server Error",
    });
  }
};

const getStudentsForMentor = async (req, res) => {
  try {
    const mentor = await mentorModel
      .findById(req.params.mentorId)
      .populate("students");
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.status(200).json(mentor.students);
  } catch (error) {
    console.log("error in Get Students For Mentor controller", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
export default {
  createMentor,
  assignStudentsToMentor,
  getStudentsForMentor,
};
