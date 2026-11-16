
import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { shippingAddress } = req.body;

    const required = [
      'fullName', 'phone', 'address',
      'city', 'state', 'postalCode', 'country'
    ];

    if (!shippingAddress ||
        required.some(key => !String(shippingAddress[key] || '').trim())) {
      return res.status(400).json({
        success: false,
        message: 'Complete your shipping address'
      });
    }

    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Your cart is empty'
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.product?._id);

      if (!product || !product.isActive ||
          product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${item.product?.name || 'a product'}`
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity
      });

      totalAmount += product.price * item.quantity;
    }

    await session.startTransaction();

    for (const item of cart.items) {
      const result = await Product.updateOne(
        {
          _id: item.product._id,
          isActive: true,
          stock: { $gte: item.quantity }
        },
        { $inc: { stock: -item.quantity } },
        { session }
      );

      if (result.modifiedCount !== 1) {
        throw new Error('Stock changed during checkout. Please try again.');
      }
    }

    const [order] = await Order.create([{
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      totalAmount,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      orderStatus: 'Placed'
    }], { session });

    await Cart.updateOne(
      { user: req.user._id },
      { $set: { items: [] } },
      { session }
    );

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    res.status(400).json({
      success: false,
      message: error.message || 'Unable to place order'
    });
  } finally {
    await session.endSession();
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid order ID'
    });
  }
};
