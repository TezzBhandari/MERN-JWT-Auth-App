const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const createError = require('http-errors');

const publicKeyPath = path.join(__dirname + '/../keys/id_rsa_pub.pem');
const privateKeyPath = path.join(__dirname + '/../keys/id_rsa_priv.pem');

const publicKey = fs.readFileSync(publicKeyPath, 'utf-8');
const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');

const issueJWT = (user) => {
  try {
    const id = user._id;
    const payload = {
      iss: 'jwt-app',
      sub: id,
      iat: Date.now(),
    };

    const signedToken = jsonwebtoken.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '1h',
    });
    return {
      token: 'Bearer ' + signedToken,
      expiresIn: '1h',
    };
  } catch (err) {
    console.log(err);
  }
};

const auth = (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.access_token) {
      next(createError(401, 'You are not authorized'));
    }
    const tokenParts = req.cookies.access_token.split(' ');
    if (
      tokenParts[0] === 'Bearer' &&
      tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
    ) {
      const verification = jsonwebtoken.verify(tokenParts[1], publicKey, {
        algorithms: ['RS256'],
      });
      req.user = verification;
      next();
    }
  } catch (err) {
    next(createError(401, 'You are not authorized'));
  }
};

module.exports = { issueJWT, auth };
