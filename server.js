const express = require('express');
const cors = require('cors');
const sql = require("msnodesqlv8");
const mysql = require('mysql2')

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const connectionString = "Encrypt = Optional;Driver={ODBC Driver 17 for SQL Server};Server=localhost;Database=CHATGPT_A3;Trusted_Connection=yes;"


// Endpoint hello-world
app.get('/hello-world', (req, res) => {
  console.log('hello-world'); // Exibe "hello-world" no console quando o endpoint é acessado
  res.json({ message: 'hello-world' }); // Retorna "hello-world" como resposta
});

// Endpoint consultar
app.get('/consultar', (req, res) => {
  console.log('consultar');

  // Mock de dados para a inserção na tabela log_interacoes
  const usuario_id = 'CF99316C-2DC8-4CF3-85BF-175BC90B5B7A';
  const nome_usuario = 'MockUser';
  const prompt_entrada = 'Exemplo de entrada do usuário';
  const resposta_chat = 'Exemplo de resposta do chat';
  const chat_id = '678A3078-0CCE-4B48-91BC-565CCDE13306';

  // Consulta de inserção para registrar o log
  const insertQuery = `
    INSERT INTO log_interacoes (usuario_id, nome_usuario, prompt_entrada, resposta_chat, chat_id)
    VALUES ('${usuario_id}', '${nome_usuario}', '${prompt_entrada}', '${resposta_chat}', '${chat_id}')
  `;

  // Executa a inserção de log
  sql.query(connectionString, insertQuery, (err) => {
    if (err) {
      console.error('Erro ao inserir log:', err);
      return res.status(500).send('Erro ao registrar log no banco de dados');
    }

    // Executa a consulta para obter os dados de chats
    sql.query(connectionString, "SELECT * FROM chats", (err, rows) => {
      if (err) {
        console.error('Erro ao acessar a tabela chats:', err);
        return res.status(500).send('Erro ao acessar dados no banco de dados');
      }

      res.json(rows); // Retorna os dados de chats
    });
  });
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
