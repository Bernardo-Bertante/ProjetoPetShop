import { Request, Response, NextFunction } from "express";

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        console.log(req.isAuthenticated());
        return next();
    }
    console.log(req.isAuthenticated()); // isso está printando false
    return res.status(401).send({ message: "Usuario não logado!" });
}
export { ensureAuthenticated };
