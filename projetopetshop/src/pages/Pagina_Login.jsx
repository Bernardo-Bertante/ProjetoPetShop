import "./Pagina_Login.css";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function Pagina_Login() {
  const { userLogin } = useContext(UserContext);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [erro, setErro] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });

    setErro({
      ...erro,
      [name]: false,
    });
  };

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleFocus = (e) => {
    const { name } = e.target;

    setErro({
      ...erro,
      [name]: false,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login.email || !login.password) {
      setErro({
        email: !login.email,
        password: !login.password,
      });
      return;
    }

    try {
      const resposta = await axios.post("http://localhost:5000/login", login);

      if (resposta.status === 200) {
        console.log("Login bem-sucedido!", resposta.data);
        setErro(true);
        userLogin(resposta.data.user);
        navigate("/pagina-principal");
      } else {
        setErro({
          email: true,
          password: true,
        });
        console.log("Senha ou email está incorreto!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="tela-login">
      <form className="formulario-login" onSubmit={handleSubmit}>
        <div className="img-logo">
          <img src="" alt="" />
        </div>
        <div className={`caixa-campo ${erro.email ? "erroInput" : ""}`}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={login.email}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {erro.email && <div className="erro-frase">Erro</div>}
        </div>

        <div className={`caixa-campo ${erro.password ? "erroInput" : ""}`}>
          <label htmlFor="password">Senha</label>
          <input
            type={mostrarSenha ? "text" : "password"}
            name="password"
            value={login.password}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <span className="icone-olhinho" onClick={toggleMostrarSenha}>
            <img
              src={mostrarSenha ? "img/eye-open.png" : "img/eye-blocked.png"}
              alt=""
            />
          </span>
          {erro.password && <div className="erro-frase">Erro</div>}
        </div>

        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
    </section>
  );
}

export default Pagina_Login;
