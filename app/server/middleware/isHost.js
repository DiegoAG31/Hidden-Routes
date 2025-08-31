const isHost = (req, res, next) => {
  if (req.roleName !== 'Host') {
    return res.status(403).json({ message: 'Acceso permitido solo para hosts', roleName: req.roleName });
  }
  next();
};

export default isHost;
