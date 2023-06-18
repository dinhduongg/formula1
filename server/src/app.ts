'mongodb+srv://leduongdatly:leduongdatly@cluster.mbo7650.mongodb.net/fomula1?retryWrites=true&w=majority'

import express, { Express } from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"

import allDriverRoutes from "./routes/allDriver"
import driverRoutes from "./routes/driver"
import allTeamRoutes from './routes/allTeam'
import teamRoutes from './routes/team'
import raceRoutes from './routes/race'
import dhl from './routes/dhl'

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json({limit: '10000mb'}));

app.use('/all-driver', allDriverRoutes)
app.use('/driver', driverRoutes)
app.use('/all-team', allTeamRoutes)
app.use('/team', teamRoutes)
app.use('/race', raceRoutes)
app.use('/dhl', dhl)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster.mbo7650.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })
