const Holiday = require("../models/Holiday");
const { validateRequiredFields } = require("../utils/validateRequiredFields");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");

exports.createHoliday = async (req, res) => {
  const { leaveTitle, description, date } = req.body;

  const missingFields = validateRequiredFields({
    leaveTitle,
    description,
    date,
  });
  if (missingFields.length > 0) {
    return sendErrorResponse(
      res,
      400,
      `Missing fields: ${missingFields.join(", ")}`
    );
  }

  try {
    const parsedDate = new Date(date);

    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth() + 1;

    const holiday = new Holiday({
      leaveTitle,
      description,
      date: parsedDate,
      year,
      month,
    });

    const savedHoliday = await holiday.save();
    sendSuccessResponse(res, 201, "Holiday created successfully", savedHoliday);
  } catch (err) {
    console.error(err.message);
    sendErrorResponse(res, 500, "Server error", err);
  }
};

// Get all Holidays
exports.getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find();
    sendSuccessResponse(res, 200, "Holidays retrieved successfully", holidays);
  } catch (err) {
    console.error(err.message);
    sendErrorResponse(res, 500, "Server error", err);
  }
};

// Get Holiday by ID
exports.getHolidayById = async (req, res) => {
  const { id } = req.params;

  try {
    const holiday = await Holiday.findById(id);
    if (!holiday) {
      return sendErrorResponse(res, 404, "Holiday not found");
    }
    sendSuccessResponse(res, 200, "Holiday retrieved successfully", holiday);
  } catch (err) {
    console.error(err.message);
    sendErrorResponse(res, 500, "Server error", err);
  }
};

// Update Holiday
exports.updateHoliday = async (req, res) => {
  const { id } = req.params;
  const { leaveTitle, description, date, year, month } = req.body;

  try {
    let holiday = await Holiday.findById(id);
    if (!holiday) {
      return sendErrorResponse(res, 404, "Holiday not found");
    }

    holiday.leaveTitle =
      leaveTitle !== undefined ? leaveTitle : holiday.leaveTitle;
    holiday.description =
      description !== undefined ? description : holiday.description;
    holiday.date = date !== undefined ? date : holiday.date;
    holiday.year = year !== undefined ? year : holiday.year;
    holiday.month = month !== undefined ? month : holiday.month;
    holiday = await holiday.save();

    sendSuccessResponse(res, 200, "Holiday updated successfully", holiday);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map((e) => ({
        path: e.path,
        message: e.message,
      }));

      sendErrorResponse(res, 400, "Validation error", {
        errors: errorMessages,
        _message: err.message,
        name: err.name,
      });
    } else {
      console.error(err.message);
      sendErrorResponse(res, 500, "Server error", err);
    }
  }
};

// Delete Holiday
exports.deleteHoliday = async (req, res) => {
  const { id } = req.params;

  try {
    const holiday = await Holiday.findById(id);
    if (!holiday) {
      return sendErrorResponse(res, 404, "Holiday not found");
    }

    await holiday.deleteOne();
    sendSuccessResponse(res, 200, "Holiday deleted successfully");
  } catch (err) {
    console.error(err.message);
    sendErrorResponse(res, 500, "Server error", err);
  }
};
