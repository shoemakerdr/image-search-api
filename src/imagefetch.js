import { updateLatest } from './db'
import axios from 'axios'

const API_KEY = process.env.API_KEY
const CTX = '013326804555788241764%3Abj1timpqya4'
const URL = 'https://www.googleapis.com/customsearch/v1'

const formatQuery = query =>
    (isNaN(query) || query < 1 || query === undefined) 
        ? 1 
        : query

class ImageFetch {
    constructor (search, query) {
        this.search = search
        this.query = formatQuery(query)
    }
    
    updateDb (search, timestamp) {
        updateLatest(search, timestamp)
    }
    
    formattedError () {
        return {
            error: {
                errors: [{domain: 'global', reason:'invalid', message:'Invalid Value'}],
                code: 400,
                message: 'Invalid Value'
            }
        }
    }
    
    formatResults (results) {
        return results.map(res => {
            return {
                url: res.link,
                snippet: res.snippet,
                thumbnail: res.image.thumbnailLink,
                context: res.image.contextLink
            }
        })
    }
    
    fetchImages () {
        const timestamp = new Date().toISOString()
        // this.updateDb(this.search, timestamp)
        return axios.get(`${URL}?q=${this.search}&cx=${CTX}&searchType=image&start=${this.query}&key=${API_KEY}`)
            .then(res => res.data.items)
            .then(this.formatResults)
            .catch(this.formattedError)
    }
}

export default ImageFetch