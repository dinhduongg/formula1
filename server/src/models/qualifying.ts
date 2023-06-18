import { IQualifying } from '../types/race'
import { Schema, model } from 'mongoose'

const qualifyingDetail: Schema = new Schema({
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
    q1: {
        type: String
    },
    q2: {
        type: String
    },
    q3: {
        type: String
    },
    laps: {
        type: String
    }
})

const qualifying: Schema = new Schema(
    {
        year: {
            type: String,
            required: true
        },
        countryName: {
            type: String,
            required: true
        },
        qualifyingDetail: [qualifyingDetail]
    },
    { timestamps: true }
)

export default model<IQualifying>('Qualifying', qualifying)