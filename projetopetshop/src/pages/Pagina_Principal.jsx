import "./Pagina_Principal.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Pagina_Principal() {

    const location = useLocation();
    const { isAdmin } = location.state || {};
    const navigate = useNavigate();

    return (
        <section className="pagina-principal">

            <div className="seta-volta" onClick={() => {navigate("/")}}>
                <img src="/img/seta.svg" alt="" />
            </div>

            <button className="buttons-principal" onClick={() => {navigate("/pagina-agendamento")}}>Agendar</button>
            <button className="buttons-principal">Cliente</button>
            <button className="buttons-principal">Serviços</button>

            {isAdmin && <button className="buttons-principal">Funcionário</button>}
        </section>
    )
}

export default Pagina_Principal;