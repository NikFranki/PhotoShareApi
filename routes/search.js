const express = require('express')
const router = express.Router()

const SearchModel = require('../models/searchs')

// GET /search
router.get('/', function (req, res, next) {
  const author = req.query.author

  SearchModel.getImgByName(author)
    .then(function (imgs) {
      res.send({imgs: imgs});
    })
    .catch(next)
})

module.exports = router
