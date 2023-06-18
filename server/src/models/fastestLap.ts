import { IFastestLap } from '../types/race'
import { Schema, model } from 'mongoose'

const fastestLapDetail: Schema = new Schema({
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
    lap: {
        type: String
    },
    time: {
        type: String
    },
    avg_speed: {
        type: String
    }
})

const fastestLap: Schema = new Schema(
    {
        year: {
            type: String,
            required: true
        },
        countryName: {
            type: String,
            required: true
        },
        fastestLapDetail: [fastestLapDetail]
    },
    { timestamps: true }
)

export default model<IFastestLap>('FastestLap', fastestLap)