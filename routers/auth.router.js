/*
Imports
*/
// Node
const express = require('express'); //=> https://www.npmjs.com/package/express

// Inner
const Controllers = require('../controllers/index')
const { checkFields } = require('../services/request.service');
const Mandatory = require('../services/mandatory.service');
const { sendApiSuccessResponse,sendApiErrorResponse } = require('../services/response.service');
//

/*  
Routes definition
*/
class RouterClass {
    // Include Passport authentication service from server file in the RouterClass
    constructor( { passport } ){
        this.passport = passport
        this.router = express.Router(); 
    }

    routes() {
        // [AUTH] get data from client to register new user
        this.router.post('/register', async (req, res) => {
            // Check body data
            if ( typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0 ) { 
                return sendApiErrorResponse(req, res, null, 'No data provided in the request body')
            }
            else {
                // Check body data
                const { ok, extra, miss } = checkFields( Mandatory.register, req.body );

                // Error: bad fields provided
                if( !ok ){ return sendApiErrorResponse(req, res, { extra, miss }, 'Bad fields provided') }
                else {
                    Controllers.auth.register(req)
                    .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed') )
                    .catch( apiError => sendApiErrorResponse(res, res, apiError, 'Request failed') );
                }
            }
        })

        // [AUTH] get data from client to log user
        this.router.post('/login', (req, res) => {
            // Check body data
            if ( typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0 ) { 
                return sendApiErrorResponse(req, res, null, 'No data provided in the request body')
            }
            else {
                // Check body data
                const { ok, extra, miss } = checkFields( Mandatory.login, req.body );

                // Error: bad fields provided
                if( !ok ){ return sendApiErrorResponse(req, res, { extra, miss }, 'Bad fields provided') }
                else {
                    Controllers.auth.login(req, res)
                    .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed') )
                    .catch( apiError => sendApiErrorResponse(res, res, apiError, 'Request failed') );
                }
            }
        })

        this.router.get('/logout', (req, res) => {
            Controllers.auth.logout(req, res)
            .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed') )
            .catch( apiError => sendApiErrorResponse(res, res, apiError, 'Request failed') );
        })


        // [AUTH] get data from client cookie
        this.router.get('/me', this.passport.authenticate('jwt', { session: false }), (req, res) => {
            sendApiSuccessResponse(req, res, req.user, 'User cookie extracted')
        })
    }

    init()  {
        // Get route fonctions
        this.routes();

        // Sendback router
        return this.router;
    };
}
//

/*
Export
*/
module.exports = RouterClass;
//