// Este componente lista todas as tarefas em duas colunas e permite abrir a edição ou excluir cada uma.

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TarefaDataService from "../services/tarefaDataService";

function ListTarefa() {
  // Mensagem enviada pelas telas de cadastro e edição ao voltar para a lista
  const location = useLocation();

  // --- Estado ---
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState(location.state?.mensagem || "");

  // --- Buscando dados ---
  const retrieveTarefas = () => {
    setCarregando(true);
    TarefaDataService.getAll()
      .then((response) => {
        setTarefas(response.data);
        setErro("");
      })
      .catch((e) => {
        console.error("Erro ao buscar tarefas:", e);
        if (!e.response) {
          setErro("Não foi possível conectar à API. Verifique se o JSON Server está rodando (npm run server).");
        } else {
          setErro("Erro ao carregar as tarefas.");
        }
      })
      .finally(() => {
        setCarregando(false);
      });
  };

  // Busca as tarefas uma vez, quando a tela é aberta
  useEffect(() => {
    retrieveTarefas();
  }, []);

  // --- Manipuladores de eventos ---
  const deleteTarefa = (tarefa) => {
    if (!window.confirm(`Tem certeza que deseja excluir a tarefa "${tarefa.titulo}"?`)) {
      return;
    }

    TarefaDataService.delete(tarefa.id)
      .then(() => {
        setMensagem("Tarefa excluída com sucesso!");
        retrieveTarefas();
      })
      .catch((e) => {
        console.error("Erro ao excluir tarefa:", e);
        setMensagem("");
        if (!e.response) {
          setErro("Não foi possível conectar à API. Verifique se o JSON Server está rodando (npm run server).");
        } else {
          setErro("Erro ao excluir a tarefa.");
        }
      });
  };

  // Define a classe da faixa lateral e a cor do selo conforme a prioridade
  const classePrioridade = (prioridade) => {
    if (prioridade === "Alta") return { faixa: "prioridade-alta", selo: "bg-danger" };
    if (prioridade === "Média") return { faixa: "prioridade-media", selo: "bg-warning text-dark" };
    return { faixa: "prioridade-baixa", selo: "bg-info text-dark" };
  };

  // Separa as tarefas em pendentes e concluídas para exibir em duas colunas
  const pendentes = tarefas.filter((tarefa) => !tarefa.concluida);
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida);

  // --- Renderização ---
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 fw-semibold">Tarefas</h4>
        <Link to="/add" className="btn btn-primary btn-sm px-3 py-2">
          + Nova tarefa
        </Link>
      </div>

      {mensagem && (
        <div className="alert alert-success alert-dismissible" role="alert">
          {mensagem}
          <button type="button" className="btn-close" aria-label="Fechar" onClick={() => setMensagem("")}></button>
        </div>
      )}

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      {carregando ? (
        <p><i>Carregando tarefas...</i></p>
      ) : (
        !erro && (
          <div className="row g-4">
            {/* Coluna 1: Pendentes (concluida === false) */}
            <div className="col-12 col-lg-6">
              <div className="coluna-kanban">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 fw-semibold text-secondary">Pendentes</h6>
                  <span className="badge rounded-pill bg-secondary">{pendentes.length}</span>
                </div>

                {pendentes.length > 0 ? (
                  <ul className="list-group gap-2">
                    {pendentes.map((tarefa) => (
                      <li
                        key={tarefa.id}
                        className={
                          "list-group-item card-tarefa p-3 " +
                          classePrioridade(tarefa.prioridade).faixa
                        }
                      >
                        <h5 className="tarefa-titulo mb-1">{tarefa.titulo}</h5>
                        <p className="text-muted small mb-3">{tarefa.descricao}</p>

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                          <div>
                            <span className={"badge rounded-pill me-2 " + classePrioridade(tarefa.prioridade).selo}>
                              Prioridade: {tarefa.prioridade}
                            </span>
                            <span className="badge rounded-pill bg-secondary">
                              Pendente
                            </span>
                          </div>

                          <div className="text-nowrap">
                            <Link to={"/tarefas/" + tarefa.id} className="btn btn-sm btn-warning me-2">
                              Editar
                            </Link>
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteTarefa(tarefa)}>
                              Excluir
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted small text-center my-4">Nenhuma tarefa pendente.</p>
                )}
              </div>
            </div>

            {/* Coluna 2: Concluídas (concluida === true) */}
            <div className="col-12 col-lg-6">
              <div className="coluna-kanban">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 fw-semibold text-secondary">Concluídas</h6>
                  <span className="badge rounded-pill bg-success">{concluidas.length}</span>
                </div>

                {concluidas.length > 0 ? (
                  <ul className="list-group gap-2">
                    {concluidas.map((tarefa) => (
                      <li
                        key={tarefa.id}
                        className={
                          "list-group-item card-tarefa p-3 tarefa-concluida " +
                          classePrioridade(tarefa.prioridade).faixa
                        }
                      >
                        <h5 className="tarefa-titulo mb-1">{tarefa.titulo}</h5>
                        <p className="text-muted small mb-3">{tarefa.descricao}</p>

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                          <div>
                            <span className={"badge rounded-pill me-2 " + classePrioridade(tarefa.prioridade).selo}>
                              Prioridade: {tarefa.prioridade}
                            </span>
                            <span className="badge rounded-pill bg-success">
                              Concluída
                            </span>
                          </div>

                          <div className="text-nowrap">
                            <Link to={"/tarefas/" + tarefa.id} className="btn btn-sm btn-warning me-2">
                              Editar
                            </Link>
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteTarefa(tarefa)}>
                              Excluir
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted small text-center my-4">Nenhuma tarefa concluída.</p>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
}

export default ListTarefa;