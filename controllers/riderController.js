const { Rider } = require('../models');

// Fetch all riders
exports.getAllRiders = async (req, res) => {
  try {
    const riders = await Rider.findAll();
    res.status(200).json(riders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve riders' });
  }
};

// Fetch a single rider by ID
exports.getRiderById = async (req, res) => {
  try {
    const rider = await Rider.findByPk(req.params.id);
    if (!rider) {
      return res.status(404).json({ error: 'Rider not found' });
    }
    res.status(200).json(rider);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve rider' });
  }
};

// Create a new rider
exports.createRider = async (req, res) => {
  try {
    const rider = await Rider.create(req.body);
    res.status(201).json(rider);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create rider' });
  }
};

// Update a rider
exports.updateRider = async (req, res) => {
  try {
    const rider = await Rider.findByPk(req.params.id);
    if (!rider) {
      return res.status(404).json({ error: 'Rider not found' });
    }
    await rider.update(req.body);
    res.status(200).json(rider);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update rider' });
  }
};

// Delete a rider
exports.deleteRider = async (req, res) => {
  try {
    const rider = await Rider.findByPk(req.params.id);
    if (!rider) {
      return res.status(404).json({ error: 'Rider not found' });
    }
    await rider.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete rider' });
  }
};
