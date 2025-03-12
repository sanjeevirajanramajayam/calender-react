const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const app = express();
const PORT = process.env.PORT || 8000
const eventRouter = require('./routes/events')

app.use(express.json())
app.use(cors())

app.use('/events', eventRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})