
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const userResponse = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
});

// CUSTOMER REGISTRATION
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name?.trim() || !email?.trim() || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and password are required'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least 8 characters'
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email is already registered'
            });
        }

        // Public registration can NEVER assign admin privileges.
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password,
            role: 'user'
        });

        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            token,
            user: userResponse(user)
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Email is already registered'
            });
        }

        console.error('Registration error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Registration failed'
        });
    }
};

// CUSTOMER LOGIN
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        }).select('+password');

        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        if (user.role !== 'user') {
            return res.status(403).json({
                success: false,
                message: 'Please use the admin login'
            });
        }

        const passwordMatches =
            await user.comparePassword(password);

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: generateToken(user._id),
            user: userResponse(user)
        });

    } catch (error) {
        console.error('Login error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
};

// SEPARATE ADMIN LOGIN
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const admin = await User.findOne({
            email: email.trim().toLowerCase(),
            role: 'admin',
            isActive: true
        }).select('+password');

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid admin credentials'
            });
        }

        const passwordMatches =
            await admin.comparePassword(password);

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: 'Invalid admin credentials'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Admin login successful',
            token: generateToken(admin._id),
            user: userResponse(admin)
        });

    } catch (error) {
        console.error('Admin login error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Admin login failed'
        });
    }
};

// CURRENT LOGGED-IN USER
export const getCurrentUser = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: userResponse(req.user)
    });
};
