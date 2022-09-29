import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/authRouter.js';
import TableRowRouter from './routes/TableRowRouter.js';
import cors from 'cors'

const PORT = process.env.PORT || 5000
const DB_URL=`mongodb+srv://karlen:123@cluster0.zctnru2.mongodb.net/?retryWrites=true&w=majority`

const app = express()
app.use (
  cors()
)

app.use(express.json())
app.use('/auth', authRouter)
app.use('/tableRow', TableRowRouter)


async function startApp(){
  try{
    await mongoose.connect(DB_URL,{useUnifiedTopology: true , useNewUrlParser: true})
    app.listen(PORT, ()=>console.log('work'))
  }
  catch(e){
    console.log(e)
  }
}

startApp()

