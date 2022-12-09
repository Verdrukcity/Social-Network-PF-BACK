const express = require('express')
const router = express.Router()
const { Category } = require('../../mongodb/models/Category.js')
const { getCategories } = require('../services/Category.service.js')

/**
 * trae todos los categories
 * tipo : get
 * ruta : /categories
 * no requiere de parámetro
 */

router.get('/', async (req, res) => {
  try {
    getCategories(req, res)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
