const logger = (req, res, next) => {
    console.log(`Request received at ${new Date()}`);
    next();
  };
  
  module.exports = logger;
  