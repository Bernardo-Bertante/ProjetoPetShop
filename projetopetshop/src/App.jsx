import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Pagina_Login from "./pages/Pagina_Login";
import Pagina_Principal from "./pages/Pagina_Principal";

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pagina_Login />} ></Route>
          <Route path="/pagina-principal" element={<Pagina_Principal />} ></Route>
        </Routes>
      </BrowserRouter>
    )
}

export default App;
