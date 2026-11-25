# TaskFlow

Gerenciador de tarefas feito em **ReactJS**, que consome uma **API REST** simulada com **JSON Server**.

Trabalho da disciplina de **Desenvolvimento Web** – Engenharia de Software.

---

## 1. Objetivo

Aplicar os conceitos vistos em aula (componentes funcionais, estado, efeitos, rotas e comunicação com API REST) em um CRUD completo de tarefas: cadastrar, listar, editar e excluir.

A organização do código segue o projeto **editora-ui** desenvolvido em aula, adaptado para o domínio de tarefas.

## 2. Enunciado resumido

> Criar uma aplicação ReactJS para o cadastro e listagem de informações fornecidas por uma API REST.
> Entrega: código-fonte com descrição da API em repositório GitHub. A API pode ser feita em qualquer linguagem ou com Mock APIs (ex.: JSONPlaceholder, Mockoon).

## 3. Integrantes

| Nome | GitHub |
| --- | --- |
| Integrante 1 | @usuario1 |
| Integrante 2 | @usuario2 |
| Integrante 3 | @usuario3 |

## 4. Funcionalidades

- Listar todas as tarefas com título, descrição, prioridade e status.
- Cadastrar uma tarefa (toda tarefa nova começa como **pendente**).
- Editar título, descrição, prioridade e status (concluída ou pendente).
- Excluir uma tarefa, com confirmação antes da exclusão.
- Validação dos campos obrigatórios antes do envio.
- Mensagens de carregamento, lista vazia, sucesso e erro.
- Aviso amigável quando a API (JSON Server) está desligada.
- Os dados continuam salvos depois de atualizar a página (ficam no `db.json`).

## 5. Tecnologias utilizadas

| Tecnologia | Uso |
| --- | --- |
| ReactJS | Construção da interface com componentes funcionais |
| JavaScript | Linguagem do projeto |
| Vite | Servidor de desenvolvimento e build |
| npm | Gerenciador de pacotes e scripts |
| React Router (`react-router-dom`) | Navegação entre lista, cadastro e edição |
| Axios | Requisições HTTP para a API |
| Bootstrap | Estilo visual (navbar, formulários, botões, alertas) |
| JSON Server 0.17.4 | API REST simulada (Mock API) |
| Git e GitHub | Versionamento e entrega |

## 6. Justificativa das tecnologias

- **React Router, Axios e Bootstrap** são as mesmas bibliotecas usadas no projeto `editora-ui` da disciplina. Mantê-las deixa o código parecido com o que foi visto em aula.
- **Axios** foi configurado em um único arquivo (`http-common.js`), como no projeto de referência, para que a URL da API fique em um só lugar.
- **JSON Server** cria uma API REST completa a partir de um arquivo JSON, sem banco de dados. O enunciado permite Mock APIs, e isso deixa o projeto fácil de rodar em qualquer computador.
- **Vite** é a ferramenta atual recomendada para criar projetos React e inicia rapidamente.
- Nenhuma outra biblioteca foi adicionada.

## 7. Pré-requisitos

- **Node.js 20.19 ou superior** (recomendado: versão LTS 22 ou mais recente). Verifique com `node -v`.
- **npm** (instalado junto com o Node.js). Verifique com `npm -v`.
- **Git**.

Não é necessário instalar nada globalmente: o JSON Server já é uma dependência do projeto.

## 8. Como clonar

```bash
git clone https://github.com/SEU-USUARIO/taskflow.git
cd taskflow
```

## 9. Instalação

```bash
npm install
```

Esse comando lê o `package.json` e o `package-lock.json` e cria a pasta `node_modules` com as mesmas versões usadas pela equipe.

## 10. Iniciando a Mock API (Terminal 1)

```bash
npm run server
```

A API fica disponível em `http://localhost:3000/tarefas`. Deixe este terminal aberto.

## 11. Iniciando o frontend (Terminal 2)

Abra **outro** terminal na mesma pasta e execute:

```bash
npm run dev
```

Acesse o endereço mostrado no terminal (normalmente `http://localhost:5173`).

## 12. Por que dois terminais?

O projeto tem duas partes que rodam ao mesmo tempo:

| Terminal | Comando | O que roda | Porta |
| --- | --- | --- | --- |
| 1 | `npm run server` | API REST (JSON Server), que lê e grava o `db.json` | 3000 |
| 2 | `npm run dev` | Frontend React (Vite), que aparece no navegador | 5173 |

O frontend faz requisições HTTP para a API. Se a API não estiver rodando, a tela mostra uma mensagem de erro de conexão.

Para gerar a versão de produção do frontend: `npm run build` (cria a pasta `dist`, que não vai para o GitHub).

## 13. Estrutura das pastas

```
taskflow/
├── db.json                         # dados da Mock API
├── index.html                      # página HTML onde o React é montado
├── package.json                    # dependências e scripts
├── package-lock.json               # versões exatas das dependências
├── vite.config.js                  # configuração do Vite
├── .gitignore
├── README.md
└── src/
    ├── main.jsx                    # inicialização do React
    ├── App.jsx                     # navbar e rotas
    ├── http-common.js              # configuração do axios (URL da API)
    ├── index.css                   # estilos próprios
    ├── services/
    │   └── tarefaDataService.js    # métodos que chamam a API
    └── components/
        ├── listTarefa.jsx          # listagem e exclusão
        ├── addTarefa.jsx           # cadastro
        └── updTarefa.jsx           # edição
```

## 14. Responsabilidade dos principais arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Contém a `div id="root"` onde o React desenha a aplicação. |
| `src/main.jsx` | Cria a raiz do React e renderiza o `App`. |
| `src/App.jsx` | Importa o Bootstrap e os estilos, monta a barra de navegação e define as rotas. |
| `src/http-common.js` | Cria a instância do axios com a `baseURL` da API. |
| `src/services/tarefaDataService.js` | Métodos `getAll`, `get`, `create`, `update` e `delete`. Os componentes não escrevem URLs. |
| `src/components/listTarefa.jsx` | Busca as tarefas (GET), mostra a lista e exclui (DELETE). |
| `src/components/addTarefa.jsx` | Formulário de cadastro, validação e envio (POST). |
| `src/components/updTarefa.jsx` | Carrega a tarefa pelo id (GET), valida e salva as alterações (PUT). |
| `src/index.css` | Cores da faixa de prioridade e estilo de tarefa concluída. |
| `db.json` | "Banco de dados" do JSON Server, com 3 tarefas iniciais. |

## 15. Modelo de dados

```json
{
  "id": 1,
  "titulo": "Estudar React",
  "descricao": "Revisar componentes, estado e propriedades",
  "prioridade": "Alta",
  "concluida": false
}
```

| Campo | Tipo | Regras |
| --- | --- | --- |
| `id` | número | Gerado automaticamente pelo JSON Server |
| `titulo` | texto | Obrigatório |
| `descricao` | texto | Obrigatório |
| `prioridade` | texto | Obrigatório. Apenas `Alta`, `Média` ou `Baixa` |
| `concluida` | booleano | `false` = pendente, `true` = concluída. Começa `false` no cadastro |

## 16. Descrição da API REST

A API é gerada pelo **JSON Server** a partir do arquivo `db.json`. Cada chave do arquivo vira um recurso; aqui o recurso é `tarefas`.

- Endereço base: `http://localhost:3000`
- Formato dos dados: JSON
- Toda alteração feita pelos métodos POST, PUT e DELETE é gravada no `db.json`.
- O JSON Server libera o acesso de outras origens (CORS), por isso o frontend na porta 5173 consegue acessar a API na porta 3000.

## 17. Endpoints

| Método | Endpoint | Descrição | Resposta de sucesso |
| --- | --- | --- | --- |
| GET | `/tarefas` | Lista todas as tarefas | 200 + lista |
| GET | `/tarefas/:id` | Retorna uma tarefa pelo id | 200 + tarefa (404 se não existir) |
| POST | `/tarefas` | Cadastra uma tarefa | 201 + tarefa criada com `id` |
| PUT | `/tarefas/:id` | Substitui todos os dados da tarefa | 200 + tarefa atualizada |
| DELETE | `/tarefas/:id` | Exclui a tarefa | 200 |

**Por que PUT e não PATCH?** O projeto `editora-ui` da disciplina usa `http.put` no serviço, e o backend `editora` usa `@PutMapping` para atualizar o registro inteiro. Como o formulário de edição tem todos os campos, enviamos a tarefa completa com PUT.

## 18. Exemplos de requisições

Com a API rodando, os exemplos abaixo podem ser executados no terminal (curl) ou em ferramentas como Postman / Insomnia / Thunder Client.

**GET – listar todas**

```bash
curl http://localhost:3000/tarefas
```

**GET – buscar por id**

```bash
curl http://localhost:3000/tarefas/1
```

**POST – cadastrar**

```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Ler documentação","descricao":"Ler a documentação do React Router","prioridade":"Média","concluida":false}'
```

Resposta (201):

```json
{
  "titulo": "Ler documentação",
  "descricao": "Ler a documentação do React Router",
  "prioridade": "Média",
  "concluida": false,
  "id": 4
}
```

**PUT – atualizar**

```bash
curl -X PUT http://localhost:3000/tarefas/4 \
  -H "Content-Type: application/json" \
  -d '{"id":4,"titulo":"Ler documentação","descricao":"Ler a documentação do React Router","prioridade":"Alta","concluida":true}'
```

**DELETE – excluir**

```bash
curl -X DELETE http://localhost:3000/tarefas/4
```

> No Windows (PowerShell), use `curl.exe` no lugar de `curl`, ou teste pelo Postman/Insomnia.

## 19. Observação sobre os dados

Os dados ficam no arquivo `db.json` **do computador onde a API está rodando**. Cada pessoa que clonar o repositório começa com as 3 tarefas iniciais, e as alterações feitas em um computador não aparecem nos outros.

Para voltar aos dados iniciais, desfaça as alterações do arquivo: `git checkout db.json`.

## 20. Roteiro de teste

1. Rodar `npm run server` e `npm run dev` em terminais separados.
2. Abrir `http://localhost:5173`: devem aparecer 3 tarefas.
3. Clicar em **Cadastrar** e enviar o formulário vazio: devem aparecer 3 mensagens de validação.
4. Preencher título, descrição e prioridade e clicar em **Cadastrar**: volta para a lista com "Tarefa cadastrada com sucesso!".
5. Apertar F5: a tarefa nova continua na lista.
6. Clicar em **Editar** na tarefa nova: o formulário abre preenchido.
7. Alterar a prioridade, marcar **Tarefa concluída** e salvar: a lista mostra "Concluída" e o título riscado.
8. Clicar em **Excluir** e cancelar: nada acontece. Clicar de novo e confirmar: a tarefa some e aparece "Tarefa excluída com sucesso!".
9. Parar o Terminal 1 (Ctrl+C) e atualizar a página: aparece o aviso de que a API não está rodando.
10. Rodar `npm run build`: deve terminar sem erros.

## 21. Erros comuns e soluções

| Problema | Causa provável | Solução |
| --- | --- | --- |
| "Não foi possível conectar à API..." | JSON Server não está rodando | Rodar `npm run server` em outro terminal |
| `'json-server' não é reconhecido` / `vite: not found` | Dependências não instaladas | Rodar `npm install` na pasta do projeto |
| `EADDRINUSE: port 3000` | Já existe algo usando a porta 3000 | Fechar o outro programa (ou outro `npm run server` aberto) |
| Erro de versão do Node ao rodar `npm run dev` | Node.js antigo | Instalar Node.js 20.19+ (LTS) |
| `npm run server` erro de JSON | `db.json` com vírgula ou aspas erradas | Corrigir o arquivo ou rodar `git checkout db.json` |
| "Tarefa não encontrada." | Id da URL não existe | Voltar para a lista e escolher uma tarefa existente |
| No PowerShell, "execução de scripts foi desabilitada" | Política do Windows bloqueia `npm.ps1` | Usar o Prompt de Comando (cmd) ou rodar `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |

## 22. Melhorias futuras

- Filtro por status e por prioridade.
- Busca por título.
- Data de vencimento das tarefas.
- API própria com banco de dados real no lugar do JSON Server.
- Marcar como concluída direto na lista, sem abrir a edição.
