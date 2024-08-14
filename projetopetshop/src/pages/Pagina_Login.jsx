import "./Pagina_Login.css";
import { useState } from "react";
import axios from "axios";

function Pagina_Login() {
    const [login, setLogin] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLogin({
            ...login,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resposta = await axios.post("http://localhost:5000/login", login);

            if (resposta.status === 200) {
                console.log("Login bem-sucedido!", resposta.data);
            }
            else {
                console.log("Senha ou email está incorreto!")
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="tela-login">
            <form className="formulario-login" onSubmit={handleSubmit}>

                <div className="caixa-email"> 
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        value={login.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="caixa-senha">
                    <label htmlFor="password">Senha</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={login.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn-login">Login</button>
            </form>
        </section>
    )
}

export default Pagina_Login;