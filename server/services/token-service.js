const jwt = require("jsonwebtoken");

class TokenService {
  async generateToken(id) {
    return jwt.sign({ id }, process.env.SIGN, {
      expiresIn: "30m",
    });
  }
}

module.exports = new TokenService();
