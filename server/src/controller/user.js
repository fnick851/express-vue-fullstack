const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signup = (req, res) => {
    return res.send("Not implemented yet.")
}

const login = (req, res) => {
    const users = [
        {
            id: 1,
            email: "test1@test.com",
            password: "password",
            hash: "$2a$10$huNqSyO/IMOi/c5aQPqpuuNCX04jNrPlqhxrKZcesJ8R3bAq4rqvq"
        },
        {
            id: 2,
            email: "test2@test.com",
            password: "secret",
            hash: "$2a$10$Po1TZoR9WQFis1x3uR3Une8oee8dihCXGhitWyPnPn8gZbcguhm5S"
        }
    ]

    const { email, password } = req.body
    const exist = users.find(user => {
        return email === user.email
    })
    if (!exist) {
        return res.status(401).json({
            message: "unauthorized"
        })
    }
    bcrypt
        .compare(password, exist.hash)
        .then(match => {
            if (match) {
                const token = jwt.sign(
                    {
                        email: exist.email,
                        id: exist.id
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                )
                res.status(200).json({
                    message: "authorized",
                    token
                })
            } else {
                res.status(401).json({
                    message: "unauthorized"
                })
            }
        })
        .catch(e => {
            if (e) {
                console.log("error from /login", e)
                res.status(401).json({
                    message: "unauthorized"
                })
            }
        })
}

module.exports = {
    signup,
    login
}
