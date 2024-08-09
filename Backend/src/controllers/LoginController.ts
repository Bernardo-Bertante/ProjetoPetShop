import { Router, Request, Response, NextFunction } from "express";
import passport from "../utils/passport";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();

router.post("/login", (req, res, next) => {
    console.log("Request Body:", req.body); // Log request body
    passport.authenticate("local", (err: any, user: any, info: any) => {
        if (err) return next(err);
        if (!user) {
            console.log("Authentication failed:", info); // Log failure info
            return res.status(401).json({
                redirectUrl: "/account/login",
                message: info.message,
            });
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({
                redirectUrl: "/home",
                user: user,
            });
        });
    })(req, res, next);
});

router.post(
    "/logout",
    ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: any = req.body.email;

            req.logout(function (err) {
                if (err) {
                    return next(err);
                }
                return res
                    .status(200)
                    .send({ message: "Usuário deslogado com sucesso" });
            });
        } catch (error) {
            next(error);
        }
    }
);

export { router as LoginRoutes };
