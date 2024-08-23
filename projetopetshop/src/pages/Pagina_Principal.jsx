import "./Pagina_Principal.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Pagina_Principal() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <section className="pagina-principal">

            <div className="seta-volta" onClick={() => {navigate("/")}}>
                <img src="/img/seta.svg" alt="" />
            </div>

            <button className="buttons-principal" onClick={() => {navigate("/pagina-agendamento")}}>Agendar</button>
            <button className="buttons-principal" onClick={() => {navigate("/pagina-cliente")}}>Cliente</button>
            <button className="buttons-principal" onClick={() => {navigate("/pagina-servico")}}>Serviços</button>

            {user?.isAdmin && <button className="buttons-principal">Funcionário</button>}
        </section>
    )
}

export default Pagina_Principal;