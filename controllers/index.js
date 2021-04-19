/* 
Definition
*/
const Controllers = {
    auth: require('./auth.controller'),
    post: require('./post.controller'),
    user: require('./user.controller'),
    comment: require('./comment.controller'),
    like: require('./like.controller')
}
//

/*  
Export
*/
module.exports = Controllers
//