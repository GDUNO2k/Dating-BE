const router = require('express').Router()
const auth = require("../middleware/auth")
const datingCtrl = require("../controllers/datingCtrl")


router.post('/dating/create', auth, datingCtrl.createTimeline)

router.get('/dating/timeline/:id', auth, datingCtrl.getTimeline)

router.patch('/dating/updateStatusTimeline/:id', auth, datingCtrl.updateCalenderStatus)

router.patch('/dating/updateTimeline/:id', auth, datingCtrl.updateCalender)


module.exports = router