const jwt = require('jsonwebtoken');
const config = require('config');

/**

* Middleware function to decode jwt to check if its valid

* @param {object} err - request object

* @param {object} req - request object

* @param {object} res - response object

* @returns {function} - Next function returned to pass control to next middleware 

*/

function userAuth(req, res, next) {

    const jwToken = req.header('x-jwtoken');
    //401 is unauthenticated
    if (!jwToken) return res.status(401).send('No token provided');

    try {
        const verified = jwt.verify(jwToken, config.get('jwtPrivateKey'));
        // set user to decoded payload, which is the ID for the user (set in the functions that call this)
        req.user = verified; 
        next();
        //pass control back to the route handler (the next middleware function)
    }

    catch (ex) {
        //400 
        res.status(400).send('Invalid token');
    }
    
};
module.exports  = userAuth;