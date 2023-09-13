// importing express backend
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = require('./models')

// app.get('/auth', (req, res) => {
//     res.send("idk")
//     console.log("i got here!")
// })

// Routers for all the tables
const formRouter = require('./routes/Forms');
app.use("/forms", formRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);

// sequelize makes the app listen to a specific port
db.sequelize.sync().then( () => {
    app.listen(5001, () => {
        console.log("Server running on port 5001");
    });
});