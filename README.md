SAFEROAD
 Repositório dedicado à gestão de usuários e autenticação da plataforma SAFEROAD.
 Esta é uma API robusta e completa projetada para o gerenciamento eficiente de
 usuários, incorporando autenticação segura via JWT. O desenvolvimento seguiu o
 padrão MVC (Model-View-Controller) e aderiu às melhores práticas de desenvolvimento
 de software, garantindo um código organizado, manutenível e escalável.
 Funcionalidades Principais
 O sistema oferece um conjunto abrangente de funcionalidades essenciais para a
 administração de usuários e segurança:
 • 
• 
• 
• 
• 
• 
Autenticação JWT: Implementa um sistema seguro de autenticação baseado em
 JSON Web Tokens, protegendo os endpoints e garantindo que apenas usuários
 autorizados possam acessar recursos específicos.
 CRUD Completo de Usuários: Disponibiliza operações completas de Criação,
 Leitura, Atualização e Exclusão (CRUD) para a entidade de usuários, permitindo um
 gerenciamento detalhado.
 Validação de Dados: Utiliza mecanismos de validação para assegurar a
 integridade e a consistência dos dados recebidos nas requisições, prevenindo erros
 e inconsistências.
 Documentação Swagger: Integra o Swagger UI para fornecer uma documentação
 interativa e detalhada da API, facilitando o entendimento e o uso dos endpoints
 disponíveis.
 Testes Automatizados: Inclui uma suíte de testes automatizados para verificar o
 correto funcionamento das funcionalidades principais, garantindo a qualidade e a
 estabilidade da aplicação.
 Banco de Dados com Sequelize: Emprega o Sequelize ORM para interagir com o
 banco de dados (configurado para SQLite localmente e com suporte a RDS para
 produção), abstraindo as operações de banco de dados e facilitando a
 manutenção.
 Como Executar o Projeto
 Para executar o backend da aplicação SAFEROAD em seu ambiente local, siga os passos
 detalhados abaixo.
Pré-requisitos
 Antes de iniciar, certifique-se de que possui os seguintes softwares instalados em sua
 máquina:
 • 
• 
Instalação
 Node.js: Versão 18 ou superior é recomendada. Você pode verificar sua versão com
 o comando 
node -v .
 npm ou yarn: Gerenciadores de pacotes do Node.js. O npm geralmente vem
 instalado junto com o Node.js. Verifique com 
npm -v ou 
yarn -v .
 Primeiramente, clone o repositório do projeto para sua máquina local utilizando o Git:
 git clone https://github.com/MikezinZ/SAFEROAD
 Após clonar, navegue até o diretório específico do backend:
 cd SAFEROAD/backend
 Em seguida, instale todas as dependências necessárias para o projeto executando:
 npminstall
 Ou, se preferir utilizar o yarn:
 yarn install
 Configuração do Ambiente
 É crucial configurar as variáveis de ambiente para o correto funcionamento da
 aplicação. Crie um arquivo chamado 
.env na raiz do diretório 
backend/ . Dentro deste
 arquivo, adicione as seguintes variáveis, substituindo os valores de exemplo pelos seus:
 # Chave secreta para a assinatura dos tokens JWT. Use um valor forte e seguro.
 JWT_SECRET=sua_chave_secreta_forte_aqui
 # Porta em que o servidor backend será executado.
 PORT=3000
 # Configurações do banco de dados (Exemplo para RDS, ajuste conforme 
necessário)
# DB_HOST=seu_host_rds
 # DB_USER=seu_usuario_rds
 # DB_PASSWORD=sua_senha_rds
 # DB_NAME=seu_banco_rds
 # DB_DIALECT=postgres # ou mysql, etc.
 Nota: A configuração padrão utiliza SQLite localmente (
 (
 database.sqlite ), mas o código
 src/index.js ) mostra preparo para sincronização com RDS em ambiente de produção.
 Execução
 Com o ambiente configurado e as dependências instaladas, você pode iniciar o servidor.
 Para executar em modo de desenvolvimento, que geralmente inclui funcionalidades
 como hot reload (reinicialização automática ao salvar alterações no código), utilize:
 npmrundev
 (Verifique no arquivo 
package.json se este script 
pode ser necessário iniciá-lo diretamente com 
usando 
nodemon se instalado).
 dev está definido. Caso contrário,
 node src/index.js ou similar, talvez
 Para executar em modo de produção, utilize o comando padrão para iniciar a aplicação:
 npmstart
 Após iniciar o servidor, ele estará disponível no endereço 
PORT é o valor definido no seu arquivo 
 Documentação da API (Swagger)
 http://localhost:PORT , onde 
.env (ou 3000 por padrão).
 A API possui uma documentação interativa gerada com Swagger. Após iniciar o servidor
 localmente, você pode acessá-la através do seu navegador no seguinte endereço:
 http://localhost:3000/api-docs
 (Substitua 
3000 pela porta configurada, se diferente).
 A documentação permite visualizar todos os endpoints disponíveis, seus parâmetros,
 corpos de requisição esperados e respostas, além de permitir testar as chamadas
 diretamente pela interface.
 Endpoints da API
 A API está organizada em dois conjuntos principais de rotas: Autenticação e Usuários.
 Autenticação (
 /api/auth )
 Estes endpoints são responsáveis pelo processo de login e registro de novos usuários.
 • 
• 
nome, 
POST /api/auth/register : Endpoint para registrar um novo usuário no sistema.
 Requer 
email e 
senha no corpo da requisição.
 POST /api/auth/login : Endpoint para autenticar um usuário existente. Requer 
email e 
senha no corpo da requisição. Retorna um token JWT em caso de
 sucesso.
 Usuários (
 /api/users )
 Estes endpoints gerenciam as operações CRUD para os usuários e requerem um token
 JWT válido no cabeçalho 
Authorization (formato 
• 
Bearer <token> ).
 GET /api/users : Lista todos os usuários cadastrados, com suporte a paginação (
 • 
• 
• 
• 
page=1&limit=10 ).
 GET /api/users/:id : Obtém os detalhes de um usuário específico pelo seu ID.
 POST /api/users : Cria um novo usuário. Requer 
nome, 
email e 
?
 senha no corpo
 da requisição. (Nota: A criação pode exigir permissões específicas dependendo da
 implementação de autorização).
 PUT /api/users/:id : Atualiza os dados de um usuário existente identificado pelo
 ID. Os campos a serem atualizados devem ser enviados no corpo da requisição.
 DELETE /api/users/:id : Remove um usuário do sistema identificado pelo ID.
 Testes Automatizados
 O projeto inclui testes automatizados para garantir a qualidade e o correto
 funcionamento das principais funcionalidades. Para executar a suíte de testes, utilize o
 seguinte comando na raiz do diretório 
backend/ :
 npmtest
 Certifique-se de que o ambiente de teste esteja corretamente configurado, se
 necessário.
 Estrutura do Projeto (Backend)
 A estrutura de diretórios do backend foi organizada para promover a separabilidade de
 conceitos e facilitar a manutenção, seguindo o padrão MVC:
 backend/
 ├──node_modules/ # Dependências do projeto
 ├──src/
 │├──config/ # Configurações (banco de dados, etc.)
 ││└──database.js# Configuração da conexão Sequelize
 │├──controllers/ # Lógica de controle (recebe requisições, chama serviços)
 ││├──authController.js
 ││└──userController.js
 │├──middleware/ # Middlewares (autenticação, autorização, erros)
 ││├──auth.js
 ││└──authorize.js
 │├──models/ # Definição dos modelos de dados (Sequelize)
 ││├──index.js # Inicialização dos modelos
 ││└──user.js # Modelo de Usuário
 │├──routes/ # Definição das rotas da API
 ││├──authRoutes.js
 ││└──userRoutes.js
 │├──tests/ # Arquivos de testes automatizados
 ││└──auth.test.js# Exemplo de arquivo de teste
 │└──index.js # Ponto de entrada da aplicação (configuração do Express, 
servidor)
 ├──.env # Arquivo de variáveis de ambiente (não versionado)
 ├──database.sqlite # Banco de dados SQLite (para desenvolvimento local)
 ├──package-lock.json # Lockfile de dependências npm
 ├──package.json # Metadados do projeto e dependências
 └──README.md # Este arquivo
 Contribuição
 Contribuições para o projeto SAFEROAD são muito bem-vindas! Se você deseja
 contribuir, por favor, siga estes passos:
 Faça um fork do projeto original.
 Crie uma nova branch para a sua funcionalidade ou correção (git checkout -b
 feature/MinhaNovaFeature ou fix/CorrecaoDeBug).
 Faça commit das suas alterações (git commit -m 'Adiciona MinhaNovaFeature').
 Faça push para a sua branch (git push origin feature/MinhaNovaFeature).
 Abra um Pull Request no repositório original para que suas alterações possam ser
 revisadas e integradas.
 1. 
2. 
3. 
4. 
5. 
 Licença
 Este projeto é distribuído sob a licença MIT. Consulte o arquivo 
repositório) para obter mais detalhes.
 Contato
 Equipe SafeRoad - 
projetosaferoad@gmail.com
 Link do Projeto no GitHub: 
LICENSE (se existente no
 https://github.com/MikezinZ/SAFEROAD
 Integrantes do Projeto
 • 
• 
• 
• 
Miguel Henrique
 Diego Ximenes
 Lewi Gabriel
 Lucas Maciel
 Desenvolvido pela equipe SafeRoad - 202
