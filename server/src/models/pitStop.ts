import { IPitStopSummary } from '../types/race'
import { Schema, model } from 'mongoose'

const pitStopSummaryDetail: Schema = new Schema({
    stops: {
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
    time_of_day: {
        type: String
    },
    time: {
        type: String
    },
    total: {
        type: String
    }
})

const pitStopSummary: Schema = new Schema(
    {
        year: {
            type: String,
            required: true
        },
        countryName: {
            type: String,
            required: true
        },
        pitStopSummaryDetail: [pitStopSummaryDetail]
    },
    { timestamps: true }
)

export default model<IPitStopSummary>('PitStopSummary', pitStopSummary)