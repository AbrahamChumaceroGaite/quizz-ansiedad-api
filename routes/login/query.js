const jwt = require('jsonwebtoken');

function getLogin(ci) {
    return `SELECT * FROM usuarios WHERE ci = ${ci}`;
}
function generateToken(data) {
    return jwt.sign(data, 'secreto', { expiresIn: '1h' });
}
module.exports = {
   getLogin,
   generateToken
};