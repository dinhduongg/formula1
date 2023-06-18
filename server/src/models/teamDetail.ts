import { ITeam } from "../types/team"
import { model, Schema } from 'mongoose'

const teamDetailSchema: Schema = new Schema({
    grandPrix: {
        type: String
    },
    date: {
        type: String
    },
    point: {
        type: String
    }
})

const teamSchema: Schema = new Schema(
    {
        year: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        avg_point: {
            type: String || Number,
        },
        teamDetail: [teamDetailSchema]
    },
    { timestamps: true }
)

export default model<ITeam>('Team', teamSchema)