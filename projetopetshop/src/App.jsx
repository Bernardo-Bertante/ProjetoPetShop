import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Pagina_Login from "./pages/Pagina_Login";
import Pagina_Principal from "./pages/Pagina_Principal";
import Pagina_Agendamento from "./pages/Pagina_Agendamento";

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pagina_Login />} ></Route>
          <Route path="/pagina-principal" element={<Pagina_Principal />} ></Route>
          <Route path="/pagina-agendamento" element={<Pagina_Agendamento />} ></Route>
        </Routes>
      </BrowserRouter>
    )
}

export default App;
