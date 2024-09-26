import mongoose from "../mongoDb/ConnectDb.js";

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
    collection: "Mentor",
  }
);

export default new mongoose.model("Mentor", mentorSchema);
