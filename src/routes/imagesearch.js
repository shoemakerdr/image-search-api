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

export default router