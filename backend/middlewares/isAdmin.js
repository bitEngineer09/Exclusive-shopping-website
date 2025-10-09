export const isAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.status(400).json({
            success: false,
            message: "Not authenticated"
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
    }

    next();
}

// import { isAuth } from "../middlewares/isAuth.js";
// import { requireAdmin } from "../middlewares/requireAdmin.js";

// router.get("/admin/dashboard", isAuth, requireAdmin, (req, res) => {
//   res.json({ success: true, message: "Welcome Admin", user: req.user });
// });
