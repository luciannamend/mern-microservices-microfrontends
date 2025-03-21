import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const resolvers = {
    Query: {
        currentUser: async (_, __, { req }) => {
            try {
                const token = req.cookies['token'];
                if (!token) return null;

                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                return await User.findById(decoded._id).select('-password');
            } catch (error) {
                return null;
            }
        },
    },

    Mutation: {
        login: async (_, { username, password }, { res }) => {
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    return { success: false, message: "User not found", token: null };
                }

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return { success: false, message: "Invalid password", token: null };
                }

                const token = jwt.sign(
                    { username, _id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // Secure cookies in production
                    maxAge: 24 * 60 * 60 * 1000,
                });

                return { success: true, message: "Login successful", token };
            } catch (error) {
                return { success: false, message: "Authentication error", token: null };
            }
        },

        register: async (_, { username, password }) => {
            try {
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    return { success: false, message: "Username already exists", token: null };
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ username, password: hashedPassword });
                await newUser.save();

                return { success: true, message: "User registered successfully", token: null };
            } catch (error) {
                return { success: false, message: "Registration failed", token: null };
            }
        },

        logout: (_, __, { res }) => {
            try {
                res.clearCookie('token');
                return true;
            } catch (error) {
                return false;
            }
        },
    },
};

export default resolvers;
