import path from 'path'
import express from 'express'
import imageSearchRoute from './routes/imagesearch'
import latestRoute from './routes/latest'

const app = express()

const publicPath = path.join(__dirname, '../', 'public')
const html = path.normalize(path.join(publicPath, 'index.html'))

app.use('/api/imagesearch', imageSearchRoute)
app.use('/api/latest', latestRoute)
app.use('/', express.static(path.normalize(publicPath)))
app.get('/', (req,res) => {
    res.sendFile(html)
})

app.listen(process.env.PORT || 8000)

export default app
