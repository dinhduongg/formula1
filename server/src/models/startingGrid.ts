import { IStartingGrid } from '../types/race'
import { Schema, model } from 'mongoose'

const startingGridDetail: Schema = new Schema({
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
    time: {
        type: String
    }
})

const startingGrid: Schema = new Schema(
    {
        year: {
            type: String,
            required: true
        },
        countryName: {
            type: String,
            required: true
        },
        startingGridDetail: [startingGridDetail]
    },
    { timestamps: true }
)

export default model<IStartingGrid>('StartingGrid', startingGrid)