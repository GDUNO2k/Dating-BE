const mongoose = require('mongoose')


const datingSchema = new mongoose.Schema({
    couple: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    date: {
        from: {
            type: String,
            default: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1))
        },
        to: {
            type: String,
            default: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 7))
        },
    },
    calender: [
        {
            byUser: { type: mongoose.Types.ObjectId, ref: 'user' },
            statusApprove: { type: String, default: "pending" },
            status: { type: String, require: true },
            date: { type: String, default: new Date() },
            time: { type: String, require: true },
            note: { type: String, require: true  }
        }
    ]
}, {
    timestamps: true
})


module.exports = mongoose.model('dating', datingSchema)