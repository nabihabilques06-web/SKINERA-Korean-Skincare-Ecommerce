
import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product');

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const amount = Number(quantity);

    if (!mongoose.isValidObjectId(productId) ||
        !Number.isInteger(amount) || amount < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product or quantity'
      });
    }

    const product = await Product.findOne({
      _id: productId,
      isActive: true
    });

    if (!product || product.stock < amount) {
      return res.status(400).json({
        success: false,
        message: 'Product unavailable or insufficient stock'
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existing = cart.items.find(
      item => item.product.toString() === productId
    );

    if (existing) {
      if (existing.quantity + amount > product.stock) {
        return res.status(400).json({
          success: false,
          message: 'Requested quantity exceeds available stock'
        });
      }
      existing.quantity += amount;
    } else {
      cart.items.push({ product: productId, quantity: amount });
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({ success: true, message: 'Added to cart', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const amount = Number(quantity);

    if (!Number.isInteger(amount) || amount < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const item = cart.items.find(
      entry => entry.product.toString() === req.params.productId
    );

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    const product = await Product.findById(req.params.productId);

    if (!product || !product.isActive || amount > product.stock) {
      return res.status(400).json({
        success: false,
        message: 'Requested quantity is unavailable'
      });
    }

    item.quantity = amount;
    await cart.save();
    await cart.populate('items.product');

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== req.params.productId
    );

    await cart.save();
    await cart.populate('items.product');

    res.json({ success: true, message: 'Item removed', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
