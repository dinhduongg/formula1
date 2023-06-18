import { Response, Request } from 'express'
import { IDhl } from '../../types/dhl'
import Dhl from '../../models/dhl'

const addDhl = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body as IDhl

        // if (!body.year || !body.drivers) {
        //     return res.status(400).json({ message: 'Data is not correct' })
        // }
    
        const dhl: any = new Dhl({
            winner: body.winner,
            year: body.year,
            dhlDetail: body.dhlDetail
        })
    
        await dhl.save()

        return res
          .status(201)
          .json({ message: "DHL added" })
    } catch (error) {
        throw error
    }
}

const getAllDHL = async (req: Request, res: Response): Promise<any> => {
    try {
        const query = req.query as { year: string }        

        const DHLs = await Dhl.findOne({ year: query.year })

        return res.status(201).json({ data: DHLs })
    } catch (error) {
        throw error
    }
}


export { addDhl, getAllDHL }