import { Request, Response, NextFunction } from "express";

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        const user = req.user as any;
        if (user && user.isAdmin) {
            return next();
        } else {
            return res
                .status(403)
                .json({ message: "Acesso negado. Apenas Admins." });
        }
    } else {
        return res
            .status(401)
            .json({ message: "Não autorizado, por favor faça login." });
    }
}
