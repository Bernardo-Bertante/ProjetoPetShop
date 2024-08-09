import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { FuncionarioModel } from "../models/FuncionarioModel";

passport.use(
    new LocalStrategy(async (email, password, done) => {
        console.log("Local Strategy");
        try {
            const user = await FuncionarioModel.findOne({
                where: { email: email },
            });
            if (!user) {
                return done(null, false, {
                    message: "Usuário ou senha incorretos.",
                });
            }
            if (!(await user.comparePassword(password))) {
                return done(null, false, {
                    message: "Usuário ou senha incorretos.",
                });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await FuncionarioModel.findOne({ where: { id } });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
