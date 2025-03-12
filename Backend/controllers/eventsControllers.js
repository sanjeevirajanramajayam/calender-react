const { format } = require('date-fns')
const db = require('../config/db')

const get_events = (req, res) => {
    const query = 'SELECT * FROM events;'

    db.query(query, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({
                error: err.message
            })
        }
        return res.json(results)
    })
}

const add_event = (req, res) => {
    const {event_name, start_time, end_time, day} = req.body;
    const values = [event_name, start_time, end_time, day];
    const query = 'INSERT INTO events (event_name, start_time, end_time, day) VALUES (?, ?, ?, ?);'

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({
                error: err.message
            })
        }
        return res.json(results)
    })
}

const update_event = (req, res) => {
    var {event_name, event, day} = req.body;
    console.log(event_name, event)
    event.day = format(new Date(event.day), 'yyyy-MM-dd');
    day = format(new Date(day), 'yyyy-MM-dd');
    const values = [event.event_name, event.start_time, event.end_time, event.day, event_name, day];
    const query = 'UPDATE events SET event_name = ?, start_time = ?, end_time = ?, day = ? WHERE event_name = ? and day = ?'

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({
                error: err.message
            })
        }
        return res.json(results)
    })
}

const delete_event = (req, res) => {
    var {event_name, day} = req.body;
    day = format(new Date(day), 'yyyy-MM-dd');
    const values = [event_name, day];
    const query = 'DELETE FROM events WHERE event_name = ? and day = ?;'

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({
                error: err.message
            })
        }
        return res.json(results)
    })
}

module.exports = {
    get_events,
    add_event,
    update_event,
    delete_event
}