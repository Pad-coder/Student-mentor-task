import studentModel from "../models/studentModel.js";
import mentorModel from "../models/mentorModel.js";

const createStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Please enter name and email" });
    }
    const existingstudent = await studentModel.findOne({ email });
    if (existingstudent) {
      return res.status(400).json({ message: "Student is already existing" });
    }

    const generateRollNo = async () => {
      const lastStudent = await studentModel.findOne(
        {},
        {},
        { sort: { rollno: -1 } }
      );
      if (lastStudent) {
        return lastStudent.rollno + 1;
      } else {
        return 1; // Starting roll number
      }
    };

    const rollno = await generateRollNo();

    const newStudent = new studentModel({
      name,
      rollno,
      email,
    });
    await newStudent.save();
    res
      .status(201)
      .json({ message: "Student created successfully", newStudent });
  } catch (error) {
    console.log("Error in create student controller", error.message);
    res.status(500).json({
      error: "Intrenal Server Error",
    });
  }
};

const getAvailableStudents = async (req, res) => {
  try {
    const students = await studentModel.find({ mentor: null });
    res.status(200).json(students);
  } catch (error) {
    console.log("Error in Get available students controller", error.message);
    res.status(500).json({ error: error.message });
  }
};

const assignMentor = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.studentId);
    const mentor = await mentorModel.findById(req.params.mentorId);
    if (!student || !mentor) {
      return res.status(404).json({ message: "Student or Mentor not found" });
    }

    if (student.mentor) {
      student.previousMentors.push(student.mentor);
    }

    student.mentor = mentor._id;
    await student.save();

    mentor.students.push(student._id);
    await mentor.save();

    res.status(200).json({ message: "Mentor assigned for student", student });
  } catch (error) {
    console.log("Error in assign mentor controller", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getPreviousMentor = async (req, res) => {
  try {
    const student = await studentModel
      .findById(req.params.studentId)
      .populate("previousMentors");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student.previousMentors);
  } catch (error) {
    console.log("error in Get Previous mentor controller", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
export default {
  createStudent,
  getAvailableStudents,
  assignMentor,
  getPreviousMentor,
};
