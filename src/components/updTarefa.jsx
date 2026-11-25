// Este componente carrega uma tarefa pelo id da URL e permite editar seus dados.

import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import TarefaDataService from "../services/tarefaDataService";

function UpdTarefa() {
  const { id } = useParams(); // id que vem da URL (ex.: /tarefas/2)
  const navigate = useNavigate();

  // --- Estado ---
  const [tarefaAtual, setTarefaAtual] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  // --- Buscando dados ---
  // Sempre que o id da URL mudar, busca a tarefa correspondente na API
  useEffect(() => {
    setCarregando(true);
    TarefaDataService.get(id)
      .then((response) => {
        setTarefaAtual(response.data);
        setMensagemErro("");
      })
      .catch((e) => {
        console.error(`Erro ao buscar tarefa ${id}:`, e);
        if (!e.response) {
          setMensagemErro("Não foi possível conectar à API. Verifique se o JSON Server está rodando (npm run server).");
        } else if (e.response.status === 404) {
          setMensagemErro("Tarefa não encontrada.");
        } else {
          setMensagemErro("Erro ao carregar a tarefa.");
        }
      })
      .finally(() => {
        setCarregando(false);
      });
  }, [id]);

  // --- Manipuladores de eventos ---
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    // O checkbox usa "checked" (true/false); os demais campos usam "value"
    setTarefaAtual({ ...tarefaAtual, [name]: type === "checkbox" ? checked : value });
  };

  const validar = () => {
    const novosErros = {};
    if (tarefaAtual.titulo.trim() === "") {
      novosErros.titulo = "Informe o título da tarefa.";
    }
    if (tarefaAtual.descricao.trim() === "") {
      novosErros.descricao = "Informe a descrição da tarefa.";
    }
    if (!["Alta", "Média", "Baixa"].includes(tarefaAtual.prioridade)) {
      novosErros.prioridade = "Selecione a prioridade.";
    }
    return novosErros;
  };

  const updateTarefa = (event) => {
    event.preventDefault();

    const novosErros = validar();
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) {
      return;
    }

    // Como usamos PUT, enviamos a tarefa completa
    const data = {
      id: tarefaAtual.id,
      titulo: tarefaAtual.titulo.trim(),
      descricao: tarefaAtual.descricao.trim(),
      prioridade: tarefaAtual.prioridade,
      concluida: tarefaAtual.concluida,
    };

    setEnviando(true);
    setMensagemErro("");

    TarefaDataService.update(tarefaAtual.id, data)
      .then(() => {
        navigate("/list", { state: { mensagem: "Tarefa atualizada com sucesso!" } });
      })
      .catch((e) => {
        console.error("Erro ao atualizar tarefa:", e);
        if (!e.response) {
          setMensagemErro("Não foi possível conectar à API. Verifique se o JSON Server está rodando (npm run server).");
        } else {
          setMensagemErro("Erro ao atualizar a tarefa. Tente novamente.");
        }
        setEnviando(false);
      });
  };

  // --- Renderização ---
  return (
    <section className="form-tarefa">
      <h4 className="mb-3">Editar tarefa</h4>

      {mensagemErro && (
        <div className="alert alert-danger" role="alert">
          {mensagemErro}
        </div>
      )}

      {carregando && <p><i>Carregando tarefa...</i></p>}

      {!carregando && tarefaAtual && (
        <form onSubmit={updateTarefa} noValidate>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label"><strong>Título</strong></label>
            <input
              type="text"
              className={"form-control" + (erros.titulo ? " is-invalid" : "")}
              id="titulo"
              name="titulo"
              value={tarefaAtual.titulo}
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
              value={tarefaAtual.descricao}
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
              value={tarefaAtual.prioridade}
              onChange={handleInputChange}
            >
              <option value="">Selecione...</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
            {erros.prioridade && <div className="invalid-feedback">{erros.prioridade}</div>}
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="concluida"
              name="concluida"
              checked={tarefaAtual.concluida}
              onChange={handleInputChange}
            />
            <label htmlFor="concluida" className="form-check-label">
              Tarefa concluída
            </label>
          </div>

          <button type="submit" className="btn btn-success me-2" disabled={enviando}>
            {enviando ? "Salvando..." : "Salvar alterações"}
          </button>
          <Link to="/list" className="btn btn-outline-secondary">
            Cancelar
          </Link>
        </form>
      )}

      {!carregando && !tarefaAtual && (
        <Link to="/list" className="btn btn-outline-secondary">
          Voltar para a lista
        </Link>
      )}
    </section>
  );
}

export default UpdTarefa;
