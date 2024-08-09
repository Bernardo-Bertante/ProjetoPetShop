import { Router, Request, Response, NextFunction } from "express";
import FuncionarioService from "../services/FuncionarioService";
import { config } from "dotenv";
import { FuncionarioModel } from "../models/FuncionarioModel";
import { FuncionarioType } from "../types/FuncionarioType";
import { ValidationError } from "sequelize";
//import { ensureAuthenticated } from "../middlewares/protectedRoute";
import passport from "../utils/passport";
import errorHandler from "../middleware/errorHandler";

config();

const router = Router();

router.post(
    "/register",
    errorHandler,
    async (req: Request, res: Response, next: NextFunction) => {
        const user: FuncionarioType = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cpf: req.body.cpf,
            dataNascimento: req.body.dataNascimento,
            password: req.body.password,
            telefone: req.body.telefone,
            email: req.body.email,
            isAdmin: false,
            secret: "secret",
        };

        //const userValidation = UserType.safeParse(user);

        // if (!userValidation.success) {
        //     return res.status(400).send({
        //         message: "Invalid user data",
        //         error: userValidation.error,
        //     });
        // }

        try {
            const result = await FuncionarioService.createFuncionario(user);
            res.status(201).send({
                message: "User registered successfully",
                user: result.nome,
            });
        } catch (err) {
            next(err);
        }
    }
);

// rota para deletar um funcionario

router.delete(
    "/delete",
    async (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email;

        try {
            const result = await FuncionarioService.deleteFuncionario(email);
            res.status(200).send({ message: result });
        } catch (err) {
            next(err);
        }
    }
);

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
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: any = req.body.email;
            if (user.allowsession) {
                await FuncionarioModel.update(
                    { allowsession: false },
                    { where: { email: user.email } }
                );
            }

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

router.put(
    "/profile/edit",
    async (req: Request, res: Response, next: NextFunction) => {
        const updates = req.body;

        try {
            const user = await FuncionarioService.updateFuncionario(updates);
            return res
                .status(200)
                .send({ message: "Perfil atualizado com sucesso", user });
        } catch (error) {
            next(error);
        }
    }
);

// get no profile do funcionario

router.get("/profile", async (req, res, next) => {
    try {
        const user = await FuncionarioService.getFuncionario(req.body.email);
        return res.status(200).send({ user });
    } catch (error) {
        next(error);
    }
});

export { router as FuncionarioRouter };
