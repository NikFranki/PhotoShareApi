const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const SearchModel = require('../models/searchs')

/**desc: GET /search/img
 * author: lt
 * time: 20180111
*/
router.get('/img', function (req, res, next) {
  const author = req.query.author

  SearchModel.getImgByName(author)
    .then(function (imgs) {
      res.send({imgs: imgs});
    })
    .catch(next)
})

/**desc: GET /search/user
 * author: lt
 * time: 20180111
*/
router.get('/user', function(req, res, next) {
    const name = req.query.name

    UserModel.getUserByName(name)
    .then(function(user) {
        console.log("查询到的用户为："+user)
        res.send({user: user})
    })
    .catch(next)
})

module.exports = router
