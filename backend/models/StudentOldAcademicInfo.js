const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentOldAcademicInfoSchema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    instituteName: {
      type: String,
      // required: [true, 'Name of the institute is required.]
      default: "-",
    },
    location: {
      type: String,
      default: "-",
      // required: [true, 'Location is required.']
    },
    from: {
      type: Date,
      default: null,
      // required: [true, 'From date is required.']
    },
    to: {
      type: Date,
      default: null,
      // required: [true, 'To date is required.']
    },
    upToClass: {
      type: String,
      default: "-",
      //required: [true, 'Up to Class is required.']
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "studentOldAcademicInfo",
  studentOldAcademicInfoSchema
);
