const notFound = (req, res, next) => {
    res.status(404).json({
      success: false,
      message: 'Request not found',
    });
  };
  
  module.exports = notFound;
  