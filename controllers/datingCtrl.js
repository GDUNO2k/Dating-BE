const Dating = require('../models/datingModel')

const datingCtrl = {
    createTimeline: async (req, res) => {
        try {
            const { couple, calender, date } = req.body

            const newTimeLine = new Dating({
                couple,
                date,
                calender
            })
            await newTimeLine.save()

            res.json({
                msg: 'Created timeline!',
                newTimeline: {
                    ...newTimeLine._doc,
                    user: req.user
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getTimeline: async (req, res) => {
        try {
            if (req.query.matchingId === 'undefined') {
                return res.json({
                    msg: 'Success!',
                    dating: []
                })
            }

            const dating = await Dating.find({
                $and: [
                    {
                        couple: {
                            $in: [
                                req.user._id,
                            ],
                        }
                    },
                    {
                        couple: {
                            $in: [
                                req.query.matchingId,
                            ],
                        }
                    }
                ]

            })
                .populate("couple byUser")

            res.json({
                msg: 'Success!',
                dating
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateCalenderStatus: async (req, res) => {
        try {
            const { status } = req.body

            const dating = await Dating.updateOne({ _id: req.params.id, }, {
                '$set': {
                    'calender.0.statusApprove': status,
                }
            }).populate("couple byUser")

            res.json({
                msg: 'Success!',
                dating
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateCalender: async (req, res) => {
        try {
            const { note, time, status } = req.body

            const dating = await Dating.updateOne({ _id: req.params.id, }, {
                '$set': {
                    'calender.0.note': note,
                    'calender.0.status': status,
                    'calender.0.time': time,
                }
            }).populate("couple byUser")

            res.json({
                msg: 'Updated!',
                dating
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}


module.exports = datingCtrl