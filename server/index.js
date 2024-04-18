import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import quizRoutes from './routes/Quiz.js'
import subjectRoutes from './routes/subject.js'
import resultRoutes from './routes/Result.js'
import tagRoutes from './routes/Tag.js'
import adminRoutes from './routes/Admin.js'
import departmentRoutes from './routes/Department.js'
import contestRoutes from './routes/Contest.js'
import ProblemRoutes from './routes/Problem.js'
import submissionsRoutes from './routes/Submission.js'

const app = express();
dotenv.config()
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))

app.use(cors());
app.use(cookieParser());
app.get('/', (req, res)=>{
    res.send("This is a bitBridge app API");
});

app.use('/user', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answer', answerRoutes);
app.use('/quiz', quizRoutes)
app.use('/subject', subjectRoutes)
app.use('/result', resultRoutes)
app.use('/tag', tagRoutes)
app.use('/admin', adminRoutes)
app.use('/department', departmentRoutes)
app.use('/contest', contestRoutes)
app.use('/problem', ProblemRoutes)
app.use('/submission', submissionsRoutes)




const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.CONNECTION_URL
mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> {console.log(`server running on port ${PORT}`);}))
    .catch((err) =>{console.log(err.message);})