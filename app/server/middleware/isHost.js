const isHost = (req, res, next) => {
  if (req.roleName !== 'host') {
    return res.status(403).json({ message: 'Acceso permitido solo para hosts' });
  }
  next();
};

export default isHost;
