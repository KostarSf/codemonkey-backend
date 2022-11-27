const { User } = require('../models/models')
const ApiError = require('../error/ApiError')
const md5 = require("md5");

class AuthController {
  async login(req, res, next) {
    try {
      let { email, password } = req.body
      if (!email || !password) {
        return res.json({
          status: 'error'
        })
      }
      let user = await User.findOne({where: {email, password: md5(password)}})
      if (!user) {
        return res.json({
          status: 'error'
        })
      }
      return res.json({
        status: 'ok',
        user_id: user.id
      })
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new AuthController()