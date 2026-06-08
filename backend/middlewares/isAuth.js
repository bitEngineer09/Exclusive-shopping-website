import { refreshTheTokens, verifyToken } from "../services/auth.services.js";

export const isAuth = async (req, res, next) => {
    try {
        const accessToken = req.cookies.access_token;
        const refreshToken = req.cookies.refresh_token;

        req.user = null;

        if (!accessToken && !refreshToken) {
            req.user = null;
            return next();
        }

        if (accessToken) {
            try {
                const decodedToken = verifyToken(accessToken);
                req.user = decodedToken;

                return next();
            } catch (error) {
                console.log(`error in decoded token: ${error}`);
            }
        }

        if (refreshToken) {
            try {
                const result = await refreshTheTokens(refreshToken);

                // Guard against undefined/null result
                if (!result || !result.newAccessToken) {
                    req.user = null;
                    return next();
                }

                const { newAccessToken, newRefreshToken, user } = result;
                req.user = user;

                const isProduction = process.env.NODE_ENV === "production";
                const baseConfig = {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: isProduction ? "none" : "lax",
                };
                res.cookie("access_token", newAccessToken, baseConfig);
                res.cookie("refresh_token", newRefreshToken, baseConfig);
                return next();
            } catch (error) {
                console.log(`refresh token error: ${error}`);
                req.user = null;
                return next(); // ← don't send 400, just proceed as unauthenticated
            }
        }



    } catch (error) {
        return res.status(400).json({ success: false, message: `isAuth middleware error: ${error}` })
    }
    return next();
}