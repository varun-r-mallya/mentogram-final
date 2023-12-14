const bcrypt = require("bcrypt")
exports.passwordHasher = function (password) {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
}