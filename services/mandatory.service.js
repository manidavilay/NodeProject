/* 
Definition
*/
    const Mandatory = {
        register: [ 'givenName', 'familyName', 'password', 'email' ],
        login: [ 'password', 'email' ],
        post: [ 'headline', 'body' ],
        comment: [ 'content', 'post' ]
    } 
//

/* 
Export
*/ 
    module.exports = Mandatory;
//