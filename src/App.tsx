import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./screens/home";
import Login from "./screens/login";
import Consultas from "./screens/consultas";
import Cadastros from "./screens/cadastros";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="/cadastros" element={<Cadastros />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
