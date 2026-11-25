// Este componente contém o formulário para cadastrar uma nova tarefa.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TarefaDataService from "../services/tarefaDataService";

function AddTarefa() {
  const navigate = useNavigate();

  // --- Estado ---
  const initialTarefaState = {
    titulo: "",
    descricao: "",
    prioridade: "",
  };
  const [tarefa, setTarefa] = useState(initialTarefaState);
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  // --- Manipuladores de eventos ---
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTarefa({ ...tarefa, [name]: value });
  };

  // Confere os campos obrigatórios e devolve um objeto com os erros encontrados
  const validar = () => {
    const novosErros = {};
    if (tarefa.titulo.trim() === "") {
      novosErros.titulo = "Informe o título da tarefa.";
    }
    if (tarefa.descricao.trim() === "") {
      novosErros.descricao = "Informe a descrição da tarefa.";
    }
    if (!["Alta", "Média", "Baixa"].includes(tarefa.prioridade)) {
      novosErros.prioridade = "Selecione a prioridade.";
    }
    return novosErros;
  };

  const saveTarefa = (event) => {
    event.preventDefault(); // impede o recarregamento da página ao enviar o formulário

    const novosErros = validar();
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) {
      return;
    }

    // Toda tarefa nova começa como pendente (concluida = false)
    const data = {
      titulo: tarefa.titulo.trim(),
      descricao: tarefa.descricao.trim(),
      prioridade: tarefa.prioridade,
      concluida: false,
    };

    setEnviando(true);
    setMensagemErro("");

    TarefaDataService.create(data)
      .then(() => {
        // Volta para a lista levando a mensagem de sucesso
        navigate("/list", { state: { mensagem: "Tarefa cadastrada com sucesso!" } });
      })
      .catch((e) => {
        console.error("Erro ao cadastrar tarefa:", e);
        if (!e.response) {
          setMensagemErro("Não foi possível conectar à API. Verifique se o JSON Server está rodando (npm run server).");
        } else {
          setMensagemErro("Erro ao cadastrar a tarefa. Tente novamente.");
        }
        setEnviando(false);
      });
  };

  // --- Renderização ---
  return (
    <section className="form-tarefa">
      <h4 className="mb-3">Nova tarefa</h4>

      {mensagemErro && (
        <div className="alert alert-danger" role="alert">
          {mensagemErro}
        </div>
      )}

      <form onSubmit={saveTarefa} noValidate>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label"><strong>Título</strong></label>
          <input
            type="text"
            className={"form-control" + (erros.titulo ? " is-invalid" : "")}
            id="titulo"
            name="titulo"
            value={tarefa.titulo}
            onChange={handleInputChange}
          />
          {erros.titulo && <div className="invalid-feedback">{erros.titulo}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="descricao" className="form-label"><strong>Descrição</strong></label>
          <textarea
            rows={3}
            className={"form-control" + (erros.descricao ? " is-invalid" : "")}
            id="descricao"
            name="descricao"
            placeholder="Descreva o que precisa ser feito..."
            value={tarefa.descricao}
            onChange={handleInputChange}
          />
          {erros.descricao && <div className="invalid-feedback">{erros.descricao}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="prioridade" className="form-label"><strong>Prioridade</strong></label>
          <select
            className={"form-select" + (erros.prioridade ? " is-invalid" : "")}
            id="prioridade"
            name="prioridade"
            value={tarefa.prioridade}
            onChange={handleInputChange}
          >
            <option value="">Selecione...</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
          {erros.prioridade && <div className="invalid-feedback">{erros.prioridade}</div>}
        </div>

        <button type="submit" className="btn btn-success me-2" disabled={enviando}>
          {enviando ? "Salvando..." : "Cadastrar"}
        </button>
        <Link to="/list" className="btn btn-outline-secondary">
          Cancelar
        </Link>
      </form>
    </section>
  );
}

export default AddTarefa;
