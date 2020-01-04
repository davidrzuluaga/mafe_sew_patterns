const models = require('../models');
const jwt = require('jsonwebtoken');

const Signin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ message: 'Please pass email and password.' });
    }
    models.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          return res.status(401).send({
            message: 'Authentication failed. User not found.'
          });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            var token = jwt.sign(
              JSON.parse(JSON.stringify(user)),
              'nodeauthsecret',
              { expiresIn: 86400 * 30 }
            );
            jwt.verify(token, 'nodeauthsecret', function(err, data) {
              //console.log(err, data);
            });
            res.json({ success: true, token: 'JWT ' + token });
          } else {
            res.status(401).send({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          }
        });
      })
      .catch(error => res.status(400).send(error));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message
    });
  }
};

const Signup = async (req, res) => {
  try {
    const { email, password, name, profile } = req.body;

    if (req.body.signupkeyword !== '93081701626') {
      return res.status(401).send({
        message: 'No authorized to create an user'
      });
    }
    if (!email || !password || !name || !profile) {
      return res.status(400).send({
        message: 'Please pass email, name, profile and password.',
        body: req.body
      });
    }
    models.User.create({
      email,
      password,
      profile,
      name
    })
      .then(user => res.status(201).send(user))
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message
    });
  }
};

getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = {
  Signin,
  Signup
};
