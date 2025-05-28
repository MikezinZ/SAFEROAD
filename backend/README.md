# 🛣️ SAFEROAD: Backend da Aplicação

Bem-vindo ao backend do projeto SAFEROAD! Este diretório contém uma API RESTful completa, desenvolvida em Node.js com o framework Express, responsável pela gestão de usuários, autenticação segura e autorização. A aplicação foi arquitetada para ser robusta, escalável e foi migrada com sucesso para um ambiente serverless na nuvem AWS.

Este backend serve o frontend da aplicação [SAFEROAD](https://github.com/MikezinZ/SAFEROAD) (hospedado na Vercel) e está atualmente em produção no **AWS Lambda**, exposto através do **Amazon API Gateway** e conectado a um banco de dados **PostgreSQL no Amazon RDS**.

---

## ✨ Funcionalidades Principais

* **Autenticação Segura com JWT:** Implementação de JSON Web Tokens para um sistema de autenticação *stateless* e seguro.
* **Autorização Baseada em Roles:** Controle de acesso granular para endpoints específicos (ex: apenas usuários com role `admin` podem deletar outros usuários).
* **CRUD Completo de Usuários:** Operações de Criação, Leitura, Atualização e Exclusão (CRUD) com validação de dados.
* **Paginação:** Suporte a paginação na listagem de usuários para otimizar a performance.
* **Hashing de Senhas:** Uso de `bcryptjs` para garantir que as senhas dos usuários sejam armazenadas de forma segura.
* **Documentação Interativa:** API documentada com OpenAPI/Swagger, acessível via `/api-docs` para fácil exploração e teste.
* **Compatibilidade Serverless:** Adaptado com `serverless-http` para execução em ambientes como o AWS Lambda.

---

## 💻 Tecnologias e Arquitetura Chave

* **Linguagem/Framework:** Node.js, Express.js
* **Banco de Dados:** PostgreSQL (com Sequelize ORM)
* **Autenticação/Autorização:** JSON Web Token (JWT), Bcrypt.js
* **Validação:** `express-validator`
* **Documentação:** Swagger (via `swagger-jsdoc` e `swagger-ui-express`)
* **Arquitetura de Deploy (AWS):**
    * **Computação:** AWS Lambda
    * **Gateway de API:** Amazon API Gateway
    * **Banco de Dados:** Amazon RDS para PostgreSQL
    * **Rede:** Amazon VPC com subnets privadas e públicas

---

## 🛠️ Como Executar o Backend Localmente

Siga estes passos para configurar e executar o backend em seu ambiente de desenvolvimento.

### 1. Pré-requisitos

* **Node.js:** Versão 18.x ou superior.
* **npm:** (geralmente incluído no Node.js).
* **Git:** Para clonar o repositório.
* (Opcional) Uma instância PostgreSQL rodando localmente ou acesso a uma instância na nuvem (como a do RDS que criamos).

### 2. Instalação

```bash
# Navegue até a pasta do backend a partir da raiz do projeto
cd backend/

# Instale todas as dependências
npm install
3. Configuração do Ambiente
Crie um arquivo chamado .env na raiz do diretório backend/. Este arquivo armazena suas configurações sensíveis e não deve ser enviado para o Git.

Template do .env:

Snippet de código

# Chave secreta para a assinatura dos tokens JWT. Use um valor forte!
JWT_SECRET=sua_chave_secreta_forte_aqui

# Porta em que o servidor local será executado.
PORT=3000

# URL de conexão com o banco de dados PostgreSQL.
# Escolha UMA das opções abaixo:
#
# Opção A: Conectar ao banco de dados AWS RDS (para desenvolvimento usando o DB da nuvem)
# Certifique-se que o Security Group do RDS permite acesso do seu IP.
DATABASE_URL="postgresql://saferoadadmin:SUA_SENHA_RDS@saferoad-db-instance.SEU_[ENDPOINT.us-east-2.rds.amazonaws.com:5432/saferoad_database](https://ENDPOINT.us-east-2.rds.amazonaws.com:5432/saferoad_database)"
#
# Opção B: Conectar a um banco de dados PostgreSQL local (se você tiver um instalado)
# DATABASE_URL="postgresql://SEU_USER_LOCAL:SUA_SENHA_LOCAL@localhost:5432/SEU_DB_LOCAL"
Substitua os valores de placeholder pelos seus dados reais.

4. Execução
Para desenvolvimento (com reinicialização automática):

Bash

npm run dev
Para iniciar em modo de produção (sem reinicialização automática):

Bash

npm start
Após iniciar, o servidor estará disponível em http://localhost:3000 (ou na porta definida no .env).

5. Acessar a Documentação da API (Swagger)
Com o servidor local rodando, acesse a documentação interativa no seu navegador:
http://localhost:3000/api-docs

☁️ Deploy na AWS (Resumo do Processo)
Este backend está configurado para ser implantado em um ambiente serverless na AWS:

Adaptação do Código: O arquivo src/index.js utiliza a biblioteca serverless-http para encapsular a aplicação Express em um handler compatível com o AWS Lambda.
Empacotamento: Para o deploy, as dependências de produção são instaladas com npm install --omit=dev. Em seguida, todos os arquivos necessários (src/, node_modules/, package.json, etc.) são compactados em um arquivo .ZIP.
Upload e Deploy: O arquivo .ZIP é enviado para um bucket no Amazon S3. A função Lambda (saferoad-backend-api) é então configurada para usar este pacote .ZIP do S3 como seu código-fonte.
Configuração na Nuvem: Todas as configurações da Lambda (variáveis de ambiente, conexão com VPC, Security Groups, IAM Role) e do API Gateway (rotas, integração, CORS) são gerenciadas diretamente no Console da AWS.
📁 Estrutura do Projeto Backend
O backend adota uma estrutura de diretórios modular e organizada para promover a separação de responsabilidades, inspirada no padrão MVC.

backend/
├── node_modules/       # 📦 Dependências instaladas via npm
├── src/                # 📝 Código-fonte da aplicação
│   ├── config/         # ⚙️ Arquivos de configuração (ex: database.js)
│   ├── controllers/    # 🎯 Lógica de negócio e resposta às requisições (authController.js, userController.js)
│   ├── middleware/     # 🚦 Funções intermediárias (ex: auth.js, authorize.js)
│   ├── models/         # 📊 Definições dos modelos Sequelize (ex: user.js, index.js)
│   ├── routes/         # 🛣️ Definição das rotas da API (ex: authRoutes.js, userRoutes.js)
│   ├── tests/          # 🧪 Suíte de testes automatizados (ex: auth.tests.js)
│   └── index.js        # 🚀 Ponto de entrada da aplicação Express e handler serverless
├── .env                # 🔑 Arquivo para variáveis de ambiente (local, NÃO versionado)
├── package-lock.json   # 🔒 Lockfile de dependências
├── package.json        # 📄 Metadados do projeto, scripts e dependências
└── README.md           # 📖 Esta documentação
🧪 Testes Automatizados
O projeto inclui exemplos de testes automatizados para a autenticação (em backend/src/tests/auth.test.js). Para executar:

Bash

# No diretório backend/
npm test
(Nota: A suíte de testes pode requerer configuração de um banco de dados de teste ou o uso de mocks para rodar de forma isolada e consistente).

👨‍💻 Grupo SAFEROAD
Diego Ximenes
Lewi Gabriel
Lucas Maciel
Miguel Henrique
