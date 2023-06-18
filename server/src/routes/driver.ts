import { Router } from "express"
import { addDriver, getDriverDetail } from '../controllers/driverDetail'

const router: Router = Router()

router.post('/add', addDriver)
router.get('/get-driver', getDriverDetail)

export default router