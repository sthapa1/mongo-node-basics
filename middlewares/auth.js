const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log(req.headers)
    try {
        const authHeader = req.headers.authorization;

        const token = authHeader && authHeader.split(' ')[1];

        if(!token){
            return res.status(403).json({message: 'Unauthorized.'})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;

        next()

    } catch (error) {
        return res.status(403).json({message: 'Invalid Token.'});
    }
}

module.exports = verifyToken;

// const a = "Hello world"

// const auth = 'Bearer dlkfhasfldha'

// auth.split(' ')[1]

// a.split(' ')

// ['Hello', 'world']

// a.split('o')

// ['Hell', ' w', 'rld']

// localStorage.setItem('token', token)

// const token = localStorage.getItem('token');

//logout
// localStorage.removeItem('token')
// redirect to login