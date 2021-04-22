/*
Import
*/
const mongoose = require('mongoose')
const { Schema } = mongoose
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
    },

    // Associer les likes
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'like'
    }],

    // Définir une valeur par défaut
    creationDate: { type: Date, default: new Date() },
    dateModified: { type: Date, default: new Date() },
    isPublished: { type: Boolean, default: false }
})
//

/* 
Export
*/
module.exports = mongoose.model('comment', MySchema)
//