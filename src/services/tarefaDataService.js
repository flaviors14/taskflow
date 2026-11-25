// Serviço que concentra a comunicação com a API de tarefas.
// Os componentes chamam estes métodos e não precisam conhecer as URLs.

import http from "../http-common";

class TarefaDataService {
  getAll() {
    return http.get("/tarefas");
  }

  get(id) {
    return http.get(`/tarefas/${id}`);
  }

  create(data) {
    return http.post("/tarefas", data);
  }

  update(id, data) {
    // PUT envia a tarefa completa, substituindo o registro salvo
    return http.put(`/tarefas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tarefas/${id}`);
  }
}

export default new TarefaDataService();
