import { Document } from "mongoose";

export interface IAllTeamDetail extends Document {
    pos: string
    team_name: string
    point: string
}

export interface IAllTeam extends Document {
    year: string
    teams: IAllTeamDetail[]
    names: [{ value: string, label: string }]
}

// for team detail
export interface ITeamDetail extends Document {
    grandPrix: string
    date: string
    point: string
}

export interface ITeam extends Document {
    year: string
    name: string
    avg_point: string | number
    teamDetail: ITeamDetail[]
}