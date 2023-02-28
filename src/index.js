import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import userRouter from "./routes/user.routes"
import messageRout from "./routes/message.routes"
import blogRoutes from "./routes/blog.routes"
import commentRout from "./routes/comment.routes"

dotenv.config()
const app = express()       
app.use(express.json())
app.use(cors())
app.use('/api',userRouter) 
app.use('/api',messageRout)
app.use('/api',blogRoutes)
app.use('/api',commentRout)

app.listen(process.env.PORT, () => console.log(`running on port ${process.env.PORT}`))
  
module.exports = app;  