// importing express backend
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = require('./models')

// Routers for all the tables
const formRouter = require('./routes/Forms');
app.use("/forms", formRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);

// sequelize makes the app listen to a specific port
db.sequelize.sync().then( () => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});




