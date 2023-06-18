import { Router } from "express"
import race from '../controllers/race'

const router: Router = Router()

router.post('/add-list', race.addListRace)
router.get('/get-list-race', race.getListRace)

router.post('/add-race-result', race.addRaceResult)
router.get('/get-race-result', race.getRaceResult)

router.post('/add-fastest-lap', race.addfastestLap)
router.get('/get-fastest-lap', race.getFastetsLap)

router.post('/add-pit-stop', race.addPitStopSummary)
router.get('/get-pit-stop', race.getPitStopSummary)

router.post('/add-starting-grid', race.addStartingGrid)
router.get('/get-starting-grid', race.getStartingGrid)

router.post('/add-qualifying', race.addQualifying)
router.get('/get-qualitying', race.getQualifying)

router.post('/add-practice3', race.addPractice3)
router.get('/get-practice3', race.getPractice3)

router.post('/add-practice2', race.addPractice2)
router.get('/get-practice2', race.getPractice2)

router.post('/add-practice1', race.addPractice1)
router.get('/get-practice1', race.getPractice1)

export default router