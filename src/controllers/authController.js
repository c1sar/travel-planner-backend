const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ firstname, lastname, email, password: hashedPassword });
  await user.save();

  res.status(201).json({ msg: 'User registered' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

  res.json({ token });
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phonenumber,
      bio,
      location,
      travelStyle,
      preferredDestinations,
      budgetPreference,
      language,
      email,
      password,
      notifications
    } = req.body;

    const updateData = {};

    // Only update fields that are provided
    if (firstname !== undefined) updateData.firstname = firstname;
    if (lastname !== undefined) updateData.lastname = lastname;
    if (phonenumber !== undefined) updateData.phonenumber = phonenumber;
    if (bio !== undefined) updateData.bio = bio;
    if (location !== undefined) updateData.location = location;
    if (travelStyle !== undefined) updateData.travelStyle = travelStyle;
    if (preferredDestinations !== undefined) updateData.preferredDestinations = preferredDestinations;
    if (budgetPreference !== undefined) updateData.budgetPreference = budgetPreference;
    if (language !== undefined) updateData.language = language;
    if (notifications !== undefined) updateData.notifications = notifications;

    // Handle email update
    if (email !== undefined) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(400).json({ msg: 'Email already in use' });
      }
      updateData.email = email;
    }

    // Handle password update
    if (password !== undefined) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { preferences } = req.body;
    
    if (!Array.isArray(preferences)) {
      return res.status(400).json({ msg: 'Preferences must be an array' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { preferences },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
