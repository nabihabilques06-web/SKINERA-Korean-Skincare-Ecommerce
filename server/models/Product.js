
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        brand: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                'Cleanser',
                'Toner',
                'Serum',
                'Moisturizer',
                'Sunscreen',
                'Mask',
                'Other'
            ]
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        originalPrice: {
            type: Number,
            default: 0,
            min: 0
        },

        image: {
            type: String,
            required: true
        },

        images: {
            type: [String],
            default: []
        },

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        reviewCount: {
            type: Number,
            default: 0
        },

        featured: {
            type: Boolean,
            default: false
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

productSchema.index({
    name: 'text',
    brand: 'text',
    description: 'text'
});

productSchema.index({ category: 1, isActive: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
