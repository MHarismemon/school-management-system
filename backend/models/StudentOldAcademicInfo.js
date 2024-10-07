const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentOldAcademicInfoSchema = new Schema({
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student',
        required: true 
    },
    instituteName: { 
        type: String, 
        required: [true, 'Name of the institute is required.'] 
    },
    location: { 
        type: String, 
        required: [true, 'Location is required.'] 
    },
    from: { 
        type: Date, 
        required: [true, 'From date is required.'] 
    },
    to: { 
        type: Date, 
        required: [true, 'To date is required.'] 
    },
    upToClass: { 
        type: String, 
        required: [true, 'Up to Class is required.'] 
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('studentOldAcademicInfo', studentOldAcademicInfoSchema);