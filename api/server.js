const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();


const createError = require('http-errors');

// Middleware
app.use(bodyParser.json());
app.use(cors());



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// MongoDB setup
dbConfig = require('./db/database');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Database connected')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)



//http://localhost:8080/exam
//http://localhost:8080/questions
//http://localhost:8080/student
//http://localhost:8080/admin
//http://localhost:8080/category
//http://localhost:8080/answers
//http://localhost:8080/exam/submit
//http://localhost:8080/result/result/:userId






const authadminRoutes = require('./routes/authadmin.routes');
const authstudentRoutes = require('./routes/authstudent.routes');
const adminRoutes = require('./routes/admin.routes');
const studentRoutes = require('./routes/student.routes');
const categoryRoutes = require('./routes/category.routes');
const topicRoutes = require('./routes/topic.routes');
const questionsRoutes = require('./routes/question.routes');
const answersRoutes = require('./routes/answer.routes');
const examRoutes = require('./routes/exam.routes');
const resultRoutes = require('./routes/result.routes');


//localhost:8080/loginadmin/login






app.use('/loginadmin',authadminRoutes);
app.use('/loginstudent',authstudentRoutes);
app.use('/admin',adminRoutes);
app.use('/student',studentRoutes);
app.use('/category', categoryRoutes);
app.use('/topic', topicRoutes);
app.use('/questions', questionsRoutes);
app.use('/answers', answersRoutes);
app.use('/exam', examRoutes);
app.use('/result', resultRoutes);



// Start server
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log('Port connected to: ' + port)
})

app.use((req, res, next) => {
    next(createError(404));
});

app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

app.use(function (err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})