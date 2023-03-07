import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import userRouter from "./routes/user.routes"
import messageRout from "./routes/message.routes"
import blogRoutes from "./routes/blog.routes"
import commentRout from "./routes/comment.routes"
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';


dotenv.config()
const app = express()       
app.use(express.json())
app.use(cors())
app.use(middleware.handle(i18next));

i18next.use(Backend).use(middleware.LanguageDetector)
.init({
    fallbackLng: 'en',
    backend: {
        loadPath: './src/locales/{{lng}}/translation.json',
    }
})

app.use('/api',userRouter) 
app.use('/api',messageRout)
app.use('/api',blogRoutes)
app.use('/api',commentRout)
app.all('*', (req, res) => { res.json({ error: req.t('404_error') }); });


app.listen(process.env.PORT, () => console.log(`running on port ${process.env.PORT}`))
  
module.exports = app;  