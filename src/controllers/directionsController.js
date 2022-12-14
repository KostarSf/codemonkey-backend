const { Direction } = require('../models/models')
const ApiError = require('../error/ApiError')

class DirectionsController {
  async create(req, res, next) {
    try {
      let {name, color, description, schema} = req.body
      if (!name || !color || !description) {
        next(ApiError.badRequest("Для создания направления нужно указать name, color и description"))
        return
      }
      if (schema === undefined) {
        schema = null
      }
      let currentDirection = await Direction.findOne({where: {schema}})
      if (currentDirection && schema !== null) {
        next(ApiError.badRequest(`Направление со схемой ${currentDirection.schema} уже существует с id ${currentDirection.id} и именем ${currentDirection.name}`))
        return
      }
      let newDirection = await Direction.create({name, color, description, schema})
      return res.json(newDirection)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      let directions = await Direction.findAll({})
      return res.json(directions)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async update(req, res, next) {
    try {
      let {id, name, color, description, schema} = req.body
      if (!id) {
        next(ApiError.badRequest("Должен быть указан как минимум id"))
        return
      }
      let currentDirection = await Direction.findOne({where: {id}})
      if (!currentDirection) {
        next(ApiError.badRequest("Такого направления не существует"))
        return
      }
      if (!name) name = currentDirection.name
      if (!color) color = currentDirection.color
      if (!description) description = currentDirection.description
      if (!schema) schema = currentDirection.schema
      currentDirection.update({ name, color, description, schema }, {where: {id}})
      return res.json(currentDirection)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params
      let direction = await Direction.findOne({where: {id}})
      res.json(direction)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new DirectionsController();