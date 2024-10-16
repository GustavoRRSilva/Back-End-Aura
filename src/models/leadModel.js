import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
});

mongoose.model('Lead', leadSchema);
