import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Role from '../models/roleModel.js';

export const register = async (req, res) => {
  try {
    const { user_name, email, password, role_id } = req.body;
    if (!user_name || !email || !password || !role_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Verifica si el email ya existe
    const existingUser = await User.findOne({ where: { Email: email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      User_name: user_name,
      Email: email,
      Password_hash: hashedPassword,
      Role_id: role_id,
    });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // <-- CAMBIO AQUÍ
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.Password_hash); // <-- CAMBIO AQUÍ
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const role = await Role.findByPk(user.Role_id);
    const token = jwt.sign(
      { userId: user.User_id, roleId: user.Role_id, roleName: role?.Role_name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener perfil del usuario logeado
export const getProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      user_id: user.User_id,
      user_name: user.User_name,
      email: user.Email,
      role_id: user.Role_id,
      user_img: user.user_img,
      verification_id: user.verification_id
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Actualizar perfil del usuario logeado
export const updateProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
  const { user_name, email, role_id, user_img, verification_id } = req.body;
  // Actualiza solo los campos permitidos
  if (user_name) user.User_name = user_name;
  if (email) user.Email = email;
  if (role_id) user.Role_id = role_id;
  if (user_img) user.user_img = user_img;
  if (verification_id) user.verification_id = verification_id;
  await user.save();
  res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token or update error' });
  }
};