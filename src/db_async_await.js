import { MongoClient } from 'mongodb'
const databaseURL = process.env.MLAB_URI

const dbError = {
    error: {
        code: 503,
        message: 'There was an issue with the database.'
    }
}

const getLatest = async handler => {
    try {
        const db = await MongoClient.connect(databaseURL)
        const imageArray = await db.collection('images')
                                    .find({}, {fields: {_id: 0}})
                                    .sort({when: -1})
                                    .toArray()
        handler(imageArray.slice(0, 10))
        db.close()
    } catch (err) {
        handler(dbError)
    }
}

const updateLatest = async (term, timestamp) => {
    try {
        const doc = {term: term, when: timestamp}
        const db = await MongoClient.connect(databaseURL)
        await db.collection('images')
                .findOneAndReplace({}, doc, {sort: {when: 1}})
        db.close()
    } catch (err) {
        console.error(err)
    }
}

export {
    getLatest,
    updateLatest
}
