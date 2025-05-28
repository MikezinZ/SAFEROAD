# 🛣️ SAFEROAD: Frontend da Aplicação

Bem-vindo ao frontend do projeto SAFEROAD! Esta é uma aplicação React moderna, construída com Vite e TypeScript, projetada para interagir com a API backend SAFEROAD. Ela oferece uma interface de usuário intuitiva para autenticação, gerenciamento de dados de usuários com operações CRUD e paginação.

Atualmente, este frontend está hospedado na **Vercel** e se comunica com o backend serverless na AWS.

---

## ✨ Funcionalidades Principais

O frontend SAFEROAD foi desenvolvido para proporcionar uma experiência de usuário completa e segura:

* **Autenticação Robusta:**
    * Formulários de Registro e Login com validação no lado do cliente.
    * Comunicação segura com os endpoints `/api/auth/register` e `/api/auth/login` do backend.
    * Armazenamento seguro de JWT (JSON Web Token) no *local storage* após login bem-sucedido.
    * Gerenciamento de estado de autenticação global via React Context API (`AuthContext.tsx`).
    * Funcionalidade de Logout clara e eficiente.
* **Proteção de Rotas:**
    * Páginas sensíveis (como o painel de gerenciamento) são acessíveis apenas para usuários autenticados.
    * Redirecionamento automático para usuários não autenticados ou para usuários já logados tentando acessar páginas de login/registro.
* **Gerenciamento de Usuários (CRUD) com Paginação:**
    * Interface para listar usuários com paginação, buscando dados do endpoint `/api/users`.
    * Formulários para criar novos usuários (enviando para `POST /api/users`).
    * Funcionalidade para editar dados de usuários existentes (enviando para `PUT /api/users/:id`).
    * Opção para deletar usuários (enviando para `DELETE /api/users/:id`), com confirmação e respeitando as permissões de *role* (administrador) definidas no backend.
* **Experiência do Usuário:**
    * Feedback visual claro com indicadores de carregamento e mensagens de sucesso/erro.
    * Navegação intuitiva através de uma barra de navegação responsiva ao estado de autenticação.
    * Layout limpo e organizado.

---

## 💻 Tecnologias Utilizadas no Frontend

* **Core:** React, TypeScript, Vite
* **Roteamento:** React Router DOM (`react-router-dom`)
* **Chamadas API:** Fetch API (nativa do navegador, utilizada dentro dos serviços)
* **Gerenciamento de Estado Global:** React Context API
* **Estilização:** CSS puro (com `index.css` para estilos globais e potencial para CSS Modules ou outras abordagens). *(Se você usou Tailwind de forma mais proeminente, mencione aqui).*
* **Linting:** ESLint com plugins para React e TypeScript.
* **Build Tool:** Vite

---

## 🛠️ Como Executar o Frontend Localmente

Siga os passos abaixo para configurar e executar o frontend em seu ambiente de desenvolvimento.

### 1. Pré-requisitos

* **Node.js:** Versão 18.x ou superior.
* **npm:** (geralmente incluído no Node.js).
* **Git:** Para clonar o repositório.

### 2. Instalação

```bash
# Navegue até a pasta do frontend a partir da raiz do projeto
cd frontend/

# Instale todas as dependências
npm install
3. Configuração das Variáveis de Ambiente
Crie um arquivo chamado .env na raiz do diretório frontend/. Este arquivo é usado para configurar a URL da API backend que o frontend irá consumir.

Conteúdo do .env para desenvolvimento local:

Snippet de código

VITE_API_URL=http://localhost:3000/api
Isso fará com que o frontend local se conecte ao seu backend rodando localmente na porta 3000.
Para conectar ao backend na nuvem (AWS API Gateway), você alteraria este valor para a Invoke URL do seu API Gateway (ex: https://SUA_API_ID.execute-api.SUA_REGIAO.amazonaws.com/SEU_STAGE/api).
4. Execução
Para desenvolvimento (com Hot Module Replacement):

Bash

npm run dev
A aplicação frontend estará disponível geralmente em http://localhost:5173 (o Vite informa a porta exata no terminal).

Para construir a versão de produção:

Bash

npm run build
Os arquivos otimizados para produção serão gerados na pasta dist/.

📁 Estrutura do Projeto Frontend
O frontend da aplicação SAFEROAD foi organizado de forma modular para facilitar a manutenção e o desenvolvimento:

frontend/
├── node_modules/       # 📦 Dependências do projeto
├── public/             # 🖼️ Arquivos estáticos públicos (ex: favicon.ico)
├── src/                # 📝 Código-fonte principal
│   ├── components/     # 🧩 Componentes React reutilizáveis (LoginForm, NavBar, CrudOperations, etc.)
│   ├── contexts/       # 🌐 Context API para estado global (AuthContext.tsx)
│   ├── pages/          # 📄 Componentes de nível de página (HomePage, LoginPage, etc.)
│   ├── services/       # 📡 Módulos para interação com a API backend (api.ts, auth.ts)
│   ├── App.tsx         # 🌳 Componente raiz da aplicação (define rotas)
│   ├── index.css       # 🎨 Estilos CSS globais
│   ├── main.tsx        # 🚀 Ponto de entrada da aplicação React
│   └── vite-env.d.ts   # 🏷️ Declarações de tipo para variáveis de ambiente Vite
├── .env                # 🔑 Arquivo para variáveis de ambiente (local, NÃO versionado)
├── .gitignore          # 🚫 Arquivos e pastas ignorados pelo Git
├── index.html          # 🚪 Ponto de entrada HTML para a aplicação Vite
├── package-lock.json   # 🔒 Lockfile de dependências
├── package.json        # 📄 Metadados do projeto, scripts e dependências
├── postcss.config.js   # 🖌️ Configuração do PostCSS (se usado, ex: com Tailwind)
├── tailwind.config.js  # 💨 Configuração do Tailwind CSS (se usado)
├── tsconfig.json       # ⚙️ Configurações do TypeScript
└── vite.config.ts      # ⚡ Configurações do Vite (build tool)
Essa estrutura visa promover a clareza, manutenibilidade e separação de responsabilidades, utilizando componentes reutilizáveis, uma camada de serviços dedicada para a lógica de API, e gerenciamento de estado global com Context API.

🔗 Integração com o Backend
A comunicação com o backend é gerenciada pelos módulos em src/services/:

api.ts: Contém a função apiRequest genérica que padroniza as chamadas fetch, incluindo automaticamente o token JWT nos cabeçalhos Authorization para rotas protegidas. Também exporta funções específicas para as operações CRUD de usuários (getUsers, createUser, etc.).
auth.ts: Lida com as chamadas específicas para os endpoints de autenticação (/api/auth/login, /api/auth/register) e gerencia o armazenamento/remoção do token JWT e dos dados do usuário no localStorage do navegador.
👨‍💻 Grupo SAFEROAD
Diego Ximenes
Lewi Gabriel
Lucas Maciel
Miguel Henrique