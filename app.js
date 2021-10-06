require('dotenv').config()

const express = require('express');
const todosRoutes = require('./routes/todos');
const morgan = require('morgan');
const connectToDatabase = require('./config/db');

const app = express();

connectToDatabase();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan(':method :url :status - :response-time ms'));

app.use('/api/v1/todos', todosRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server is running at port: ' + process.env.PORT);
})