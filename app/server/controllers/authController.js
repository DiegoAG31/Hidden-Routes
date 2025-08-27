import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Role from '../models/roleModel.js';

export const register = async (req, res) => {
  try {
    const { user_name, email, password_hash, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(password_hash, 10);
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
    const { email, password_hash } = req.body;
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password_hash, user.Password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // Obtener el nombre del rol
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
