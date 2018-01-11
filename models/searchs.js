const Search = require('../lib/mongo').Search

module.exports = {
    create: function create(search) {
        return Search.create(search).exec()
    },

    // 通过用户名找到用户图片
    getImgByName: function getImgByName(name) {
        return Search
            .findOne({name: name})
            .addCreatedAt()
            .exec()
    }
}
