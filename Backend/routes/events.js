const express = require('express')
const router = express.Router()
const {get_events, add_event, update_event, delete_event} = require('../controllers/eventsControllers')

router.get('/view', get_events)
router.post('/add', add_event)
router.post('/update', update_event)
router.post('/delete', delete_event)

module.exports = router