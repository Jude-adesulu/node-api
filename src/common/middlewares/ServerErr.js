const ServerErrHandler = (err, res) =>{
   res.status(500).json({
    success: false,
    message: err.message,
    // errorCode: 500
  })
}

module.exports = ServerErrHandler;