module.exports = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next({ statusCode: 400, message: '"name" is required' });
  }

  if (name.length < 5) {
    return next({ statusCode: 422, message: '"name" length must be at least 5 characters long' });
  }

  next();
};