const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const branchRoutes = require("./routes/branchRoutes.js");
const branchAdminRoutes = require("./routes/branchAdmin.js");
const branchTypeRoutes = require("./routes/branchTypeRoutes.js");
const userRoleRoutes = require("./routes/userRoleRoutes.js");
const classRoutes = require("./routes/classRoutes.js");
const sectionRoutes = require("./routes/sectionRoutes.js");
const subjectRoutes = require("./routes/subjectRoutes.js");
const staffRoutes = require("./routes/staffRoutes.js");
const guardianRoutes = require("./routes/guardianRoutes.js");
const teacherRoutes = require("./routes/teacherRoutes.js");
const studentRoute = require("./routes/studentRoutes.js");
const holidayRoutes = require("./routes/holidayRoutes.js");
const teacherLeave = require("./routes/teacherLeaveRoutes.js");
const staffLeaveRoutes = require("./routes/staffLeaveRoutes.js");
const combinedLeave = require("./routes/combinedLeaveRoutes.js");
const branchAdminLeaveRoutes = require("./routes/branchAdminLeaveRoutes.js");
const superAdminLeaveRoute = require("./routes/superAdminLeaveRoute.js");
const branchClassDaysRoutes = require("./routes/branchClassDaysRoutes.js");
const branchDailyTimeSlotsRoutes = require("./routes/branchDailyTimeSlotsRoutes.js");
const branchSettingsRoutes = require("./routes/branchSettingsRoute.js");
const classSlotAssignmentsRoutes = require("./routes/classSlotAssignmentsRoutes.js");
const classSlotAssignmentsSingleRoutes = require("./routes/classSlotAssignmentsSingleRoutes.js");
const classSlotAssignmentsStudentRoutes = require("./routes/classSlotAssignmentsStudentRoutes.js");
const classAttendanceRoutes = require("./routes/classAttendanceRoutes.js");
const classAttendanceSingleRoutes = require("./routes/classAttendanceSingleRoutes.js");
const diaryRoutes = require("./routes/diaryRoutes.js");
const studentDiaryRoutes = require("./routes/studentDiaryRoutes.js");
const studentSubjectRoutes = require("./routes/studentSubjectRoutes.js");
const studentAttendanceRoutes = require("./routes/studentAttendanceRoutes.js");
const studentAttendanceSingleRoutes = require("./routes/studentAttendanceSingleRoutes.js");
const guardianStudentsRoutes = require("./routes/guardianStudentsRoutes.js");
const guardianStudentsSingleRoutes = require("./routes/guardianStudentsSingleRoutes.js");
const guardianAttendanceRoutes = require("./routes/guardianAttendanceRoutes.js");
const guardianAttendanceSingleRoutes = require("./routes/guardianAttendanceSingleRoutes.js");
const guardianDiaryRoutes = require("./routes/guardianDiaryRoutes.js");
const guardianDashboardRoutes = require("./routes/guardianDashboardRoutes.js");
const studentDashboardRoutes = require("./routes/studentDashboardRoutes.js");
const branchAdminDashboardRoutes = require("./routes/branchAdminDashboardRoutes.js");
const branchAdminUserRoutes = require("./routes/branchAdminUserRoutes.js");
const superAdminRoutes = require("./routes/superAdminRoutes.js");
const path = require("path");

const app = express();
connectDB();

app.get("/ping", (req, res) => {
  res.send("pinged");
});
// Middlewares

const corsOptions = {
  // origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

if (process.env.NODE_ENV === "development") {
  corsOptions.origin = process.env.REACT_APP_API_URL;
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   "/assets/images/branchAdmin",
//   express.static(path.join(__dirname, "assets", "images", "branchAdmin"))
// );
// app.use(
//   "/assets/images/staff",
//   express.static(path.join(__dirname, "assets", "images", "staff"))
// );
// app.use(
//   "/assets/images/teacher",
//   express.static(path.join(__dirname, "assets", "images", "teacher"))
// );
// app.use(
//   "/assets/images/student",
//   express.static(path.join(__dirname, "assets", "images", "student"))
// );
// app.use("/public/docs", express.static(path.join(__dirname, "assets", "docs")));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/branch", branchRoutes);
app.use("/api/branch-admin", branchAdminRoutes);
app.use("/api/branch-type", branchTypeRoutes);
app.use("/api/user-role", userRoleRoutes);
app.use("/api/class", classRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/guardian", guardianRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoute);
app.use("/api/holiday", holidayRoutes);
app.use("/api/teacher-leave", teacherLeave);
app.use("/api/staff-leave", staffLeaveRoutes);
app.use("/api/combined-leave", combinedLeave);
app.use("/api/branch-admin-leave", branchAdminLeaveRoutes);
app.use("/api/super-admin-leave", superAdminLeaveRoute);
app.use("/api/branch-class-days", branchClassDaysRoutes);
app.use("/api/branch-daily-time-slots", branchDailyTimeSlotsRoutes);
app.use("/api/branch-settings", branchSettingsRoutes);
app.use("/api/class-slot-assignments", classSlotAssignmentsRoutes);
app.use("/api/class-slot-assignments-single", classSlotAssignmentsSingleRoutes);
app.use(
  "/api/class-slot-assignments-student",
  classSlotAssignmentsStudentRoutes
);
app.use("/api/class-attendance", classAttendanceRoutes);
app.use("/api/class-attendance-single", classAttendanceSingleRoutes);
app.use("/api/diary", diaryRoutes);
app.use("/api/student-diary", studentDiaryRoutes);
app.use("/api/student-subjects", studentSubjectRoutes);
app.use("/api/student-attendance", studentAttendanceRoutes);
app.use("/api/student-attendance-single", studentAttendanceSingleRoutes);
app.use("/api/guardian-students", guardianStudentsRoutes);
app.use("/api/guardian-students-single", guardianStudentsSingleRoutes);
app.use("/api/guardian-attendance", guardianAttendanceRoutes);
app.use("/api/guardian-attendance-single", guardianAttendanceSingleRoutes);
app.use("/api/guardian-diary", guardianDiaryRoutes);
app.use("/api/guardian-dashboard", guardianDashboardRoutes);
app.use("/api/student-dashboard", studentDashboardRoutes);
app.use("/api/branch-admin-dashboard", branchAdminDashboardRoutes);
app.use("/api/branch-admin-users", branchAdminUserRoutes);
app.use("/api/super-admin", superAdminRoutes);

/**
 * --------SERVE REACT--------
 */
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
