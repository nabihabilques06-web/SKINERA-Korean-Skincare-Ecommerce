
import Product from '../models/Product.js';

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      brand,
      search,
      featured,
      sort = 'newest',
      page = 1,
      limit = 24
    } = req.query;

    const filter = { isActive: true };

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (featured === 'true') filter.featured = true;

    if (search) {
      filter.$text = { $search: search };
    }

    const sortOptions = {
      newest: { createdAt: -1 },
      priceLow: { price: 1 },
      priceHigh: { price: -1 },
      rating: { rating: -1 }
    };

    const currentPage = Math.max(1, Number(page) || 1);
    const pageLimit = Math.min(50, Math.max(1, Number(limit) || 24));

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sortOptions[sort] || sortOptions.newest)
        .skip((currentPage - 1) * pageLimit)
        .limit(pageLimit),
      Product.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      products,
      pagination: {
        total,
        page: currentPage,
        pages: Math.ceil(total / pageLimit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid product ID'
    });
  }
};

// POST /api/products (admin)
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      category,
      price,
      originalPrice,
      image,
      images,
      stock,
      featured
    } = req.body;

    if (!name || !brand || !description || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required product details'
      });
    }

    const product = await Product.create({
      name,
      brand,
      description,
      category,
      price,
      originalPrice,
      image,
      images,
      stock,
      featured
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// PUT /api/products/:id (admin)
export const updateProduct = async (req, res) => {
  try {
    const allowedFields = [
      'name', 'brand', 'description', 'category',
      'price', 'originalPrice', 'image', 'images',
      'stock', 'featured', 'isActive'
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE /api/products/:id (admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product removed from store'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid product ID'
    });
  }
};
