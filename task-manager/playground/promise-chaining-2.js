require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findOneAndRemove({ _id: '5c8f35f655af4e0f3475675f' })
    .then((documentId) => {
        console.log('This document removed', documentId)
        return Task.countDocuments()
    }).then((documentCount) => {
        console.log('The document count after deletion is', documentCount)
    })
    .catch((error) => {
        console.log(error)
    });