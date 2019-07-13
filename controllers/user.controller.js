// Import required modules
const jwt = require('./../helpers/jwt');
const db = require('./../db');
const User = require('./../user/model');
const bcrypt = require('bcrypt')

// Function to Generate a new token
const generateToken = (userId, username) => {
  return jwt.toJwt({
      userId: userId,
      username: username
  });
}

/**
 * Action that checks if a username already exists or
 * creates a new one and returns a token with userID and username
 */
const loginOrRegister = (req, res, next) => {
  // Check if the user passed a username
  const { username, password } = req.body;

  if (!username) return res.status(404).send({
      message: "Please specify a valid username to proceed!"
  });

  // Check if user exists in the database
  return User.findOne({ where: { username: username } })
      .then(user => {
          // Check if user was not found
          if (!user) {
            // Encrypt the password
            bcrypt.hash(password, 10, (err, hash) => {
              if(err){
                console.log('ERROR ON BCRYPT')
                return res.status(500).json({
                  error: err
                });
              } else {
              // User not found, create a new one, with username and password hashed.
              User.create({username, password: hash})
                  .then(u => {
                      // Set status 201 :: user created
                      return res.status(201).send({
                          // Generate the token and return it
                          token: generateToken(u.id, username),
                          username
                      });
                  })
                  .catch(err => {
                      // User not created, return error
                      return res.status(500).send({
                          message: "Cannot create user. Please try again later"
                      })
                  });
            }});

          } else {
              // Valid user exists, 
              //Check password
              bcrypt.compare(password, user.password, (err, match) => {
                //Check if err
                if(err) {
                  return res.status(401).json({
                    message: 'Auth failed'
                  });
                }
                // match = true when password match
                if(match) {
                  //generate token and return it
                  // Return a JWT token with the user id and username
                  return res.status(200).send({
                    username,
                    id: user.id,
                    // Generate the token and return it
                    token: generateToken(user.id, username)
                  });
                } else {
                  return res.status(401).send({
                    message: 'Auth failed'
                  })
                }
              })    
          }
      })
      .catch(e => next(e));
}

// Export auth controller functions
module.exports = { loginOrRegister };


