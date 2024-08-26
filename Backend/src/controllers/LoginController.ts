import { Request, Response, NextFunction } from "express";
import passport from "../utils/passport";

// Função para realizar login
export const login = (req: Request, res: Response, next: NextFunction) => {
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
                redirectUrl: "/",
                user: user,
            });
        });
    })(req, res, next);
};

// Função para realizar logout
export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            return res.status(200).send({ message: "Usuário deslogado com sucesso" });
        });
    } catch (error) {
        next(error);
    }
};
