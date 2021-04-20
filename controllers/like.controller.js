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

const readLikesInPost = postId => {
    return new Promise((resolve, reject) => {
        // Mongoose population to get associated data
        Models.like.find({post: postId})
        .populate('like', ['post', 'author'])
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

const readLikesInComment = commentId => {
    return new Promise((resolve, reject) => {
        // Mongoose population to get associated data
        Models.like.find({comment: commentId})
        .populate('like', ['comment', 'author'])
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

const deleteOne = req => {
    return new Promise((resolve, reject) => {
        Models.like.findById(req.params.id)
        .populate('author', ['-password'])
        .then(data => {
            
            // Check user 
            if (String(comment.author) !== String(req.user._id)) {
                reject('User not authorized')
            }
            else {
                Models.like.findByIdAndDelete(req.params.id, (err, deleted) => {
                    if (err) { 
                        return reject(err)
                    }
                    else {

                        // Comment's likes
                        if (data.comment) {
                            Models.comment.findById(data.comment)
                            .then(comment => {
                                comment.likes.pull(data._id)
                                comment.save()
                                .then(updatedComment => resolve(updatedComment))
                                .catch(updateError => reject(updateError))
                            })
                            .catch(err => reject(err))
                        } 

                        // Post's likes
                        else if (data.post) {
                            Models.post.findById(data.post)
                            .then(post => {
                                post.likes.pull(data._id)
                                post.save()
                                .then(updatedPost => resolve(updatedPost))
                                .catch(updateError => reject(updateError))
                            })
                            .catch(err => reject(err))
                        }
                        return resolve(deleted) 
                    }
                })
            }
        })
        .catch(err => reject(err))
    })
}
//

/* 
Export controller methods
*/
module.exports = {
    createOne,
    readLikesInPost,
    readLikesInComment,
    deleteOne
}
//