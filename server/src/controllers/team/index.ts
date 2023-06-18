import { Response, Request } from "express"
import { IAllTeam } from '../../types/team'
import AllTeam from "../../models/allTeam"

const addListTeam = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body as IAllTeam
        
        const allTeam: IAllTeam = new AllTeam({
            year: body.year,
            teams: body.teams,
            names: body.names
        })

        await allTeam.save()

        return res
          .status(201)
          .json({ message: "Team added success" })
    } catch (error) {
        throw error
    }
}

const getListTeam = async (req: Request, res: Response): Promise<any> => {
    try {
        const query = req.query as { year: string }

        const teams = await AllTeam.findOne({ year: query.year })

        return res.status(201).json({ data: teams })
    } catch (error) {
        throw error
    }
}

export { addListTeam, getListTeam }