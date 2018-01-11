const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signup 注册页
router.get('/', checkNotLogin, function (req, res, next) {
  // res.render('signup')
})

// POST /signup 用户注册
router.post('/', function (req, res, next) {
  console.log('进来注册')
  console.log(req.body)
  console.log(req.fields)

  const name = req.body.username
  const password = req.body.password
  const repassword = req.body.repassword
  const email = req.body.email
  const bio = req.body.bio
  const avatar = req.body.avatar

  // 校验参数
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      console.log('名字请限制在 1-10 个字符')
      return
    }
    if (password.length < 6) {
      console.log('密码至少 6 个字符')
      return
    }
    if (password !== repassword) {
      console.log('两次输入密码不一致')
      return
    }
    if (email.length === 0) {
      console.log('邮箱不能为空')
      return
    }
    if (!(bio.length >= 1 && bio.length <= 30)) {
      console.log('个人简介请限制在 1-30 个字符')
      return
    }
    if (avatar.length === 0) {
      console.log('缺少头像')
      return
    }
  } catch(e) {
    console.log('failure')
  }

  // 明文密码加密 (暂时不加密)
  // password = sha1(password)

  // 待写入数据库的用户信息
  let user = {
    name: name,
    password: password,
    email: email,
    bio: bio,
    avatar: avatar
  }
  // 用户信息写入数据库
  UserModel.create(user)
  .then(function (result) {
    // 此 user 是插入 mongodb 后的值，包含 _id
    user = result.ops[0]
    // 删除密码这种敏感信息，将用户信息存入 session
    delete user.password
    req.session.user = user
    res.send({code: 'ok'})
  })
  .catch(function (e) {
    // 用户名被占用则跳回注册页，而不是错误页
    if (e.message.match('duplicate key')) {
      console.log('error', '用户名已被占用')
    }
    next(e)
  })
})

module.exports = router
