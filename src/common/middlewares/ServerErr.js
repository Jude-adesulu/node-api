const ServerErrHandler = ( req, res, err, next) =>{
  return res.status(500).json({
    success: false,
    message: err.message,
  })
}

module.exports = ServerErrHandler;