# SAFEROAD
 Repositório dedicado para gestão de usuário e autenticação da SAFEROAD!!!


API completa para gerenciamento de usuários com autenticação JWT, seguindo padrão MVC e boas práticas de desenvolvimento!!!!

📋 Funcionalidades
✅ Autenticação JWT

✅ CRUD completo de usuários

✅ Validação de dados

✅ Documentação Swagger

✅ Testes automatizados

✅ Banco de dados SQLite

🚀 Como executar
Pré-requisitos
Node.js 18+
-
npm ou yarn
-
Instalação
Clone o repositório
-
bash
Copy
git clone https://github.com/MikezinZ/SAFEROAD
cd backend
Instale as dependências
-
bash
Copy
npm install
Configure o ambiente (crie um arquivo .env na raiz)
-
env
Copy
JWT_SECRET=sua_chave_secreta_aqui
PORT=3000
Execução
Modo desenvolvimento (com hot reload):
-
bash
Copy
npm run dev
Modo produção:
-
bash
Copy
npm start
📚 Documentação da API
Acesse a documentação interativa Swagger em:
-
Copy
http://localhost:3000/api-docs
🛠️ Endpoints
Autenticação
POST /api/auth/register - Registrar novo usuário
-
POST /api/auth/login - Login de usuário existente
-
Usuários (requer autenticação)
GET /api/users - Listar todos usuários
-
GET /api/users/:id - Obter usuário por ID
-
POST /api/users - Criar novo usuário
-
PUT /api/users/:id - Atualizar usuário
-
DELETE /api/users/:id - Remover usuário
-
🧪 Testes
Execute os testes com:
-
bash
Copy
npm test
🏗️ Estrutura do Projeto
Copy
backend/
├── src/
│   ├── config/       # Configurações do banco e Swagger
│   ├── controllers/  # Lógica das rotas
│   ├── middleware/   # Middlewares de autenticação e erro
│   ├── models/       # Modelos do Sequelize
│   ├── routes/       # Definição das rotas
│   ├── services/     # Lógica de negócio
│   ├── tests/        # Testes automatizados
│   ├── app.js        # Configuração do Express
│    └── server.js     # Inicialização do servidor
├── .env
├── database.sqlite
├── package-lock.json
├── package.json
├──node_modules/

🤝 Contribuição
Contribuições são bem-vindas! Siga estes passos:
-
Faça um fork do projeto
-
Crie uma branch (git checkout -b feature/AmazingFeature)
-
Commit suas mudanças (git commit -m 'Add some AmazingFeature')
-
Push para a branch (git push origin feature/AmazingFeature)
-
Abra um Pull Request
-
📄 Licença
Distribuído sob a licença MIT. Veja LICENSE para mais informações.
-
✉️ Contato
SafeRoad - projetosaferoad@gmail.com
-
Link do Projeto: https://github.com/MikezinZ/SAFEROAD
-
Integrantes do projeto:
- Miguel Henrique
- Diego Ximenes
- Lewi Gabriel
- Lucas Maciel

Desenvolvido por SafeRoad - 2025


