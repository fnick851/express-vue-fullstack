const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(400).json({
      message: "email or password is missing"
    });
  }
  try {
    const existUser = await User.query().where("email", "=", email);
    if (existUser.length === 0) {
      saveToDb(password, email, res);
    } else {
      res.status(400).json({
        message: `user already exist`
      });
    }
  } catch (e) {
    console.log(`error query db: ${e}`);
    res.status(500).json({
      message: `internal error`
    });
  }
};

function saveToDb(password, email, res) {
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500);
    }
    try {
      const inserted = await User.query().insert({
        email,
        hash
      });
      res.status(201).json({
        message: `created user with email: ${inserted.email}`
      });
    } catch (error) {
      res.status(500).json({
        message: `error inserting: ${error}`
      });
    }
  });
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const existUser = await User.query().where("email", "=", email);
  if (existUser.length === 0) {
    return res.status(401).json({
      message: "unauthorized"
    });
  }
  const { id, _, hash } = existUser[0];
  bcrypt
    .compare(password, hash)
    .then(match => {
      if (match) {
        const token = jwt.sign(
          {
            email,
            id
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "authorized",
          token
        });
      } else {
        console.log("error from /login after compare", e);
        res.status(401).json({
          message: "unauthorized"
        });
      }
    })
    .catch(e => {
      if (e) {
        console.log("error from /login compare init", e);
        res.status(401).json({
          message: "unauthorized"
        });
      }
    });
};

module.exports = {
  signup,
  login
};
