/* 
Imports
*/
const Models = require('../models/index')
//

/*  
CRUD methods
*/
const createOne = req => {
    return new Promise((resolve, reject) => {
        Models.like.create(req.body)
        .then(data => {
            resolve(data)
            // Comment's likes
            if (data.comment != null) {
                Models.comment.findById(data.comment)
                .then(comment => {
                    comment.likes.push(data._id)
                    comment.save()
                    .then(updatedComment => resolve(updatedComment))
                    .catch(updateError => reject(updateError))
                })
                .catch(err => {
                    reject(err)
                })
            }

            // Post's likes
            else if (data.post != null) {
                Models.post.findById(data.post)
                .then(post => {
                    post.likes.push(data._id)
                    post.save()
                    .then(updatedPost => resolve(updatedPost))
                    .catch(updatedError => reject(updatedError))
                })
                .catch(err => reject(err))
            }
        })
        .catch(err => reject(err))
    })
}

const deleteOne = req => {
    return new Promise(async (resolve, reject) => {
        Models.like.findByIdAndDelete(req._id)
        .then(async () => {
            resolve(req)
            // Comment's likes
            if (req.comment != null) {
                console.log('test')
                await Models.comment.findById(req.comment)
                .then(comment => {
                    comment.likes.splice(req._id)
                    comment.save()
                    .then(updatedComment => resolve(updatedComment))
                    .catch(updateError => reject(updateError))
                })
                .catch(err => reject(err))
            }

            // Post's likes
            else if (req.post != null) {
               await Models.post.findById(req.post)
                .then(post => {
                    post.likes.splice(req._id)
                    post.save()
                    .then(updatedPost => resolve(updatedPost))
                    .catch(updateError => reject(updateError))
                })
                .catch(err => reject(err))
            }
        })
        .catch(err => reject(err))
    })
    .catch(err => reject(err))
}
//

/* 
Export controller methods
*/
module.exports = {
    createOne,
    deleteOne
}
//