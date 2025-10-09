import { User } from "../models/user.model.js";
import {
    authenticate,
    clearSession,
    createAccessTokenAdmin,
    createUserByEmail,
    findUserByEmail,
    findUserById,
    hashPassword,
    registerUser,
    verifyPassword
} from "../services/auth.services.js";



// REGISTER CONTROLLER without validator
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, dob, gender, password } = req.body;
        console.log("register body data:", req.body);

        // Basic check for required fields (you can expand this as needed)
        if (!firstName || !email || !phone || !dob || !gender || !password) {
            return res.status(400).json({ success: false, message: "All required fields must be provided" });
        }

        // Check if user with the same email already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Encrypt the password
        const encryptedPassword = await hashPassword(password);
        if (!encryptedPassword) {
            return res.status(500).json({ success: false, message: "Password encryption error" });
        }

        // Register the new user
        const newUser = await registerUser(firstName, lastName, email, phone, dob, gender, encryptedPassword);
        if (!newUser) {
            return res.status(500).json({ success: false, message: "New user registration error" });
        }

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

    } catch (error) {
        console.log("register controller error: ", error);
        return res.status(500).json({ success: false, message: error.message || error });
    }
};



// LOGIN CONTROLLER-------------------------------------------------
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;  // Extract email and password from request body

        // Check if email is already registered
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not registered" });
        }

        // Verify password
        const verifiedPassword = await verifyPassword(user.password, password);
        if (!verifiedPassword) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

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

    } catch (error) {
        console.log("login controller error: ", error);
        return res.status(500).json({ success: false, message: error.message || error });
    }
};



// LOGOUT CONTROLLER
export const logout = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ message: "User not authenticated" });

        await clearSession(req.user.sessionId);
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");

        return res.status(200).json({ success: true, message: "User logged out" });

    } catch (error) {
        return res.status(400).json({ success: false, message: `logout controller error: ${error}` });
    }
}




// GET LOGGED IN USER DATA
export const getUserData = async (req, res) => {
    if (!req.user) return res.status(400).json({ message: "User not authenticated" });

    const user = await findUserById(req.user.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

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
};


// GOOGLE SIGNUP CONTROLLER
export const googleSignUp = async (req, res) => {
    try {
        const { name, email } = req.body;
        // console.log(name, email)
        const user = await findUserByEmail(email);
        if (user) return res.status(400).json({ success: false, message: "User already exists" });

        const newUser = await createUserByEmail(name, email);
        if (!newUser) return res.status(404).json({ success: false, message: "Internal server error" });

        await authenticate(req, res, newUser);
        return res.status(201).json({
            success: true,
            message: "Google signup successful",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error.message || "Google signup failed",
        })
    }
}


// GOOGLE LOGIN CONTROLLER
export const googleLogin = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("email", email);

        const user = await findUserByEmail(email);
        if (!user) return res.status(400).json({ success: false, message: "User not registered. Try with different email" });

        await authenticate(req, res, user);
        return res.status(200).json({ success: true, user: user });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Google login failed"
        })
    }
}


// EDIT USER DATA
export const editUser = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated." });

        const { firstName, lastName, email, phone, dob, gender } = req.body;

        const updatedUser = await User.findByIdAndUpdate(req.user.id, { firstName, lastName, phone, dob, gender }, { new: true });
        if (!updatedUser) return res.status(400).json({ success: false, message: "Internal server error" });

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

    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ success: false, error: error.message });
    }
}

// ADMIN LOGIN CONTROLLER
// export const adminLogin = async (req, res) => {
//     try {
//         const {email, password} = req.body;
//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const adminToken = createAccessTokenAdmin(email);
//             // console.log(adminToken)

//             res.cookie("admin_token", adminToken, {
//                 httpOnly: true,
//                 secure: false,
//                 sameSite: "strict",
//                 maxAge: 7 * 24 * 60 * 60 * 1000
//             })
//             return res.status(200).json({success: true, message: adminToken});
//         }
//         return res.status(400).json({success: false, message: "Invalid Credentials"});

//     } catch (error) {
//         return res
//             .status(400)
//             .json({
//                 success: false,
//                 message: error.message || "admin login controller error"
//             })
//     }
// }

