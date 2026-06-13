import { User } from "../models/user.model.js";
import {
    authenticate,
    clearSession,
    findUserByEmail,
    findUserById,
    hashPassword,
    registerUser,
    verifyPassword
} from "../services/auth.services.js";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// REGISTER CONTROLLER without validator
export const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, dob, gender, password } = req.body;

    // Basic check for required fields (you can expand this as needed)
    if (!firstName || !email || !phone || !dob || !gender || !password)
        throw new AppError("All required fields must be provided", 400);

    // Check if user with the same email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser)
        throw new AppError("User already exists", 400);

    // Encrypt the password
    const encryptedPassword = await hashPassword(password);
    if (!encryptedPassword)
        throw new AppError("Password encryption error", 500);

    // Register the new user
    const newUser = await registerUser(firstName, lastName, email, phone, dob, gender, encryptedPassword);
    if (!newUser)
        throw new AppError("New user registration error", 500);

    // Authenticate user after successful registration (e.g. create session or JWT)
    await authenticate(req, res, newUser);

    return res.status(201).json({
        success: true,
        message: "User registered",
        user: {
            id: newUser._id,
            name: newUser.firstName + " " + newUser.lastName,
            email: newUser.email
        }
    });
})


// LOGIN CONTROLLER-------------------------------------------------
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;  // Extract email and password from request body

    // Check if email is already registered
    const user = await findUserByEmail(email);
    if (!user) throw new AppError("User not found", 404);

    // Verify password
    const verifiedPassword = await verifyPassword(user.password, password);
    if (!verifiedPassword) throw new AppError("Invalid Credentials", 400);

    // Authenticate user (e.g., create session or JWT)
    await authenticate(req, res, user);

    return res.status(200).json({
        success: true,
        message: "User logged in",
        user: {
            id: user._id,
            name: user.firstName + " " + user.lastName,
            email: user.email,
            role: user.role,
        }
    });
})


// LOGOUT CONTROLLER
export const logout = asyncHandler(async (req, res) => {
    if (!req.user) throw new AppError("User not authenticated", 401);

    await clearSession(req.user.sessionId);
    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    };
    res.clearCookie("access_token", cookieOptions);
    res.clearCookie("refresh_token", cookieOptions);

    return res.status(200).json({ success: true, message: "User logged out" });
})


// GET LOGGED IN USER DATA
export const getUserData = asyncHandler(async (req, res) => {
    if (!req.user) throw new AppError("User not authenticated", 401);

    const user = await findUserById(req.user.id);

    if (!user) throw new AppError("User not found", 404);

    return res.status(200).json({
        success: true,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            name: user.firstName + " " + user.lastName,
            email: user.email,
            booking: user.booking,
            listing: user.listing,
            phone: user.phone,
            dob: user.dob,
            gender: user.gender,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    });
})


// EDIT USER DATA
export const editUser = asyncHandler(async (req, res) => {
    if (!req.user) throw new AppError("You are not authenticated", 401);

    const { firstName, lastName, email, phone, dob, gender } = req.body;

    const updatedUser = await User.findByIdAndUpdate(req.user.id, { firstName, lastName, phone, dob, gender }, { new: true });
    if (!updatedUser) throw new AppError("Internal server error", 500);

    return res.status(200).json({
        success: true, message: "User updated successfully.", updatedUser: {
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phone: updatedUser.phone,
            dob: updatedUser.dob,
            gender: updatedUser.gender,
            email: updatedUser.email
        }
    })
})


