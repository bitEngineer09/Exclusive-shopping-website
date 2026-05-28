import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js'
import { Session } from '../models/session.model.js';

export const registerUser = async (firstName, lastName, email, phone, dob, gender, encryptedPassword) => {
    return await User.create({ firstName, lastName, email, phone, dob, gender, password: encryptedPassword });
}

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

export const findUserById = async (id) => {
    return await User.findById(id);
}

//! PASSWORD PART
export const hashPassword = async (password) => {
    return await argon2.hash(password);
}

export const verifyPassword = async (databasePassword, inputPassword) => {
    return await argon2.verify(databasePassword, inputPassword);
}

export const createUserByEmail = async (name, email) => {
    return await User.create({ name, email });
}
//!---------------------------------------------------------------------------------




//! COOKIES PART -------------------------------------------------------------------
export const createSession = async ({ ip, userAgent, userId }) => {
    return await Session.create({ ip, userAgent, userId });
}

export const createAccessToken = ({ id, name, email, sessionId }) => {
    return jwt.sign({ id, name, email, sessionId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const createAccessTokenAdmin = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const createRefreshToken = (sessionId) => {
    return jwt.sign({ sessionId }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}


//? AUTHENTICATE Function
export const authenticate = async (req, res, loggedInUser, registeredUser) => {
    const account = loggedInUser ?? registeredUser;
    const { _id: id, firstName, lastName, email } = account;
    const name = firstName + " " + lastName;

    const session = await createSession({
        ip: req.ClientIp,
        userAgent: req.headers["user-agent"],
        userId: id,
    })

    const accessToken = createAccessToken({
        id,
        name,
        email,
        sessionId: session._id
    })

    const refreshToken = createRefreshToken(session._id);

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
}
//?--------------------------------------------------------------------

// REFRESH THE TOKENS
export const refreshTheTokens = async (refreshToken) => {
    try {
        const decodedToken = verifyToken(refreshToken);
        if (!decodedToken) throw new Error("Invalid session")

        const currentSession = await Session.findById(decodedToken.sessionId);
        if (!currentSession) throw new Error("Invalid session");

        const user = await User.findById(currentSession.userId);
        if (!user) throw new Error("Invalid session");

        const userInfo = {
            id: user._id,
            name: user.firstName + " " + user.lastName,
            email: user.email,
            sessionId: currentSession._id,
        }

        const newAccessToken = createAccessToken(userInfo);

        const newRefreshToken = createRefreshToken(currentSession._id);

        return { newAccessToken, newRefreshToken, user: userInfo };

    } catch (error) {
        console.log(`refresh the token method error:${error}`);
        return res.status(400).json({ message: `refresh the token error: ${error}` });
    }
}


//! -------------------------------------------------------------------


// DELETE SESSION BY SESSION ID
export const clearSession = async (sessionId) => {
    return await Session.findByIdAndDelete(sessionId);
}




