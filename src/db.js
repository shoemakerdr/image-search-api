import { MongoClient } from 'mongodb'
const databaseURL = process.env.MLAB_URI

const dbError = {
    error: {
        code: 503,
        message: 'There was an issue with the database.'
    }
}

const getLatest = handler => {
    MongoClient.connect(databaseURL, (err, db) => {
        if (err) handler(dbError)
        const images = db.collection('images')
        images.find({}, {fields: {_id: 0}})
            .sort({when: -1})
            .toArray()
            .then(array => array.slice(0,10))
            .then(res => handler(res))
            .then(() => db.close)
            .catch(() => handler(dbError))
    })
}

const updateLatest = (term, timestamp) => {
    const doc = {term: term, when: timestamp}
    MongoClient.connect(databaseURL, (err, db) => {
        if (err) console.error(err)
        const images = db.collection('images')
        images.findOneAndReplace({}, doc, {sort: {when: 1}})
            .then(() => db.close)
            .catch(console.error)
    })
}

export {
    getLatest,
    updateLatest
}
