const logger = require('../services/logger.service')
const authService = require('../api/auth/auth.service')
const asyncLocalStorage = require('../services/als.service')
const config = require('../config')

async function requireAuth(req, res, next) {
  const { loggedinUser } = asyncLocalStorage.getStore()
  logger.debug('MIDDLEWARE', loggedinUser)
  req.loggedinUser=loggedinUser
  if (config.isGuestMode && !loggedinUser) {
    req.loggedinUser = { _id: '', fullname: 'Guest' }
    return next()
  }
  if (!loggedinUser) return res.status(401).send('Not Authenticated')
  next()
}

async function requireAdmin(req, res, next) {
  const { loggedinUser } = asyncLocalStorage.getStore()
  if (!loggedinUser) return res.status(401).send('Not Authenticated')
  if (!loggedinUser.isAdmin) {
    logger.warn(loggedinUser.fullname + 'attempted to perform admin action')
    res.status(403).end('Not Authorized')
    return
  }
  next()
}

module.exports = {
  requireAuth,
  requireAdmin
}
