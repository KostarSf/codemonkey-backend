const { User } = require('../models/models')
const ApiError = require('../error/ApiError')
const md5 = require('md5')

class UsersController {
  async create(req, res, next) {
    try {
      let {name, email, password} = req.body
      if (!name || !email || !password) {
        next(ApiError.badRequest("Для регистрации нужно указать name, email и password"))
        return
      }
      let currentUser = await User.findOne({where: {email}})
      if (currentUser) {
        next(ApiError.badRequest("Такой пользователь уже существует"))
        return
      }
      let newUser = await User.create({name, email, password: md5(password)})
      return res.json(newUser)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    let users = await User.findAll({})
    return res.json(users)
  }

  async update(req, res, next) {
    try {
      let {id, name, email, password, about} = req.body
      if (!id) {
        next(ApiError.badRequest("Должен быть указан как минимум id"))
        return
      }
      let currentUser = await User.findOne({where: {id}})
      if (!currentUser) {
        next(ApiError.badRequest("Такого пользователя не существует"))
        return
      }
      if (!name) name = currentUser.name
      if (!email) email = currentUser.email
      if (!about) about = currentUser.about
      if (!password) {
        password = currentUser.password
      } else {
        password = md5(password)
      }
      currentUser.update({ name, email, about, password }, {where: {id}})
      return res.json(currentUser)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    let user = await User.findOne({where: {id}})
    res.json(user)
  }
}

module.exports = new UsersController();