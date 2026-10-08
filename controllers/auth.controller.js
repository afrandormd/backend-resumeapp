import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

}

export const LoginUser = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and Password are required'
      });
    }

    // Check if email registered
    const currentUser = await User.findOne({ email: email });

    if (!currentUser) {
      return res.status(400).json({
        message: 'Email not registered'
      });
    }

    // Check Password
    const comparePassword = bcrypt.compareSync(password, currentUser.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: 'Password not match'
      });
    }

    // Generate Token
    generateToken(res, currentUser._id);

    return res.status(200).json({
      message: 'Login Success',
      user: {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email
      }
    });

  } catch (error) {
    return res.status(400).json({
      message: err.message
    });
  }
}

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userEmail = await User.findOne({ email: email });

    if (userEmail) {
      return res.status(400).json({
        message: 'Email already exist'
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate Token
    generateToken(res, newUser._id);

    return res.status(201).json({
      message: 'Register Success',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message
      });
    }
    return res.status(500).json({
      message: err.message
    });
  }
}

export const LogoutUser = (req, res) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0)
    })

    res.status(200).json({
      message: "Logout Success"
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Ini Fungsi Logout'
    });
  }
}

export const CurrentUser = (req, res) => {
  try {
    return res.status(200).json({
      message: "Get request user success",
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}
