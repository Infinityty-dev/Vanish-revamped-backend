const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    runningService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true // Ensures every service is linked to a user
    },  
    serviceType: {
        type: String,
        required: true,
        trim: true
    },
    pickUpDate: {
        type: Date,
        required: true
    },
    pickUpLocation: {
        type: String,
        required: true,
        trim: true
    },
    pickUpZone: {
        type: String,
        required: true,
        trim: true
    },
    dropOffLocation: {
        type: String,
        required: true,
        trim: true
    },
    dropOffZone: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

// Prevent model overwrite in development
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

module.exports = Service;


