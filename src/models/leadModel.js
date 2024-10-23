import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

mongoose.model('Lead', leadSchema);
