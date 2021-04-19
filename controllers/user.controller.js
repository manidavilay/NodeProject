/* 
Imports
*/
const Models = require('../models/index')
//

/*  
CRUD methods
*/
const readOne = id => {
    return new Promise((resolve, reject) => {
        // Mongoose population to get associated data
        Models.user.findById(id)
        .populate('author', ['-password'])
        .exec((err, data) => {
            if (err) {
                return reject(err)
            }
            else {
                return resolve(data)
            }
        })
    })
}
 
const readAll = () => {
    return new Promise((resolve, reject) => {
        // Mongoose population to get associated data
        Models.user.find()
        .populate('author', ['-password'])
        .exec((err, data) => {
            if (err) {
                return reject(err)
            }
            else {
                return resolve(data)
            }
        })
    })
}
//

/* 
Export controller methods
*/
module.exports = {
    readOne,
    readAll
}
//