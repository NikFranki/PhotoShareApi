const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const SearchModel = require('../models/searchs')
const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
    // res.send('登录页')
    res.render('signin')
})

// POST /signin 用户登录
router.post('/', function (req, res, next) {
    console.log('登录')
    console.log('入参：'+req.body)
    const name = req.body.name
    const password = req.body.password

    // 检验参数
    try {
        if (!name.length) {
            throw new Error('请填写用户名')
        }
        if (!password.length) {
            throw new Error('请填写密码')
        }
    } catch(e) {
        console.log('failure')
    }


    UserModel.getUserByName(name)
    .then(function(user) {
          if (!user) {
              console.log('用户名或密码错误')
              res.send({code: 'failure'})
              return
          }
          // 检查密码是否匹配 (sha1(password) !== user.password)
          if (password !== user.password) {
            console.log('密码错误')
            res.send({code: 'failure'})
            return
          }
          // 用户信息写入 session
          delete user.password
          req.session.user = user
          console.log("登录的用户："+req.session)
          let data = {code: 'ok', result: user};
          res.send(data)
          console.log('出参：'+data)
    })
    .catch(next)
})

module.exports = router
