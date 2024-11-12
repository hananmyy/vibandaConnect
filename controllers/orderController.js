const { Order, Vendor, Rider, Customer } = require('../models');

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: [Vendor, Rider, Customer], // Include related models
      });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getOrder: async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id, {
        include: [Vendor, Rider, Customer], // Include related models
      });
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateOrder: async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });

      await order.update(req.body);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });

      await order.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = OrderController;
