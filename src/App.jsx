// Componente principal: monta a barra de navegação e define as rotas da aplicação.

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ListTarefa from "./components/listTarefa";
import AddTarefa from "./components/addTarefa";
import UpdTarefa from "./components/updTarefa";

function App() {
  return (
    <BrowserRouter>
      {/* Barra superior de navegação */}
      <nav className="navbar navbar-expand navbar-light bg-white border-bottom">
        <div className="container">
          <Link to="/list" className="navbar-brand fw-semibold text-dark">
            TaskFlow
          </Link>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/list" className="nav-link">
                Listar
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                Cadastrar
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container mt-4 mb-5">
        <Routes>
          <Route path="/" element={<ListTarefa />} />
          <Route path="/list" element={<ListTarefa />} />
          <Route path="/add" element={<AddTarefa />} />
          {/* ":id" é o parâmetro com o id da tarefa que será editada */}
          <Route path="/tarefas/:id" element={<UpdTarefa />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;