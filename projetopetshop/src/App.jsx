import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import "./App.css";
import Pagina_Login from "./pages/Pagina_Login";
import Pagina_Principal from "./pages/Pagina_Principal";
import Pagina_Agendamento from "./pages/Pagina_Agendamento";
import FormularioAgendamento from "./pages/FormularioAgendamento";
import Pagina_Atualizar_Agendamento from "./pages/Pagina_Atualizar_Agendamento";
import Pagina_Cliente from "./pages/Pagina_Cliente";
import FormularioCliente from "./pages/FormularioCliente";
import Pagina_Atualizar_Cliente from "./pages/Pagina_Atualizar_Cliente";
import Pagina_Servico from "./pages/Pagina_Servico";
import FormularioServico from "./pages/FormularioServico";
import Pagina_Atualizar_Servico from "./pages/Pagina_Atualizar_Servico";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pagina_Login />}></Route>
          <Route
            path="/pagina-principal"
            element={<Pagina_Principal />}
          ></Route>
          <Route
            path="/pagina-agendamento"
            element={<Pagina_Agendamento />}
          ></Route>
          <Route
            path="/formulario-agendamento"
            element={<FormularioAgendamento />}
          ></Route>
          <Route
            path="/atualizar-agendamento"
            element={<Pagina_Atualizar_Agendamento />}
          ></Route> 
          <Route
            path="/pagina-cliente"
            element={<Pagina_Cliente />}
          ></Route> 
          <Route
            path="/formulario-cliente"
            element={<FormularioCliente />}
          ></Route>
           <Route
            path="/atualizar-cliente"
            element={<Pagina_Atualizar_Cliente />}
          ></Route>  
          <Route
            path="/pagina-servico"
            element={<Pagina_Servico />}
          ></Route>
          <Route
            path="/formulario-servico"
            element={<FormularioServico />}
          ></Route>
          <Route
            path="/atualizar-servico"
            element={<Pagina_Atualizar_Servico />}
          ></Route>     
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
