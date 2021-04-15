/*
Import
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
//

const MySchema = new Schema({
    // Schema.org
    '@context': { type: String, default: 'http://schema.org' },
    '@type': { type: String, default: 'Commentaire' },

    content: String,

    // Associer le profil utilisateur
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'  
    },

    // Associer le post
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    }
})
//

/* 
Export
*/
module.exports = mongoose.model('comment', MySchema)
//