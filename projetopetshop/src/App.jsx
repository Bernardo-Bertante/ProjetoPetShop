import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import "./App.css";
import Pagina_Login from "./pages/Pagina_Login";
import Pagina_Principal from "./pages/Pagina_Principal";
import Pagina_Agendamento from "./pages/Pagina_Agendamento";
import FormularioAgendamento from "./pages/FormularioAgendamento";
import Pagina_Atualizar from "./pages/Pagina_Atualizar";

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
            element={<Pagina_Atualizar />}
          ></Route> 
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
