import bcrypt from 'bcrypt'

const creteHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)

export {creteHash, isValidPassword} 