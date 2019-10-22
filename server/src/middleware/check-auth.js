const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        let token =
            req.headers["x-access-token"] || req.headers["authorization"] // Express headers are auto converted to lowercase
        if (token.startsWith("Bearer ")) {
            // Remove Bearer from string
            token = token.slice(7, token.length)
        }
        if (token) {
            req.userData = jwt.verify(token, process.env.JWT_SECRET)
        }
        next()
    } catch (error) {
        return res.status(401).json({
            message: "jwt unauthorized"
        })
    }
}
