const jwt = require('jsonwebtoken');

const accessToken = async (user) => {

        const payload = {
            id : user._id,
            email : user.email
        }

        const SECRET_KEY = process.env.CONVERSE_SECRET_KEY;

        const options = {
            issuer : 'ManishLeo',
            expiresIn : '2h'
        }

        const authToken = await jwt.sign(payload, SECRET_KEY, options);
        if(!authToken) throw new Error('Session Failed 🧧');
        return authToken;
};


module.exports = accessToken;