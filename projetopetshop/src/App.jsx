import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Pagina_Login from "./pages/Pagina_Login";

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pagina_Login />} ></Route>
        </Routes>
      </BrowserRouter>
    )
}

export default App;
