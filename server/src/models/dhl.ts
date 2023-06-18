import { IDhl } from '../types/dhl'
import { model, Schema } from 'mongoose'

const dhlDetail: Schema = new Schema({
    grandPrix: {
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

const dhl: Schema = new Schema(
    {
        winner: {
            type: String
        },
        year: {
            type: String
        },
        dhlDetail: [dhlDetail]
    },
    { timestamps: true }
)

export default model<IDhl>('Dhl', dhl)