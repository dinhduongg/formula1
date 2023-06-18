import { Response, Request } from 'express'
import { IDriver } from '../../types/driver'
import Driver from '../../models/driverDetail'

const addDriver = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body as IDriver

        // if (!body.year || !body.driverDetail || !body.firstname || !body.lastname) {
        //     return res.status(400).json({ message: 'Data is not correct' })
        // }
    
        const driver: IDriver = new Driver({
            year: body.year,
            firstname: body.firstname,
            lastname: body.lastname,
            avg_point: body.avg_point,
            driverDetail: body.driverDetail
        })
    
        await driver.save()
    
        return res
          .status(201)
          .json({ message: "Driver added success" })
    } catch (error) {
        throw error
    }
}

const getDriverDetail = async (req: Request, res: Response): Promise<any> => {
    try {
        const query = req.query as { year: string, firstname: string, lastname: string }   
        
        const where = query.year ? { year: query.year, firstname: { $regex: query.firstname, $options: 'i' }, lastname: { $regex: query.lastname, $options: 'i' } } : { firstname: { $regex: query.firstname, $options: 'i' }, lastname: { $regex: query.lastname, $options: 'i' } }

        const driver = await Driver.find(where)

        return res.status(201).json({ data: driver })
    } catch (error) {
        throw error
    }
}

export { addDriver, getDriverDetail }