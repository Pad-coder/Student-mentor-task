import mongoose from "../mongoDb/ConnectDb.js";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollno: { type: Number, unique: true },
    email: { type: String, required: true },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      default: null,
    },
    previousMentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }],
  },
  {
    timestamps: true,
    collection: "Student",
  }
);

export default new mongoose.model("Student", studentSchema);
