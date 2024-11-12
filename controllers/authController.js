const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Vendor, Rider, Customer } = require('../models');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
};

// Vendor registration
exports.registerVendor = async (req, res) => {
  const { email, password, name, contactNumber, location, shopName } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const vendor = await Vendor.create({ email, password: hashedPassword, name, contactNumber, location, shopName });
    res.status(201).json({ token: generateToken(vendor) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Vendor login
exports.loginVendor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ where: { email } });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ token: generateToken(vendor) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Rider registration
exports.registerRider = async (req, res) => {
  const { email, password, name, contactNumber, vehicleType, location } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const rider = await Rider.create({ email, password: hashedPassword, name, contactNumber, vehicleType, location });
    res.status(201).json({ token: generateToken(rider) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Rider login
exports.loginRider = async (req, res) => {
  const { email, password } = req.body;
  try {
    const rider = await Rider.findOne({ where: { email } });
    if (!rider || !(await bcrypt.compare(password, rider.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ token: generateToken(rider) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Customer registration
exports.registerCustomer = async (req, res) => {
  const { email, password, name, contactNumber, location } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await Customer.create({ email, password: hashedPassword, name, contactNumber, location });
    res.status(201).json({ token: generateToken(customer) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Customer login
exports.loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findOne({ where: { email } });
    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ token: generateToken(customer) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
