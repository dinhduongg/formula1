import { IAllTeam } from "../types/team";
import { model, Schema } from 'mongoose'

const allTeamDetail: Schema = new Schema({
    pos: {
        type: String
    },
    team_name: {
        type: String
    },
    point: {
        type: String
    }
})

const teamName: Schema = new Schema({
    value: {
        type: String
    },
    label: {
        type: String
    }
})

const allTeamSchema: Schema = new Schema(
    {
        year: {
            type: String,
            required: true
        },
        teams: [allTeamDetail],
        names: [teamName]
    },
    { timestamps: true }
)

export default model<IAllTeam>('AllTeam', allTeamSchema)