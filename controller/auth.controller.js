import User from "../models/user.model.js";

export const LoginUser = (req, res) => {
  res.json({
    message: 'Ini Fungsi Login'
  });
}

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const newUser = await User.create({
      name,
      email,
      password
    })

    res.status(201).json({
      message: 'Register Success',
      user: newUser
    });

  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: err.message
      });
    }
  }
}

export const LogoutUser = (req, res) => {
  res.json({
    message: 'Ini Fungsi Logout'
  });
}

export const CurrentUser = (req, res) => {
  res.json({
    message: 'Ini Fungsi Current User'
  });
}
