import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import flash from "express-flash";
import { AdminRouter } from "./routes/AdminRouter";
import { LoginRouter } from "./routes/LoginRouter";
import { ClienteRouter } from "./routes/ClienteRouter";
import { ServicoRouter } from "./routes/ServicoRouter";
import { AgendamentoRouter } from "./routes/AgendamentoRouter";
import { HorarioRouter } from "./routes/HorarioRouter";
import { config } from "dotenv";

const app = express();

// Configuração do CORS
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
config();

// Configuração do express-session
app.use(
    session({
        secret: process.env.SECRETKEY! || "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // true se estiver usando HTTPS
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 dia
        },
    })
);
// Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para CORS
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET, POST, PUT, DELETE, PATCH",
        credentials: true,
    })
);

// Middleware para mensagens flash
app.use(flash());

// Rotas
app.use("/funcionario", AdminRouter);
app.use("/cliente", ClienteRouter);
app.use("/servico", ServicoRouter);
app.use("/agendamento", AgendamentoRouter);
app.use("/", LoginRouter);
app.use("/horario", HorarioRouter);

// Manipulador de erro para mensagens flash
app.use((err: any, req: Request, res: Response, next: Function) => {
    if (err) {
        req.flash("error", err.message); // Enviar mensagem flash de erro
        res.redirect("/");
    }
});

// Rota de erro para lidar com rotas inexistentes
app.use((req: Request, res: Response) => {
    res.status(404).send("Rota não encontrada!");
});

export default app;
