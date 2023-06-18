import { Router } from "express"
import { addListDriver, getListDriver } from '../controllers/driver'

const router: Router = Router()

router.post('/add-list', addListDriver)
router.get('/get-list-driver', getListDriver)

export default router