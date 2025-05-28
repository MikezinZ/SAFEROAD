## Funcionalidades Detalhadas do Frontend SAFEROAD 🚀

O frontend do SAFEROAD é uma **aplicação React construída com TypeScript**, que oferece uma interface de usuário intuitiva para autenticação e operações CRUD (Criar, Ler, Atualizar, Deletar) de dados de usuários. Ele foi cuidadosamente projetado para ser responsivo e proporcionar um feedback claro ao usuário.

---

### 1. Autenticação de Usuários 🔐

Tudo começa com a segurança! A autenticação garante que apenas usuários permitidos acessem os recursos protegidos.

* **Registro de Usuários** 📝 (`RegisterForm.tsx`, `RegisterPage.tsx`, `auth.ts`):
    * Permite que novos usuários criem uma conta com **nome de usuário, e-mail e senha**.
    * Possui **validação no lado do cliente** ✅ para garantir que o e-mail seja válido, a senha tenha no mínimo 6 caracteres e que as senhas digitadas combinem.
    * Envia os dados para o backend via `POST` para o endpoint `/api/auth/register`.
    * Após o sucesso, o usuário é **redirecionado para a página de login** ➡️.
* **Login de Usuários** 🔑 (`LoginForm.tsx`, `LoginPage.tsx`, `auth.ts`):
    * Permite que usuários existentes se autentiquem usando seu **e-mail e senha**.
    * Também tem **validação no lado do cliente** ✅ para e-mail e senha.
    * Envia as credenciais para o backend via `POST` para o endpoint `/api/auth/login`.
    * Se o login for bem-sucedido, o **JWT (JSON Web Token) é armazenado no *local storage*** 💾, junto com as informações básicas do usuário.
    * Os usuários são então **redirecionados para a página inicial** 🏠.
* **Contexto de Autenticação** 🌐 (`AuthContext.tsx`):
    * Gerencia o **estado de autenticação globalmente** na aplicação.
    * Oferece funções para `login`, `register` e `logout`.
    * Controla os **dados do usuário atual, status de login, estados de carregamento e quaisquer erros** 🐞 relacionados à autenticação.
    * Inicializa o estado de autenticação ao carregar a aplicação, verificando se há um token existente.
* **Funcionalidade de Logout** 👋 (`NavBar.tsx`, `auth.ts`):
    * Permite que usuários autenticados **façam logout**, removendo o JWT e os dados do usuário do *local storage*.
    * Após o logout, o usuário é geralmente **redirecionado de volta para a página de *landing*** ou de login.
* **Proteção de Rotas** 🛡️ (`HomePage.tsx`, `LoginPage.tsx`, `RegisterPage.tsx`, `App.tsx`):
    * A `HomePage` é **protegida**, ou seja, usuários não autenticados são automaticamente redirecionados para a página de login.
    * Por outro lado, as páginas de `Login` e `Registro` **redirecionam usuários já autenticados para a `HomePage`**, evitando acesso desnecessário.

---

### 2. Gerenciamento de Usuários (Operações CRUD) 🛠️

Na `HomePage`, usuários autenticados podem gerenciar os dados de outros usuários através de uma interface CRUD.

* **Exibição de Usuários com Paginação** 📚 (`CrudOperations.tsx`, `api.ts`):
    * Busca a lista de usuários do backend (`/api/users`).
    * Implementa **paginação** para uma exibição eficiente, permitindo navegar entre as páginas de forma fluida.
    * Usuários são mostrados em uma **tabela** com nome e e-mail.
    * Inclui **indicadores de carregamento** ⏳ e **tratamento de erros** 🚫 para uma melhor experiência.
* **Criação de Usuários** ✨ (`CrudOperations.tsx`, `api.ts`):
    * Um formulário intuitivo para **criar novas contas de usuário**.
    * Campos para **nome, e-mail e senha**.
    * Envia os dados para o backend via `POST` (`/api/users`).
    * Exibe **mensagens de sucesso** 🎉 ou **erro** 👎 ao usuário.
* **Atualização de Usuários** ✍️ (`CrudOperations.tsx`, `api.ts`):
    * Botão "Editar" para cada usuário na tabela. Ao clicar, o formulário é preenchido com os dados do usuário, permitindo **modificar nome e e-mail**.
    * A senha não é editável diretamente por segurança.
    * Envia os dados atualizados para o backend via `PUT` (`/api/users/{id}`).
    * Mostra **mensagens de sucesso** ou **erro**, e a lista é atualizada automaticamente.
* **Exclusão de Usuários** 🗑️ (`CrudOperations.tsx`, `api.ts`):
    * Botão "Deletar" para cada usuário.
    * Solicita **confirmação** antes de excluir para evitar acidentes.
    * Envia a requisição de exclusão para o backend via `DELETE` (`/api/users/{id}`).
    * Exibe **mensagens de sucesso** ou **erro**, e a lista é atualizada. Gerencia também a paginação se o último item da página for deletado.
* **Tratamento de Estado e Feedback Visual** 💬 (`CrudOperations.tsx`):
    * Gerencia os estados de formulário, lista de usuários, carregamento, erros e mensagens de sucesso.
    * Mensagens de sucesso desaparecem automaticamente após 3 segundos, para uma experiência fluida.

---

### 3. Navegação e Layout 🗺️

Uma estrutura de navegação clara e um layout limpo para facilitar o uso.

* **Barra de Navegação** 🧭 (`NavBar.tsx`):
    * No topo da página, oferece **links essenciais**: "SAFEROAD" (página de *landing*), "Início" (para usuários logados), "Login" e "Registre-se" (para quem não está logado).
    * Os links se **adaptam dinamicamente** ao status de autenticação do usuário.
    * Inclui um prático botão "Sair" para logout.
* **Roteamento** 🚦 (`App.tsx`):
    * Define as rotas da aplicação usando `react-router-dom`: `/` (landing), `/login`, `/register` e `/home`.
    * Possui uma rota curinga (`*`) que redireciona para a página de *landing* para URLs desconhecidas.
* **Páginas Dedicadas** 📄 (`LandingPage.tsx`, `LoginPage.tsx`, `RegisterPage.tsx`, `HomePage.tsx`):
    * Cada funcionalidade principal tem sua própria página, organizando os componentes e a lógica de forma clara.
    * A `LandingPage` é a porta de entrada, convidando à exploração ou ao login/registro.
* **Estilização Global** 🎨 (`index.css`, `tailwind.config.js`, `postcss.config.js`):
    * Define estilos CSS básicos e utilitários para uma aparência consistente.
    * Usa um reset CSS para padronizar o visual em diferentes navegadores.
    * As configurações de PostCSS e Tailwind CSS sugerem a flexibilidade para uma futura integração de estilos mais avançados.

---

### 4. Integração com o Backend 🔗

Os arquivos na pasta `services` são a ponte entre o frontend e o backend.

* **`api.ts`**:
    * Centraliza todas as requisições HTTP para as operações CRUD.
    * A função `apiRequest` padroniza as requisições, adicionando cabeçalhos como `Content-Type` e o **token de autorização (JWT)** automaticamente.
    * Oferece funções auxiliares como `getUsers`, `createUser`, `updateUser` e `deleteUser`, simplificando a comunicação com a API.
    * Contém um **tratamento de erros genérico** para falhas de rede ou respostas da API.
* **`auth.ts`**:
    * Gerencia o **armazenamento e a recuperação do token JWT e dos dados do usuário** no *local storage*.
    * Contém as funções `login` e `register` que interagem diretamente com os endpoints de autenticação do backend.
    * Fornece funções para verificar se o usuário está autenticado (`isAuthenticated`) e para realizar o `logout`.

---

### 5. Ferramentas e Configurações de Desenvolvimento ⚙️

O projeto também vem com um conjunto de ferramentas para otimizar o desenvolvimento e garantir a qualidade do código.

* **Variáveis de Ambiente** 🌍 (`.env`):
    * Permite configurar variáveis de ambiente, como a **URL da API do backend (`VITE_API_URL`)**, facilitando a mudança entre ambientes de desenvolvimento e produção.
* **Linter e Formatter** 🧹 (`eslint.config.js`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`):
    * Utiliza **ESLint com TypeScript** para manter a qualidade do código, identificar erros e garantir um estilo consistente.
    * As configurações de TypeScript garantem a tipagem correta e um ambiente de desenvolvimento robusto.
* **Vite** ⚡:
    * O projeto usa Vite, um **empacotador de frontend ultrarrápido**, otimizando tanto o desenvolvimento quanto o processo de *build*.
* **`.gitignore` e `package.json`** 📦:
    * O `.gitignore` garante que arquivos desnecessários ou sensíveis não sejam versionados.
    * O `package.json` lista todas as dependências e *scripts* de desenvolvimento (como `dev` para iniciar o servidor de desenvolvimento).

---

Este frontend do SAFEROAD é uma aplicação React robusta, focada em **segurança na autenticação**, **gestão de dados via CRUD** e uma **experiência de usuário impecável** com validações, feedback visual e navegação intuitiva.
