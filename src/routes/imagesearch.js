import { Router } from 'express'
import ImageFetch from '../imagefetch'

const router = Router()

router.get('/:search', (req, res) => {
  const search = req.params.search
  const offset = req.query.offset
  new ImageFetch(search, offset)
    .fetchImages()
    .then(data => res.json(data))
})

router.get('/', (req,res) => {
    const noSearchSpecified = {
        error: 'No search term specified', 
        message: 'Please specify a search term in your request'
    }
    res.json(noSearchSpecified)
})

export default router
