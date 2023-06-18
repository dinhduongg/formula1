import { IRaceResult } from '../types/race'
import { Schema, model } from 'mongoose'

const raceResultDetail: Schema = new Schema({
    pos: {
        type: String
    },
    no: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    car: {
        type: String
    },
    laps: {
        type: String
    },
    time_retired: {
        type: String
    },
    point: {
        type: String
    }
})

const raceResult: Schema = new Schema(
    {
        year: {
            type: String,
            required: true
        },
        countryName: {
            type: String,
            required: true
        },
        raceResultDetail: [raceResultDetail]
    },
    { timestamps: true }
)

export default model<IRaceResult>('RaceResult', raceResult)