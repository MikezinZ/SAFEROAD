# 🚀 SAFEROAD: Visão Geral do Frontend

Este documento detalha as funcionalidades, tecnologias e a estrutura de código frontend.

----

## 💻 Tecnologias Utilizadas no Frontend

O frontend do SAFEROAD é construído com tecnologias modernas para oferecer uma experiência de usuário dinâmica e responsiva:

* **React:** ⚛️ A biblioteca JavaScript principal para construir a interface do usuário. Ela nos permite criar componentes reutilizáveis e gerenciar o estado da aplicação de forma eficiente, resultando em uma UI interativa e de alta performance.
* **TypeScript:** ʦ Um superconjunto de JavaScript que adiciona tipagem estática ao código. Isso é fundamental para identificar erros durante o desenvolvimento, melhorar a manutenibilidade e tornar o código mais robusto e fácil de escalar.
* **React Router DOM:** 🛣️ Essencial para gerenciar a navegação entre as diferentes páginas da aplicação. Ele cria uma experiência de usuário de página única (SPA), onde o conteúdo é atualizado dinamicamente sem recarregar a página inteira.
* **Context API (AuthContext):** 🤝 Utilizada para o gerenciamento de estado global, especificamente para a autenticação do usuário. Isso significa que o estado de autenticação (se o usuário está logado, quais são suas informações) pode ser facilmente compartilhado entre todos os componentes que precisam dele, evitando o "prop drilling" (passar props manualmente por muitos níveis de componentes).
* **Fetch API (nativo):** 📡 O código utiliza a Fetch API nativa do navegador para realizar requisições HTTP ao backend. Embora não seja uma biblioteca externa como Axios, ela cumpre o mesmo papel de comunicação assíncrona com o servidor.
* **Vite:** ⚡ Um *bundler* de frontend rápido e leve que oferece uma experiência de desenvolvimento ágil. Seu principal benefício é o recarregamento instantâneo do navegador (Hot Module Replacement - HMR), que acelera muito o ciclo de feedback do desenvolvedor.
* **CSS (index.css):** 🎨 Contém a estilização básica e global da aplicação. Define a aparência geral dos elementos, tipografia, cores e layouts fundamentais para a consistência visual.
* **Tailwind CSS (config files present):** 🌬️ Embora não haja classes Tailwind diretamente no `index.css` fornecido, a presença dos arquivos de configuração (`tailwind.config.js`, `postcss.config.js`) indica a intenção de usar Tailwind CSS. Esta é uma estrutura CSS utilitária que permite construir designs complexos e responsivos diretamente no HTML, sem escrever CSS personalizado para cada componente.
* **ESLint:** 🔍 Uma ferramenta de linting configurada para JavaScript e TypeScript. Ela nos ajuda a manter a qualidade e a consistência do código, identificando padrões problemáticos, erros de sintaxe e forçando boas práticas de codificação.

---

## ✨ Principais Funcionalidades

O frontend do SAFEROAD oferece uma interface intuitiva para interagir com o backend, focando em autenticação e operações de gerenciamento de dados:

### 1. Autenticação de Usuários 🔑

Os componentes e serviços de autenticação são o pilar para garantir que os usuários possam acessar o sistema de forma segura e personalizada.

* **Página de Login (`LoginPage.tsx` e `LoginForm.tsx`):**
    * **Coleta de Credenciais:** Permite que os usuários insiram seu **email** e **senha** para acessar a aplicação.
    * **Validação de Formulário:** Inclui validações básicas para garantir que os dados de entrada estejam no formato correto (ex: email válido) e que os campos obrigatórios sejam preenchidos antes de enviar a requisição ao backend.
    * **Feedback ao Usuário:** Exibe mensagens de **erro** claras e concisas, caso o login falhe (por exemplo, credenciais inválidas ou erro de rede).
    * **Navegação Pós-Login:** Após um login bem-sucedido, o usuário é automaticamente redirecionado para a página inicial (`/home`), proporcionando uma transição fluida.
* **Página de Registro (`RegisterPage.tsx` e `RegisterForm.tsx`):**
    * **Criação de Conta:** Permite que novos usuários criem uma conta, fornecendo **nome de usuário**, **email** e **senha** (com um campo de confirmação de senha para evitar erros de digitação).
    * **Validação Robusta:** Possui validações de formulário mais abrangentes para garantir a integridade dos dados, como verificar se o email é válido, se a senha tem o comprimento mínimo de 6 caracteres e se as senhas nos campos "senha" e "confirmar senha" coincidem.
    * **Gerenciamento de Erros:** Lida e exibe mensagens de **erro** específicas que podem surgir durante o processo de registro (ex: email já cadastrado, senhas que não batem).
    * **Redirecionamento:** Após o registro bem-sucedido, o usuário é redirecionado para a página de login, onde poderá acessar sua nova conta.
* **Contexto de Autenticação (`AuthContext.tsx`):**
    * **Gerenciamento de Estado Global:** É o coração da autenticação no frontend. Ele centraliza o estado de autenticação do usuário (se está logado, quais são as informações do usuário logado, se há erros de autenticação).
    * **Funções de Autenticação:** Fornece as funções `login`, `register` e `logout` para os componentes filhos, encapsulando toda a lógica de interação com os serviços de autenticação do backend.
    * **Persistência de Login:** Verifica se o usuário já está autenticado ao carregar a aplicação, recuperando tokens e dados do usuário armazenados no `localStorage`, garantindo que o usuário permaneça logado entre as sessões.
* **Serviço de Autenticação (`services/auth.ts`):**
    * **Camada de Comunicação:** Contém a lógica de baixo nível para interagir com os endpoints de autenticação do backend (`/api/auth/login`, `/api/auth/register`).
    * **Gerenciamento de Tokens e Usuários:** É responsável por armazenar e remover o **token JWT** e os **dados do usuário** no `localStorage` do navegador, que são essenciais para manter o estado de autenticação e identificar o usuário em requisições futuras.

### 2. Gerenciamento de Dados (Operações CRUD) 📝

A página inicial e o componente de operações CRUD fornecem aos usuários autenticados a capacidade de manipular itens de forma interativa.

* **Página Inicial (`HomePage.tsx`):**
    * **Dashboard do Usuário:** Atua como o painel principal para usuários logados.
    * **Personalização:** Exibe uma mensagem de boas-vindas personalizada, utilizando as informações do usuário logado.
    * **Integração CRUD:** Contém o componente `CrudOperations`, que é a interface para o usuário interagir com seus itens.
    * **Proteção de Rota:** Implementa um controle de acesso, redirecionando automaticamente usuários não autenticados de volta para a página de login, garantindo que apenas usuários autorizados possam ver seu dashboard.
* **Componente CRUD (`CrudOperations.tsx`):**
    * **Interface Completa:** Fornece uma interface abrangente para realizar todas as operações CRUD (**Criar, Ler, Atualizar e Excluir**) em itens.
    * **Exibição de Dados:** Apresenta uma lista dinâmica de itens recuperados do backend em um formato de tabela.
    * **Formulário Flexível:** Inclui um formulário que pode ser usado tanto para adicionar novos itens quanto para editar itens existentes, alternando sua função com base no modo de edição.
    * **Feedback Interativo:** Fornece feedback visual claro ao usuário, como mensagens de "Carregando...", "Item criado com sucesso!" (sucesso) e alertas de erro, melhorando a experiência do usuário.
    * **Listar Itens (`WorkspaceItems` e `getItems`):** Ao montar o componente, ele busca todos os itens do backend e os exibe.
    * **Criar Item (`handleSubmit` e `createItem`):** Permite que o usuário crie um novo item através do formulário, enviando os dados para o backend.
    * **Atualizar Item (`handleEdit`, `handleSubmit` e `updateItem`):** Ao clicar em "Editar", o formulário é preenchido com os dados do item selecionado, permitindo que o usuário faça alterações e as salve no backend.
    * **Deletar Item (`handleDelete` e `deleteItem`):** Oferece uma funcionalidade para remover itens específicos, com uma confirmação antes da exclusão para evitar ações acidentais.
* **Serviço de API (`services/api.ts`):**
    * **Camada de Abstração:** Centraliza as funções para realizar requisições HTTP genéricas (GET, POST, PUT, DELETE) para os endpoints CRUD do backend (`/items`, `/items/:id`).
    * **Injeção de Autenticação:** Automaticamente anexa o **token de autenticação** (obtido do `localStorage`) nos cabeçalhos das requisições, garantindo que as operações CRUD sejam autorizadas pelo backend.
    * **Padronização de Respostas:** Lida com a estrutura de resposta da API, retornando os dados (se bem-sucedido) ou uma mensagem de erro (se a requisição falhar).

---

## 🧭 Estrutura de Navegação e Componentes

A aplicação é estruturada de forma modular e clara, o que facilita significativamente o desenvolvimento, a manutenção e a colaboração:

* **`src/App.tsx`:** 📦 É o componente raiz da aplicação. Sua principal responsabilidade é configurar o roteamento (utilizando `BrowserRouter` do React Router DOM) e o provedor de autenticação (`AuthProvider`), que encapsula toda a aplicação, tornando o estado de autenticação disponível globalmente.
* **`src/main.tsx`:** 🚀 O ponto de entrada principal da aplicação React. É o arquivo que inicializa a renderização do componente `App` no navegador.
* **`src/components/`:** 🧱 Este diretório armazena todos os componentes reutilizáveis da interface do usuário. Exemplos incluem os formulários de login e registro (`LoginForm.tsx`, `RegisterForm.tsx`), a barra de navegação superior (`NavBar.tsx`) e a interface para as operações CRUD (`CrudOperations.tsx`). A separação de componentes promove a reutilização de código e a modularidade.
* **`src/contexts/`:** 🌟 Contém o `AuthContext.tsx`, que é a implementação da Context API do React para gerenciar e prover o estado de autenticação (usuário logado, funções de login/logout) para toda a árvore de componentes que necessitam dele.
* **`src/pages/`:** 📄 Este diretório agrupa os componentes de página, que representam diferentes visualizações ou "telas" na aplicação. Exemplos incluem a página inicial (`LandingPage.tsx`), as páginas de login (`LoginPage.tsx`) e registro (`RegisterPage.tsx`), e a página principal para usuários autenticados (`HomePage.tsx`).
* **`src/services/`:** 🌐 Contém módulos dedicados à lógica de comunicação com o backend. Isso inclui `api.ts` para operações CRUD genéricas e `auth.ts` para a lógica específica de autenticação (login, registro, gerenciamento de tokens). Separar essa lógica ajuda a manter os componentes da UI "burros" e focados apenas em apresentar dados.
* **`public/index.html`:** 🕸️ O arquivo HTML principal que serve como a "casca" para a aplicação React. É aqui que o JavaScript do React será injetado para construir a interface.
* **`src/index.css`:** 💅 A folha de estilos CSS global da aplicação. Define a aparência básica e o design consistente em todas as páginas e componentes.

---------------------------
*GRUPO SafeRoad*
-*Integrantes:*
- Diego Ximenes
- Lewi Gabriel
- Lucas Maciel
- Miguel henrique
- --------------------------
