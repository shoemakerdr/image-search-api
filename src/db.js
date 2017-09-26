import { MongoClient } from 'mongodb'
const databaseURL = process.env.MLAB_URI

const dbError = {
            error: {
                code: 503,
                message: 'There was an issue with the database.'
            }
        }

const getLatest = responseObj => {
    MongoClient.connect(databaseURL, (err, db) => {
        if (err) responseObj.json(dbError)
        const images = db.collection('images')
        images.find({}, {fields: {_id: 0}})
            .sort({when: -1})
            .toArray()
            .then(array => array.slice(0,10))
            .then(res => responseObj.json(res))
            .then(() => db.close)
            .catch(() => responseObj.json(dbError))
    })
}

const updateLatest = (term, timestamp) => {
    const doc = {term: term, when: timestamp}
    MongoClient.connect(databaseURL, (err, db) => {
        if (err) console.error(err)
        const images = db.collection('images')
        images.insert(doc)
            .then(() => {
                images.findOneAndDelete({}, {sort: {when: 1}})
                    .then(() => db.close)
                    .catch(console.error)
        }).catch(console.error)
    })
}

export {
    getLatest,
    updateLatest
}
