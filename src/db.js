import { MongoClient } from 'mongodb'
const databaseURL = process.env.MLAB_URI

const dbError = {
            error: {
                code: 503,
                message: 'There was an issue with the database.'
            }
        }

const getLatest = handler => {
    handler(dbError)
    // MongoClient.connect(databaseURL, (err, db) => {
    //     if (err) {
    //         console.error(err)
    //         handler(dbError)
    //     }
        
    //     console.log('MongoClient connected.')
        
    //     const latest = db.collection('latest')
        
    //     latest.updateOne().then(handler).catch(() => handler(dbError))

    // })
}

const updateLatest = (term, timestamp) => {
    MongoClient.connect(databaseURL, (err, db) => {
        if (err) return console.error(err)
        
        console.log('MongoClient connected.')
        
        // FORMAT: {"term":"lolcats funny","when":"2017-09-25T20:20:15.226Z"}
        
        const latest = db.collection('latest')

    })
}

export {
    getLatest,
    updateLatest
}
