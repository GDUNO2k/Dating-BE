const router = require('express').Router()
const auth = require("../middleware/auth")
const userCtrl = require("../controllers/userCtrl")


router.get('/search', auth, userCtrl.searchUser)

router.get('/user/:id', auth, userCtrl.getUser)

router.patch('/user', auth, userCtrl.updateUser)

router.patch('/user/:id/follow', auth, userCtrl.follow)
router.patch('/user/:id/unfollow', auth, userCtrl.unfollow)

router.get('/suggestionsUser', auth, userCtrl.suggestionsUser)

router.get('/suggestionMatchingsUser', auth, userCtrl.suggestionMatchingsUser)

router.patch('/user/:id/matching', auth, userCtrl.matching)
router.patch('/user/:id/accept-matching', auth, userCtrl.acceptMatching)
router.patch('/user/:id/unmatch', auth, userCtrl.unmatch)

module.exports = router