const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const TasksRouter = require('./Routes/TasksRouter');

require('dotenv').config();
require('./Models/db')

const PORT = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(cors())
app.use('/auth', AuthRouter );
app.use('/tasks',TasksRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
