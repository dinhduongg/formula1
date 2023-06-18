import { Response, Request } from "express"
import { ITeam } from '../../types/team'
import Team from '../../models/teamDetail'

const addTeam = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body as ITeam        

        const team: ITeam = new Team({
            year: body.year,
            name: body.name,
            teamDetail: body.teamDetail
        })

        await team.save()

        return res
          .status(201)
          .json({ message: "Team added success" })
    } catch (error) {
        throw error
    }
}

const getTeamDetail = async (req: Request, res: Response): Promise<any> => {
    try {
        const query = req.query as { year: string, name: string }        
        
        const teams = await Team.find({ year: query.year, name: { $regex: query.name, $options: 'i' } })
        const team = teams.find(team => team.name === query.name)
        

        return res.status(201).json({ data: team })
    } catch (error) {
        console.log('lỗi ở teamDetail dòng 29')
    }
}

export { addTeam, getTeamDetail }