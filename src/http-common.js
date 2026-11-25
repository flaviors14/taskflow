// Configuração do axios usada em todas as requisições para a API.

import axios from "axios";

export default axios.create({
  // Endereço da Mock API (JSON Server). Se a API mudar de porta ou de máquina, altere somente aqui.
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
});
