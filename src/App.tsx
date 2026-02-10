import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./screens/home";
import Login from "./screens/login";
import Consultas from "./screens/consultas";
import Cadastros from "./screens/cadastros";
import FeiradeSaude from "./screens/feira";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="/cadastros" element={<Cadastros />} />
          <Route path="/feiradesaude2026" element={<FeiradeSaude />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
