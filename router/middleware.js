const jwt = require('jsonwebtoken')

function verifyToken(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function(err, token) {
      if (err) reject(err)

      resolve(token)
    })
  })
}

module.exports = {
  authMiddleware: async (req, res, next) => {
    const token = req.headers['x-auth-token']
    if (token === undefined)
      return res.status(401).json({ message: 'x-auth-token Required' })

    try {
      const decoded = await verifyToken(token, process.env.PRIVATE_KEY)
      req.decoded = decoded
    } catch(e) {
      return res.status(401).json({ message: 'token invalid' })
    }

    next()
  }
}
