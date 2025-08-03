import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation

//Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d'});
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = 
            req.body;   
 

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //Determine user role
        let role = 'member';
        if (adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN
        ) {
            role = 'admin'; //Assign admin role if invite token matches
        }

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt);

        //Create new user
        const user = await User.create({
            name,
            email,
            password: hasedPassword,
            profileImageUrl,
            role
        });

        //Return User data with JWT token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            role: user.role,
            token: generateToken(user._id) //Generate JWT token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {} catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//@desc    Get user profile
//@route   GET /api/auth/profile
//@access  Private (Requires JWT token)
const getUserProfile = async (req, res) => {
    try {} catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//@desc    Update user profile
//@route   PUT /api/auth/profile
//@access  Private (Requires JWT token)
const updateUserProfile = async (req, res) => {
    try {} catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { registerUser, loginUser, getUserProfile, updateUserProfile };

