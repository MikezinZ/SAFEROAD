# 🛣️ SAFEROAD Project

Bem-vindo ao projeto SAFEROAD! Este repositório contém uma aplicação full-stack completa, com frontend em React (Vite) e backend em Node.js/Express, focada na gestão de usuários, autenticação e funcionalidades CRUD, com uma infraestrutura de backend e banco de dados migrada para a nuvem AWS.

O projeto demonstra a construção de uma API robusta seguindo o padrão MVC, com autenticação segura via JWT, autorização baseada em roles, validação de dados, documentação interativa com Swagger, e integração com banco de dados PostgreSQL. A aplicação está hospedada com o frontend na Vercel e o backend serverless na AWS (API Gateway + Lambda + RDS).

---

## 🚀 Visão Geral da Arquitetura Online

* **Frontend:** Aplicação React (construída com Vite) hospedada na **Vercel**.
* **Backend API:** API Node.js/Express rodando de forma serverless no **AWS Lambda**, exposta publicamente através do **Amazon API Gateway**.
* **Banco de Dados:** Instância **PostgreSQL** gerenciada no **Amazon RDS**, localizada em uma subnet privada dentro de uma VPC customizada na AWS para segurança.
* **Rede AWS:** **Amazon VPC** com subnets públicas e privadas, Internet Gateway, NAT Gateway, e Security Groups para controle fino de tráfego.
* **Segurança AWS:** **AWS IAM Roles** para permissões granulares da função Lambda.

---

## ✨ Funcionalidades Principais

* **Autenticação JWT:** 🔒 Sistema seguro de autenticação baseado em JSON Web Tokens para proteger endpoints.
* **Autorização Baseada em Roles:** 🛡️ Controle de acesso diferenciado para rotas sensíveis (ex: apenas usuários com role 'admin' podem deletar outros usuários).
* **CRUD Completo de Usuários:** 🧑‍💻 Operações de Criação, Leitura, Atualização e Exclusão (CRUD) para a entidade de usuários.
* **Paginação:** 📖 Na listagem de usuários para otimização de performance e melhor experiência do usuário.
* **Validação de Dados:** ✅ Validação rigorosa dos dados de entrada usando `express-validator` para garantir integridade e consistência.
* **Documentação Swagger/OpenAPI:** 📄 Documentação interativa da API gerada com Swagger UI, facilitando o entendimento e teste dos endpoints.
* **Testes Automatizados:** 🧪 Suíte de testes (exemplo com Jest/Supertest) para funcionalidades de autenticação.
* **Banco de Dados com Sequelize:** 🗄️ ORM Sequelize para interagir com o banco de dados PostgreSQL (configurado para AWS RDS em produção/nuvem e com flexibilidade para SQLite/Postgres local em desenvolvimento).

---

## 💻 Tecnologias Utilizadas

* **Frontend:**
    * React
    * Vite
    * TypeScript
    * Axios (para chamadas API)
    * React Router DOM
* **Backend:**
    * Node.js
    * Express.js
    * Sequelize (ORM)
    * `pg` e `pg-hstore` (Drivers PostgreSQL)
    * JSON Web Token (JWT) para autenticação
    * `bcryptjs` para hashing de senhas
    * `express-validator` para validação de dados
    * `serverless-http` para compatibilidade com AWS Lambda
    * `cors` para gerenciamento de Cross-Origin Resource Sharing
    * `swagger-jsdoc` e `swagger-ui-express` para documentação da API
* **Banco de Dados:**
    * PostgreSQL (no AWS RDS)
    * SQLite (para desenvolvimento local opcional)
* **Cloud & Deploy:**
    * **AWS:**
        * Lambda (para backend serverless)
        * API Gateway (para expor a API)
        * RDS (para banco de dados PostgreSQL)
        * VPC (Virtual Private Cloud), Subnets, Security Groups, IAM Roles
        * S3 (para armazenamento do pacote de deploy da Lambda)
    * **Vercel:** Para deploy do frontend.
* **Outras Ferramentas:**
    * Postman (para testes de API)
    * Git & GitHub (para versionamento de código)
    * Nodemon (para desenvolvimento backend local)
    * Dotenv (para gerenciamento de variáveis de ambiente)

---

## ☁️ Arquitetura na Nuvem (AWS) - Resumo

O backend da aplicação e o banco de dados foram migrados para a AWS, adotando a seguinte arquitetura principal:
1.  **VPC Customizada:** Uma rede virtual privada (`saferoad-vpc`) foi criada para isolar os recursos.
2.  **Subnets:** Foram configuradas subnets públicas e privadas em duas Zonas de Disponibilidade para alta disponibilidade e segurança.
    * O NAT Gateway (em subnet pública) permite acesso de saída à internet para recursos em subnets privadas.
    * O Internet Gateway permite acesso de/para as subnets públicas.
3.  **Amazon RDS para PostgreSQL:** A instância `saferoad-db-instance` reside em subnets privadas, acessível apenas de dentro da VPC através de seu Security Group (`saferoad-db-sg`).
4.  **AWS Lambda:** A função `saferoad-backend-api` executa o código Node.js/Express, residindo também em subnets privadas e usando um Security Group (`saferoad-lambda-sg`). A comunicação com o RDS é permitida pela configuração dos Security Groups. Uma IAM Role (`SaferoadLambdaExecutionRole`) concede as permissões necessárias.
5.  **Amazon API Gateway:** O serviço `SaferoadAPI` atua como o ponto de entrada HTTP(S) para a função Lambda, utilizando integração proxy para encaminhar as requisições. Ele fornece a URL pública que o frontend consome.
6.  **Segurança:** A comunicação entre Lambda e RDS é controlada por Security Groups. O acesso externo é gerenciado pelo API Gateway.

*(Para mais detalhes, consulte o diagrama da arquitetura e a documentação técnica do projeto).*

---

## 🚀 Acesso à Aplicação Online

* **Frontend (Vercel):** [`https://saferoad-lime.vercel.app/`](https://saferoad-lime.vercel.app/)
* **Backend API (AWS API Gateway - Ponto de Entrada):** A URL base da API utilizada pelo frontend é configurada via variável de ambiente. A Invoke URL do estágio `dev` do API Gateway é: `COLE_SUA_API_GATEWAY_INVOKE_URL_COMPLETA_AQUI` (ex: `https://idapi.execute-api.regiao.amazonaws.com/dev`)

---

## 🛠️ Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e executar o frontend e o backend em seu ambiente de desenvolvimento.

### Pré-requisitos
* **Node.js:** Versão 18.x ou superior.
* **npm:** (geralmente vem com o Node.js).
* **Git:** Para clonar o repositório.
* (Opcional para backend local com PostgreSQL) Uma instância PostgreSQL rodando localmente ou acessível.

### Backend

1.  **Clone o Repositório (se ainda não o fez):**
    ```bash
    git clone [https://github.com/MikezinZ/SAFEROAD](https://github.com/MikezinZ/SAFEROAD)
    cd SAFEROAD/backend
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo chamado `.env` na raiz do diretório `backend/`. Adicione as seguintes variáveis:
    ```env
    JWT_SECRET=uma_chave_secreta_bem_forte_para_desenvolvimento
    PORT=3000

    # Opção 1: Para usar o banco de dados AWS RDS também para desenvolvimento local
    # (Certifique-se que o Security Group do RDS permite seu IP)
    DATABASE_URL="postgresql://USER:PASSWORD@RDS_ENDPOINT:5432/DB_NAME"

    # Opção 2: Para usar um banco PostgreSQL local (exige instalação e configuração do Postgres)
    # DATABASE_URL="postgresql://SEU_USER_LOCAL:SUA_SENHA_LOCAL@localhost:5432/SEU_DB_LOCAL"

    # Opção 3: Para voltar a usar SQLite localmente (requereria pequenas mudanças no config/database.js para suportar dinamicamente)
    # Por padrão, o config/database.js está configurado para PostgreSQL devido à DATABASE_URL.
    ```
    *Substitua os valores de placeholder pelos seus dados reais.*

4.  **Execute em Modo de Desenvolvimento:**
    Este comando utiliza o `nodemon` para reiniciar o servidor automaticamente após alterações no código.
    ```bash
    npm run dev
    ```
    O servidor estará disponível em `http://localhost:3000` (ou a porta definida no `.env`).

5.  **Execute em Modo de Produção (Localmente):**
    ```bash
    npm start
    ```

6.  **Documentação da API (Swagger):**
    Com o servidor backend local rodando, acesse: `http://localhost:3000/api-docs`

### Frontend

1.  **Navegue até a Pasta do Frontend:**
    A partir da raiz do projeto `SAFEROAD/`:
    ```bash
    cd frontend
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo chamado `.env` na raiz do diretório `frontend/`. Adicione a seguinte variável para apontar para o seu backend local:
    ```env
    VITE_API_URL=http://localhost:3000/api
    ```

4.  **Execute em Modo de Desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação frontend estará disponível geralmente em `http://localhost:5173`.

---

## 🚦 Endpoints da API (Resumo)

A URL base para as rotas abaixo é `/api`. Quando acessando a API na AWS, a URL completa será `SUA_API_GATEWAY_INVOKE_URL/api/...`.

#### Autenticação (`/auth`)
* `POST /auth/register`: Registra um novo usuário (`nome`, `email`, `senha`).
* `POST /auth/login`: Autentica um usuário (`email`, `senha`), retorna JWT.

#### Usuários (`/users`) - Requer Autenticação JWT (Header: `Authorization: Bearer <TOKEN>`)
* `GET /users`: Lista usuários com paginação (ex: `?page=1&limit=10`).
* `GET /users/:id`: Detalhes de um usuário específico.
* `POST /users`: Cria um novo usuário (`nome`, `email`, `senha`). Protegido por `authMiddleware` e validação.
* `PUT /users/:id`: Atualiza um usuário. Protegido por `authMiddleware`.
* `DELETE /users/:id`: Deleta um usuário. Protegido por `authMiddleware` e requer `role` de **admin** (`authorize(['admin'])`).

---

## 📁 Estrutura do Projeto (Backend)

A estrutura de diretórios do backend foi organizada para promover a separabilidade de conceitos e facilitar a manutenção, seguindo o padrão MVC (Model-View-Controller):
OK! Com a aplicação toda funcionando na nuvem e os outros entregáveis encaminhados, atualizar o README.md é um passo excelente para consolidar tudo e apresentar seu projeto de forma profissional. Um bom README é o cartão de visitas do seu repositório.

Com base no seu README atual e em tudo que fizemos, preparei uma versão atualizada e mais completa para você. Ele agora reflete a arquitetura na AWS, as novas funcionalidades e como rodar tanto o backend quanto o frontend localmente.

Copie e cole o conteúdo abaixo no seu arquivo README.md principal (o que está na raiz do projeto SAFEROAD/).

Markdown

# 🛣️ SAFEROAD Project

Bem-vindo ao projeto SAFEROAD! Este repositório contém uma aplicação full-stack completa, com frontend em React (Vite) e backend em Node.js/Express, focada na gestão de usuários, autenticação e funcionalidades CRUD, com uma infraestrutura de backend e banco de dados migrada para a nuvem AWS.

O projeto demonstra a construção de uma API robusta seguindo o padrão MVC, com autenticação segura via JWT, autorização baseada em roles, validação de dados, documentação interativa com Swagger, e integração com banco de dados PostgreSQL. A aplicação está hospedada com o frontend na Vercel e o backend serverless na AWS (API Gateway + Lambda + RDS).

---

## 🚀 Visão Geral da Arquitetura Online

* **Frontend:** Aplicação React (construída com Vite) hospedada na **Vercel**.
* **Backend API:** API Node.js/Express rodando de forma serverless no **AWS Lambda**, exposta publicamente através do **Amazon API Gateway**.
* **Banco de Dados:** Instância **PostgreSQL** gerenciada no **Amazon RDS**, localizada em uma subnet privada dentro de uma VPC customizada na AWS para segurança.
* **Rede AWS:** **Amazon VPC** com subnets públicas e privadas, Internet Gateway, NAT Gateway, e Security Groups para controle fino de tráfego.
* **Segurança AWS:** **AWS IAM Roles** para permissões granulares da função Lambda.

---

## ✨ Funcionalidades Principais

* **Autenticação JWT:** 🔒 Sistema seguro de autenticação baseado em JSON Web Tokens para proteger endpoints.
* **Autorização Baseada em Roles:** 🛡️ Controle de acesso diferenciado para rotas sensíveis (ex: apenas usuários com role 'admin' podem deletar outros usuários).
* **CRUD Completo de Usuários:** 🧑‍💻 Operações de Criação, Leitura, Atualização e Exclusão (CRUD) para a entidade de usuários.
* **Paginação:** 📖 Na listagem de usuários para otimização de performance e melhor experiência do usuário.
* **Validação de Dados:** ✅ Validação rigorosa dos dados de entrada usando `express-validator` para garantir integridade e consistência.
* **Documentação Swagger/OpenAPI:** 📄 Documentação interativa da API gerada com Swagger UI, facilitando o entendimento e teste dos endpoints.
* **Testes Automatizados:** 🧪 Suíte de testes (exemplo com Jest/Supertest) para funcionalidades de autenticação.
* **Banco de Dados com Sequelize:** 🗄️ ORM Sequelize para interagir com o banco de dados PostgreSQL (configurado para AWS RDS em produção/nuvem e com flexibilidade para SQLite/Postgres local em desenvolvimento).

---

## 💻 Tecnologias Utilizadas

* **Frontend:**
    * React
    * Vite
    * TypeScript
    * Axios (para chamadas API)
    * React Router DOM
* **Backend:**
    * Node.js
    * Express.js
    * Sequelize (ORM)
    * `pg` e `pg-hstore` (Drivers PostgreSQL)
    * JSON Web Token (JWT) para autenticação
    * `bcryptjs` para hashing de senhas
    * `express-validator` para validação de dados
    * `serverless-http` para compatibilidade com AWS Lambda
    * `cors` para gerenciamento de Cross-Origin Resource Sharing
    * `swagger-jsdoc` e `swagger-ui-express` para documentação da API
* **Banco de Dados:**
    * PostgreSQL (no AWS RDS)
    * SQLite (para desenvolvimento local opcional)
* **Cloud & Deploy:**
    * **AWS:**
        * Lambda (para backend serverless)
        * API Gateway (para expor a API)
        * RDS (para banco de dados PostgreSQL)
        * VPC (Virtual Private Cloud), Subnets, Security Groups, IAM Roles
        * S3 (para armazenamento do pacote de deploy da Lambda)
    * **Vercel:** Para deploy do frontend.
* **Outras Ferramentas:**
    * Postman (para testes de API)
    * Git & GitHub (para versionamento de código)
    * Nodemon (para desenvolvimento backend local)
    * Dotenv (para gerenciamento de variáveis de ambiente)

---

## ☁️ Arquitetura na Nuvem (AWS) - Resumo

O backend da aplicação e o banco de dados foram migrados para a AWS, adotando a seguinte arquitetura principal:
1.  **VPC Customizada:** Uma rede virtual privada (`saferoad-vpc`) foi criada para isolar os recursos.
2.  **Subnets:** Foram configuradas subnets públicas e privadas em duas Zonas de Disponibilidade para alta disponibilidade e segurança.
    * O NAT Gateway (em subnet pública) permite acesso de saída à internet para recursos em subnets privadas.
    * O Internet Gateway permite acesso de/para as subnets públicas.
3.  **Amazon RDS para PostgreSQL:** A instância `saferoad-db-instance` reside em subnets privadas, acessível apenas de dentro da VPC através de seu Security Group (`saferoad-db-sg`).
4.  **AWS Lambda:** A função `saferoad-backend-api` executa o código Node.js/Express, residindo também em subnets privadas e usando um Security Group (`saferoad-lambda-sg`). A comunicação com o RDS é permitida pela configuração dos Security Groups. Uma IAM Role (`SaferoadLambdaExecutionRole`) concede as permissões necessárias.
5.  **Amazon API Gateway:** O serviço `SaferoadAPI` atua como o ponto de entrada HTTP(S) para a função Lambda, utilizando integração proxy para encaminhar as requisições. Ele fornece a URL pública que o frontend consome.
6.  **Segurança:** A comunicação entre Lambda e RDS é controlada por Security Groups. O acesso externo é gerenciado pelo API Gateway.

*(Para mais detalhes, consulte o diagrama da arquitetura e a documentação técnica do projeto).*

---

## 🚀 Acesso à Aplicação Online

* **Frontend (Vercel):** [`https://saferoad-lime.vercel.app/`](https://saferoad-lime.vercel.app/)
* **Backend API (AWS API Gateway - Ponto de Entrada):** A URL base da API utilizada pelo frontend é configurada via variável de ambiente. A Invoke URL do estágio `dev` do API Gateway é: `COLE_SUA_API_GATEWAY_INVOKE_URL_COMPLETA_AQUI` (ex: `https://idapi.execute-api.regiao.amazonaws.com/dev`)

---

## 🛠️ Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e executar o frontend e o backend em seu ambiente de desenvolvimento.

### Pré-requisitos
* **Node.js:** Versão 18.x ou superior.
* **npm:** (geralmente vem com o Node.js).
* **Git:** Para clonar o repositório.
* (Opcional para backend local com PostgreSQL) Uma instância PostgreSQL rodando localmente ou acessível.

### Backend

1.  **Clone o Repositório (se ainda não o fez):**
    ```bash
    git clone [https://github.com/MikezinZ/SAFEROAD](https://github.com/MikezinZ/SAFEROAD)
    cd SAFEROAD/backend
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo chamado `.env` na raiz do diretório `backend/`. Adicione as seguintes variáveis:
    ```env
    JWT_SECRET=uma_chave_secreta_bem_forte_para_desenvolvimento
    PORT=3000

    # Opção 1: Para usar o banco de dados AWS RDS também para desenvolvimento local
    # (Certifique-se que o Security Group do RDS permite seu IP)
    DATABASE_URL="postgresql://USER:PASSWORD@RDS_ENDPOINT:5432/DB_NAME"

    # Opção 2: Para usar um banco PostgreSQL local (exige instalação e configuração do Postgres)
    # DATABASE_URL="postgresql://SEU_USER_LOCAL:SUA_SENHA_LOCAL@localhost:5432/SEU_DB_LOCAL"

    # Opção 3: Para voltar a usar SQLite localmente (requereria pequenas mudanças no config/database.js para suportar dinamicamente)
    # Por padrão, o config/database.js está configurado para PostgreSQL devido à DATABASE_URL.
    ```
    *Substitua os valores de placeholder pelos seus dados reais.*

4.  **Execute em Modo de Desenvolvimento:**
    Este comando utiliza o `nodemon` para reiniciar o servidor automaticamente após alterações no código.
    ```bash
    npm run dev
    ```
    O servidor estará disponível em `http://localhost:3000` (ou a porta definida no `.env`).

5.  **Execute em Modo de Produção (Localmente):**
    ```bash
    npm start
    ```

6.  **Documentação da API (Swagger):**
    Com o servidor backend local rodando, acesse: `http://localhost:3000/api-docs`

### Frontend

1.  **Navegue até a Pasta do Frontend:**
    A partir da raiz do projeto `SAFEROAD/`:
    ```bash
    cd frontend
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo chamado `.env` na raiz do diretório `frontend/`. Adicione a seguinte variável para apontar para o seu backend local:
    ```env
    VITE_API_URL=http://localhost:3000/api
    ```

4.  **Execute em Modo de Desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação frontend estará disponível geralmente em `http://localhost:5173`.

---

## 🚦 Endpoints da API (Resumo)

A URL base para as rotas abaixo é `/api`. Quando acessando a API na AWS, a URL completa será `SUA_API_GATEWAY_INVOKE_URL/api/...`.

#### Autenticação (`/auth`)
* `POST /auth/register`: Registra um novo usuário (`nome`, `email`, `senha`).
* `POST /auth/login`: Autentica um usuário (`email`, `senha`), retorna JWT.

#### Usuários (`/users`) - Requer Autenticação JWT (Header: `Authorization: Bearer <TOKEN>`)
* `GET /users`: Lista usuários com paginação (ex: `?page=1&limit=10`).
* `GET /users/:id`: Detalhes de um usuário específico.
* `POST /users`: Cria um novo usuário (`nome`, `email`, `senha`). Protegido por `authMiddleware` e validação.
* `PUT /users/:id`: Atualiza um usuário. Protegido por `authMiddleware`.
* `DELETE /users/:id`: Deleta um usuário. Protegido por `authMiddleware` e requer `role` de **admin** (`authorize(['admin'])`).

---

## 📁 Estrutura do Projeto (Backend)

A estrutura de diretórios do backend foi organizada para promover a separabilidade de conceitos e facilitar a manutenção, seguindo o padrão MVC (Model-View-Controller):

backend/
├── node_modules/       # Dependências do projeto
├── src/                # Código-fonte da aplicação
│   ├── config/         # Configurações (ex: database.js)
│   ├── controllers/    # Lógica de controle (authController.js, userController.js)
│   ├── middleware/     # Middlewares (auth.js, authorize.js)
│   ├── models/         # Modelos Sequelize (user.js, index.js)
│   ├── routes/         # Definição das rotas API (authRoutes.js, userRoutes.js)
│   ├── tests/          # Arquivos de testes (auth.tests.js)
│   └── index.js        # Ponto de entrada principal do backend (Express app, serverless handler)
├── .env                # Arquivo de variáveis de ambiente (local, NÃO versionado)
├── package-lock.json   # Lockfile de dependências
├── package.json        # Metadados do projeto e dependências
└── README.md           # Documentação principal do backend (se houver um específico)

## 📂 Estrutura do Projeto (Frontend)

O frontend da aplicação SAFEROAD foi desenvolvido com React (utilizando Vite e TypeScript) e segue uma organização modular para facilitar a manutenção e o desenvolvimento de novas funcionalidades:

frontend/
├── node_modules/       # Dependências do projeto frontend
├── public/             # Arquivos estáticos públicos (ex: favicon, imagens)
├── src/                # Código-fonte principal do frontend
│   ├── assets/         # Imagens, fontes e outros ativos estáticos importados pelos componentes
│   ├── components/     # Componentes React reutilizáveis (ex: formulários, navbar, elementos de UI)
│   │   ├── CrudOperations.tsx
│   │   ├── LoginForm.tsx
│   │   ├── NavBar.tsx
│   │   └── RegisterForm.tsx
│   ├── contexts/       # Context API do React para gerenciamento de estado global
│   │   └── AuthContext.tsx # Contexto para autenticação do usuário
│   ├── pages/          # Componentes de nível de página (representam as diferentes telas da aplicação)
│   │   ├── HomePage.tsx
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── services/       # Módulos para interação com a API backend
│   │   ├── api.ts      # Configuração base do Axios/fetch e chamadas CRUD genéricas
│   │   └── auth.ts     # Funções específicas para autenticação (login, registro)
│   ├── styles/         # Arquivos de estilização globais ou específicos (se não usar CSS-in-JS ou similar)
│   ├── App.tsx         # Componente raiz da aplicação, onde as rotas são definidas
│   ├── index.css       # Estilos CSS globais
│   ├── main.tsx        # Ponto de entrada da aplicação React (renderiza o App.tsx)
│   └── vite-env.d.ts   # Declarações de tipo para variáveis de ambiente do Vite
├── .env                # Arquivo de variáveis de ambiente para o frontend (ex: VITE_API_URL) - LOCAL
├── .gitignore          # Arquivos e pastas ignorados pelo Git
├── index.html          # Ponto de entrada HTML para a aplicação Vite
├── package.json        # Metadados do projeto frontend e lista de dependências
├── package-lock.json   # Lockfile de dependências npm
├── tsconfig.json       # Configurações do TypeScript
└── vite.config.ts      # Configurações do Vite (build tool)

Markdown

### Organização e Processo de Desenvolvimento do Frontend

O frontend da SAFEROAD foi estruturado com foco na **clareza, manutenibilidade e separação de responsabilidades**, utilizando as melhores práticas do ecossistema React:

* **Arquitetura Baseada em Componentes:** A interface do usuário é construída a partir de componentes React reutilizáveis (`src/components/`), promovendo a consistência visual e facilitando a manutenção. Cada componente encapsula sua própria lógica e apresentação.
* **Gerenciamento de Rotas:** A navegação entre as diferentes seções da aplicação é gerenciada pelo `react-router-dom`, com componentes de página dedicados (`src/pages/`) representando cada tela principal.
* **Camada de Serviços:** Toda a comunicação com a API backend é abstraída em uma camada de serviços (`src/services/`). Isso desacopla a lógica de chamada de API dos componentes da interface, tornando o código mais organizado e fácil de testar ou modificar (ex: `api.ts` para chamadas CRUD e `auth.ts` para autenticação).
* **Gerenciamento de Estado Global:** Para o estado de autenticação do usuário e informações relacionadas, foi utilizado o Context API do React (`src/contexts/AuthContext.tsx`), permitindo que diferentes componentes acessem e modifiquem o estado de autenticação de forma centralizada e eficiente.
* **Tipagem com TypeScript:** O uso de TypeScript em todo o frontend garante maior robustez, previne erros comuns em tempo de desenvolvimento e melhora a legibilidade e o autocompletar do código.
* **Build Tool com Vite:** O Vite foi escolhido como ferramenta de build e servidor de desenvolvimento pela sua rapidez e configuração simplificada, otimizando o fluxo de trabalho do desenvolvedor.
* **Estilização:** A estilização principal é gerenciada através de CSS global (`index.css`) e estilos que podem ser específicos por componente ou página, buscando uma interface funcional e limpa. *(Se você usou Tailwind de forma mais extensiva, pode mencionar aqui).*

Essa abordagem visa criar um frontend que não apenas funcione bem, mas que também seja fácil de entender, escalar e dar manutenção no futuro.


---


## 🧪 Testes Automatizados

O projeto inclui exemplos de testes automatizados para a autenticação (em `backend/src/tests/auth.test.js`). Para executar a suíte de testes (atualmente configurada para rodar contra um ambiente que usa o app Express diretamente):

No diretório `backend/`:
```bash
npm test
(Nota: Os testes podem precisar de um ambiente de banco de dados de teste configurado ou mocks para rodar isoladamente).

🤝 Contribuição
Contribuições para o projeto SAFEROAD são muito bem-vindas! Se você deseja contribuir com novas funcionalidades, melhorias ou correções de bugs, por favor, siga estes passos:

Faça um fork do repositório.
Crie uma nova branch (git checkout -b feature/MinhaNovaFeature).
Faça commit das suas alterações (git commit -m 'feat: Adiciona funcionalidade X').
Faça push para a sua branch (git push origin feature/MinhaNovaFeature).
Abra um Pull Request.
📄 Licença
Este projeto é distribuído sob a licença MIT.

📧 Contato e Integrantes
Equipe SafeRoad: projetosaferoad@gmail.com
Link do Projeto no GitHub: https://github.com/MikezinZ/SAFEROAD
Integrantes do Projeto
Miguel Henrique
Diego Ximenes
Lewi Gabriel
Lucas Maciel
