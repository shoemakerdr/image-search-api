import { Router } from 'express'
import { getLatest } from '../db'

const router = Router()

router.get('/', (req, res) => {
    // Must explicitly bind res object to json method because passing res.json
    // to getLatest will cause .json method to lose `this` binding.
    const json = res.json.bind(res)
    getLatest(json)
})

export default router
