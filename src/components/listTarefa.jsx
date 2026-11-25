// Este componente lista todas as tarefas e permite abrir a edição ou excluir cada uma.

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

  // --- Renderização ---
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Tarefas</h4>
        <Link to="/add" className="btn btn-success">
          Nova tarefa
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
          <ul className="list-group">
            {tarefas.length > 0 ? (
              tarefas.map((tarefa) => (
                <li
                  key={tarefa.id}
                  className={
                    "list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 " +
                    classePrioridade(tarefa.prioridade).faixa +
                    (tarefa.concluida ? " tarefa-concluida" : "")
                  }
                >
                  <div>
                    <h5 className="tarefa-titulo mb-1">{tarefa.titulo}</h5>
                    <p className="mb-2">{tarefa.descricao}</p>
                    <span className={"badge me-2 " + classePrioridade(tarefa.prioridade).selo}>
                      Prioridade: {tarefa.prioridade}
                    </span>
                    <span className={"badge " + (tarefa.concluida ? "bg-success" : "bg-secondary")}>
                      {tarefa.concluida ? "Concluída" : "Pendente"}
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
                </li>
              ))
            ) : (
              <li className="list-group-item">Nenhuma tarefa cadastrada.</li>
            )}
          </ul>
        )
      )}
    </section>
  );
}

export default ListTarefa;
