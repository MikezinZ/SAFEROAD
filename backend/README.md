# SAFEROAD: Visão Geral do Backend 🚀

Este documento detalha as funcionalidades, tecnologias e a estrutura de código do backend da aplicação SAFEROAD, responsável pela gestão de usuários e autenticação.

---

## Tecnologias Utilizadas no Backend 💻

O coração do nosso backend é construído com um conjunto de ferramentas e bibliotecas robustas, garantindo performance, segurança e fácil manutenção:

* **Node.js & Express**: A espinha dorsal da nossa API RESTful. O Node.js oferece um ambiente de execução JavaScript no servidor, enquanto o Express provê um framework minimalista e flexível para a construção de APIs e aplicações web.
* **Sequelize & PostgreSQL/SQLite**: Para o ambiente de desenvolvimento, usamos **SQLite**, um banco de dados leve baseado em arquivo (`database.sqlite`). A interação com o banco é gerenciada pelo **Sequelize**, um ORM (Object-Relational Mapper) baseado em Promises para Node.js. Ele simplifica a definição de modelos, migrações e consultas, estando preparado para **PostgreSQL** em produção (configurado para RDS, conforme `src/index.js`).
* **JWT (JSON Web Tokens)**: Implementado com a biblioteca `jsonwebtoken`, é crucial para uma **autenticação segura e *stateless***. Após o login, um token é gerado e enviado ao cliente, que o utiliza para autenticar requisições subsequentes a rotas protegidas.
* **Bcryptjs**: Essencial para a **segurança das senhas**. Esta biblioteca é utilizada para gerar um **hash seguro** das senhas dos usuários antes de armazená-las no banco de dados, empregando um *salt* para prevenir ataques de *rainbow table*. A verificação da senha durante o login compara o hash da senha fornecida com o hash armazenado.
* **CORS (Cross-Origin Resource Sharing)**: O *middleware* `cors` é configurado para permitir que aplicações frontend, hospedadas em origens diferentes (domínio, protocolo ou porta), façam requisições para a API do backend, contornando a *Same-Origin Policy* dos navegadores.
* **Swagger UI Express & Swagger-JSDoc**: Ferramentas que geram e servem uma **documentação interativa da API**. `swagger-jsdoc` lê anotações JSDoc nos arquivos de rotas (`src/routes/*.js`) para criar uma especificação OpenAPI. Já o `swagger-ui-express` apresenta essa especificação em uma interface web amigável, acessível em `/api-docs`.
* **Express-Validator**: *Middleware* para a **validação e sanitização dos dados** recebidos no corpo das requisições (request body). Ajuda a garantir que dados como e-mail e senha estejam no formato esperado antes de serem processados pelos *controllers*.
* **Dotenv**: Carrega **variáveis de ambiente** de um arquivo `.env` para `process.env`, permitindo isolar configurações sensíveis (como `JWT_SECRET`, `PORT` e credenciais de banco de dados) do código-fonte.
* **Serverless-http**: Um adaptador que possibilita que a aplicação Express seja executada em **ambientes *serverless***, como o AWS Lambda, encapsulando o aplicativo Express em um *handler* compatível.
* **(Potencialmente) Nodemon**: Embora não explicitamente detalhado nos trechos, `nodemon` é frequentemente usado em desenvolvimento Node.js (geralmente configurado no script `dev` do `package.json`) para **reiniciar automaticamente o servidor** a cada alteração nos arquivos, agilizando o ciclo de desenvolvimento.

---

## Principais Funcionalidades ✨

O backend da SAFEROAD foca em duas áreas cruciais: **Autenticação Segura** e **Gerenciamento Completo de Usuários (CRUD)**.

### 1. Autenticação de Usuários 🔑

A lógica de autenticação está concentrada em `src/controllers/authController.js`, `src/routes/authRoutes.js` e nos *middlewares* `src/middleware/auth.js` e `src/middleware/authorize.js`.

* **Registro de Novo Usuário (`POST /api/auth/register`)**:
    * Permite que novos usuários se cadastrem fornecendo `nome`, `email` e `senha`.
    * A rota usa `express-validator` para validar os dados de entrada.
    * Um *hook* `beforeCreate` no modelo Sequelize (`src/models/user.js`) intercepta a operação e utiliza `bcryptjs` para gerar um hash seguro da senha antes de salvá-la.
    * Após o registro bem-sucedido, um **JWT é gerado e retornado** ao usuário, junto com informações básicas do perfil criado.
* **Login de Usuário Existente (`POST /api/auth/login`)**:
    * Autentica usuários com base no `email` e `senha`.
    * O *controller* busca o usuário pelo e-mail e, se encontrado, utiliza o método `validatePassword` (definido no modelo `User`) que emprega `bcrypt.compare` para verificar a senha fornecida.
    * Se as credenciais forem válidas, um **novo JWT é gerado** (contendo ID, e-mail e *role* do usuário) e retornado, concedendo acesso às rotas protegidas da API.
* **Middleware de Autenticação (`src/middleware/auth.js`)**:
    * Atua como um **guardião para as rotas que exigem autenticação**.
    * Extrai o token JWT do cabeçalho `Authorization` (formato `Bearer`) de cada requisição.
    * Utiliza `jwt.verify` e a `JWT_SECRET` (carregada do `.env`) para validar o token.
    * Se o token for válido, as informações decodificadas do usuário (payload do token) são anexadas ao objeto `req` (como `req.user`).
    * Se o token estiver ausente ou for inválido, retorna um **erro 401 Unauthorized**, bloqueando o acesso.
* **Middleware de Autorização (`src/middleware/authorize.js`)**:
    * Complementa a autenticação, verificando se o usuário autenticado (`req.user.role`) possui a **permissão necessária** (*role*) para acessar um recurso ou executar uma ação específica.
    * Recebe um array de *roles* permitidas e retorna um **erro 403 Forbidden** se o usuário não tiver a *role* adequada.

---

### 2. Gerenciamento de Usuários (Operações CRUD) 📊

As operações de Criar, Ler, Atualizar e Excluir (CRUD) para a entidade de usuários são gerenciadas por `src/controllers/userController.js` e `src/routes/userRoutes.js`. Todas as rotas em `userRoutes.js` são **protegidas pelo `authMiddleware`**, garantindo que apenas usuários autenticados possam interagir com elas.

* **Listar Todos os Usuários (`GET /api/users`)**:
    * Retorna uma **lista paginada** de todos os usuários cadastrados.
    * Utiliza `User.findAndCountAll` do Sequelize com `limit` e `offset` (calculados a partir dos parâmetros de consulta `page` e `limit`).
    * Por segurança e privacidade, apenas os campos `id`, `nome`, `email` e `role` são retornados, junto com informações de paginação (total de itens, total de páginas, página atual).
* **Obter Usuário por ID (`GET /api/users/:id`)**:
    * Busca e retorna os detalhes de um usuário específico, identificado pelo `id` fornecido na URL.
    * Utiliza `User.findByPk` e retorna apenas os atributos `id`, `nome` e `email`.
    * Retorna **404 Not Found** se nenhum usuário com o ID especificado for encontrado.
* **Criar Novo Usuário (`POST /api/users`)**:
    * Permite a criação de um novo usuário através de uma requisição `POST`.
    * Esta rota pode ser usada para criação direta (potencialmente por administradores, dependendo da aplicação do *middleware* `authorize`).
    * Utiliza `User.create` e retorna os dados básicos do usuário criado (`id`, `nome`, `email`) com status **201 Created**.
* **Atualizar Usuário (`PUT /api/users/:id`)**:
    * Permite modificar os dados de um usuário existente, identificado pelo `id`.
    * O *controller* primeiro busca o usuário com `User.findByPk`.
    * Se encontrado, chama o método `user.update(req.body)` para aplicar as alterações.
    * Retorna os dados atualizados do usuário.
* **Excluir Usuário (`DELETE /api/users/:id`)**:
    * Remove um usuário do banco de dados.
    * Busca o usuário pelo `id` e, se encontrado, chama `user.destroy()`.
    * Retorna uma resposta **204 No Content** em caso de sucesso. Esta rota exige que o usuário autenticado tenha a *role* de `admin` (`authorize(['admin'])`).

---

## Gerenciamento do Banco de Dados com Sequelize 🗄️

A interação com o banco de dados é totalmente abstraída e gerenciada pelo Sequelize ORM.

* **Modelos (`src/models/`)**:
    * `user.js`: Define o modelo `User` com seus atributos (`id`, `nome`, `email`, `senha`, `role`), tipos de dados (`DataTypes`), validações (`isEmail`) e restrições (`allowNull`, `unique`). Inclui o *hook* `beforeCreate` para o *hashing* da senha com `bcryptjs` e o método de instância `validatePassword` para a comparação de senhas.
    * `index.js`: Centraliza a importação da configuração do Sequelize (`../config/database`) e dos modelos definidos (apenas `User` neste caso). Exporta a instância do `sequelize` e os modelos, facilitando o acesso em outras partes da aplicação (ex: `const { User } = require('../models');`).
* **Configuração (`src/config/database.js`)**:
    * Configura a instância do Sequelize, especificando o dialeto do banco de dados (`postgres` para produção, `sqlite` para desenvolvimento), o local de armazenamento do arquivo (`../database.sqlite` para SQLite) e outras opções de conexão necessárias (carregadas de variáveis de ambiente para produção, como `DATABASE_URL`).
* **Sincronização (`src/index.js`)**:
    * A linha `sequelize.sync()` no arquivo principal garante que as tabelas no banco de dados correspondam aos modelos definidos no Sequelize. Ao iniciar a aplicação, o Sequelize verifica se as tabelas existem e as cria ou atualiza conforme necessário. Isso é útil para desenvolvimento, mas em produção, geralmente são preferidas ferramentas de migração mais controladas.

---

## Configuração do Servidor e Utilitários ⚙️

O ponto de entrada e a configuração geral do servidor são gerenciados principalmente em `src/index.js`.

* **Arquivo Principal (`src/index.js`)**:
    * Inicializa a aplicação Express (`const app = express();`).
    * Carrega variáveis de ambiente com `require('dotenv').config();`.
    * Configura *middlewares* essenciais: `cors()` para habilitar requisições *cross-origin* e `express.json()` para *parsear* corpos de requisição JSON.
    * Configura o **Swagger UI**, definindo as opções (`swaggerOptions`) que especificam a versão do OpenAPI, informações da API, servidores e esquemas de segurança (*Bearer Auth* para JWT), e indicando onde encontrar as anotações (`apis: ['./src/routes/*.js']`). Monta a interface do Swagger em `/api-docs`.
    * Registra as rotas da aplicação, montando `authRoutes` em `/api/auth` e `userRoutes` em `/api/users`.
    * Define um **endpoint de *health check*** (`GET /health`) que retorna um status `OK` se o backend estiver operacional.
    * Implementa um **middleware de tratamento de erro global** que captura exceções não tratadas, *loga* o erro e retorna uma resposta `500 Internal Server Error` genérica.
    * Chama `sequelize.sync()` para sincronizar os modelos com o banco de dados e, em seguida, inicia o servidor Express (`app.listen`) na porta definida por `process.env.PORT` (ou `3000` como padrão), mas apenas se não estiver em ambiente de produção Lambda (`process.env.NODE_ENV !== 'production_lambda'`).
    * Exporta o *handler* do `serverless-http` para compatibilidade com ambientes *serverless*.
* **Variáveis de Ambiente (`.env`)**:
    * Arquivo crucial (não versionado no Git) que armazena **configurações específicas do ambiente**, como `JWT_SECRET` (a chave secreta para assinar e verificar tokens JWT), `PORT` (a porta onde o servidor escutará) e `DATABASE_URL` para a conexão com o banco de dados.
* **Testes (`src/tests/auth.tests.js`)**:
    * O arquivo demonstra a presença de **testes automatizados** (provavelmente usando Jest e Supertest). Testes são fundamentais para garantir a correção e a estabilidade da API, especialmente para funcionalidades críticas como autenticação.

---

## Estrutura do Projeto Backend 📁

O backend adota uma estrutura de diretórios modular e organizada, facilitando a navegação, manutenção e escalabilidade:

```
backend/
├── node_modules/       # 📦 Dependências instaladas via npm/yarn
├── src/
│   ├── config/         # ⚙️ Arquivos de configuração (ex: database.js)
│   ├── controllers/    # 🎯 Lógica de negócio e resposta às requisições (ex: authController.js, userController.js)
│   ├── middleware/     # 🚦 Funções intermediárias (ex: auth.js, authorize.js)
│   ├── models/         # 📊 Definições dos modelos Sequelize (ex: user.js, index.js)
│   ├── routes/         # 🛣️ Definição das rotas da API (ex: authRoutes.js, userRoutes.js)
│   ├── tests/          # 🧪 Suíte de testes automatizados (ex: auth.tests.js)
│   └── index.js        # 🚀 Ponto de entrada da aplicação Express
├── .env                # 🔑 Arquivo para variáveis de ambiente (não versionado)
├── database.sqlite     # 💾 Arquivo do banco de dados SQLite (desenvolvimento)
├── package-lock.json   # 🔒 Lockfile de dependências
├── package.json        # 📄 Metadados do projeto, scripts e dependências
└── README.md           # 📖 README geral do projeto (ou este arquivo se for o README do backend)
```

Esta estrutura separa claramente as responsabilidades (configuração, controle, modelos, rotas, *middlewares*, testes), aderindo a princípios como o MVC (*Model-View-Controller*) e facilitando o desenvolvimento e a colaboração em equipe.


**GRUPO SAFEROAD**
**Integrantes:**
* Diego Ximenes
* Lewi Gabriel
* Lucas Maciel
* Miguel Henrique
