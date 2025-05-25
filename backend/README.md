# 🚀 SAFEROAD: Visão Geral do Backend

Este documento detalha as funcionalidades, tecnologias e a estrutura de código do backend da aplicação SAFEROAD.

----

## 💻 Tecnologias Utilizadas no Backend

O coração do nosso backend é construído com ferramentas e frameworks modernos para garantir eficiência e segurança:

* **Node.js & Express:** 🌐 A base da nossa API, fornecendo um ambiente robusto para a construção de serviços web.
* **SQLite:** 📦 Nosso banco de dados, uma solução leve e baseada em arquivo, perfeita para desenvolvimento. Você pode encontrá-lo em `env/database.sqlite`.
* **Sequelize:** 🗺️ Um Mapeador Objeto-Relacional (ORM) que simplifica a interação com o banco de dados, transformando tabelas em objetos JavaScript para facilitar o desenvolvimento.
* **JWT (JSON Web Tokens):** 🔑 Essencial para a **autenticação segura de usuários**. Permite que os usuários façam login uma vez e continuem acessando recursos protegidos sem precisar inserir suas credenciais repetidamente.
* **Bcryptjs:** 🔒 Uma biblioteca crucial para a **segurança das senhas**. Ela hasheia as senhas dos usuários antes de armazená-las no banco de dados, protegendo-as contra acessos não autorizados.
* **CORS (Cross-Origin Resource Sharing):** ↔️ Permite que o frontend (que roda em uma porta ou domínio diferente) se comunique livremente com o backend, garantindo que as requisições não sejam bloqueadas por políticas de segurança do navegador.
* **Swagger UI Express & Swagger-JSDoc:** 📖 Ferramentas incríveis para a **documentação da API**. Elas geram automaticamente uma documentação interativa a partir dos comentários no nosso código, facilitando para outros desenvolvedores (e para nós mesmos!) entenderem e testarem os endpoints.
* **Express-Validator:** ✅ Um middleware que nos ajuda a **validar os dados de entrada** nas requisições, garantindo que o email esteja no formato correto ou que a senha tenha o comprimento mínimo exigido.
* **Nodemon:** 🔄 Uma ferramenta de desenvolvimento que **reinicia automaticamente** o servidor Node.js a cada alteração de arquivo, agilizando o processo de codificação e teste.

---

## ✨ Principais Funcionalidades

Nosso backend foi projetado para oferecer duas áreas principais de funcionalidade: **Autenticação de Usuários** e **Gerenciamento de Usuários (CRUD)**.

### 1. Autenticação de Usuários 🔐

Os arquivos `authController.js` e `authRoutes.js` são responsáveis por toda a lógica de autenticação:

* **Registro de Usuário (POST /api/auth/register)**:
    * Novos usuários podem criar uma conta informando nome, email e senha.
    * **Segurança em Primeiro Lugar**: Antes de salvar a senha no banco de dados, ela é **hasheada** com bcryptjs (graças a um hook beforeCreate no modelo User).
    * Após o registro bem-sucedido, o usuário recebe um **JWT** para futuras interações com a API.
* **Login de Usuário (POST /api/auth/login)**:
    * Usuários existentes podem acessar sua conta com email e senha.
    * A senha fornecida é **verificada** contra a senha hasheada armazenada.
    * Com credenciais válidas, um novo **JWT** é emitido, concedendo acesso às rotas protegidas.
* **Middleware de Autenticação (auth.js)**:
    * Este middleware é o "segurança" das nossas rotas! 👮‍♂️ Ele verifica o JWT em cada requisição para rotas protegidas.
    * Extrai o token do cabeçalho Authorization, o verifica com nosso JWT_SECRET, e se for válido, adiciona as informações do usuário decodificadas ao objeto da requisição (req.user).
    * Caso não haja token ou ele seja inválido, uma resposta 401 Não Autorizado é retornada.

### 2. Gerenciamento de Usuários (Operações CRUD) 🧑‍💻

Os arquivos `userController.js` e `userRoutes.js` cuidam das operações de Criar, Ler, Atualizar e Excluir usuários (CRUD). Todas essas rotas são **protegidas pelo middleware de autenticação**, garantindo que apenas usuários autorizados possam acessá-las.

* **Obter Todos os Usuários (GET /api/users)**:
    * Retorna uma lista de todos os usuários cadastrados no banco de dados.
    * Para garantir a privacidade, apenas id, nome e email são retornados.
* **Obter Usuário por ID (GET /api/users/:id)**:
    * Busca os detalhes de um usuário específico utilizando seu ID.
    * Também retorna apenas id, nome e email.
* **Criar Usuário (POST /api/users)**:
    * Permite a criação de um novo usuário. Esta rota é mais utilizada para propósitos internos ou por administradores, já que o registro primário é feito via /api/auth/register.
* **Atualizar Usuário (PUT /api/users/:id)**:
    * Modifica os detalhes de um usuário existente com base no seu ID.
    * Permite a atualização dos campos nome e email.
* **Excluir Usuário (DELETE /api/users/:id)**:
    * Remove um usuário do banco de dados a partir do seu ID.

---

## 🗄️ Gerenciamento do Banco de Dados

* **Modelos Sequelize (models/ diretório):**
    * `user.js`: Define o **modelo User**, especificando campos como id, nome, email e senha, junto com seus tipos de dados. Inclui o hook beforeCreate para o hash da senha e um método validatePassword para comparar senhas.
    * `index.js`: Exporta a instância do sequelize e o modelo User, tornando-os facilmente acessíveis em toda a aplicação.
* **Configuração do Banco de Dados (config/database.js):**
    * Configura a instância do Sequelize para se conectar ao arquivo do banco de dados SQLite (database.sqlite).
    * O sequelize.sync() em index.js garante que o esquema do banco de dados seja **sincronizado** com os modelos definidos sempre que a aplicação é iniciada.

---

## ⚙️ Configuração do Servidor e Utilitários

* **Arquivo Principal da Aplicação (index.js)**:
    * É o ponto de entrada da nossa aplicação Express.
    * Configura o **CORS** para gerenciar requisições de diferentes origens.
    * Usa express.json() para processar os dados JSON enviados nas requisições.
    * Integra o **Swagger** para a documentação da API, disponível em /api-docs.
    * Possui um tratamento de erros global para lidar com exceções.
    * Define um endpoint de **saúde** (/health) para verificar se o servidor está funcionando.
    * Inicia o servidor após a sincronização bem-sucedida com o banco de dados.
* **Variáveis de Ambiente (.env)**:
    * O JWT_SECRET (chave secreta para os tokens JWT) e a PORTA do servidor são carregados a partir deste arquivo. Isso mantém informações sensíveis e configurações separadas do código-fonte principal, facilitando a implantação em diferentes ambientes.
* **Testes (tests/auth.test.js)**:
    * Inclui testes unitários básicos para os endpoints de autenticação (registro e login) usando supertest e jest. Isso mostra nosso compromisso em garantir a qualidade e a confiabilidade das funcionalidades centrais da API.

---

## 🌳 Estrutura do Projeto Backend

O backend segue uma estrutura clara e modular, com as responsabilidades bem divididas entre os diretórios:

* **`config/`**: ⚙️ Configurações importantes, como a do banco de dados.
* **`controllers/`**: 🚦 Lógica principal para processar as requisições e interagir com os modelos.
* **`middleware/`**: 🛡️ Funções intermediárias reutilizáveis, como o middleware de autenticação.
* **`models/`**: 📝 Definição dos esquemas do banco de dados e seus relacionamentos.
* **`routes/`**: 🛣️ Gerencia os endpoints da API e os direciona para as funções do controlador.
* **`tests/`**: 🧪 Contém todos os testes de unidade e integração para garantir o bom funcionamento do sistema.

Essa abordagem organizada torna o backend muito mais fácil de entender, manter e escalar à medida que o projeto cresce!

*GRUPO SAFEROAD* 
*integrantes*: 
-Diego Ximenes
-Lewi Gabriel 
-Lucas Maciel 
-Miguel Henrique  
