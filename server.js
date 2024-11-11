require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const sql = require("msnodesqlv8");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const connectionString = "Encrypt = Optional;Driver={ODBC Driver 17 for SQL Server};Server=localhost;Database=CHATGPT_A3;Trusted_Connection=yes;"

// Endpoint para registro de log
app.post('/logs', async (req, res) => {
  const { message, chat_id, user_id, action } = req.body;

  if (!message || !chat_id || !user_id || !action) {
    return res.status(400).json({ error: 'message, chat_id, action and user_id are required' });
  }

  try {
    // Consulta de inserção para registrar o log
    const insertQuery = `
      INSERT INTO logs (user_id, chat_id, action, detail)
      VALUES ('${user_id}', '${chat_id}', '${action}', '${message}')
    `;

    // Executa a inserção de log
    sql.query(connectionString, insertQuery, (err) => {
      if (err) {
        console.error('Erro ao inserir log:', err);
        return res.status(500).send('Erro ao registrar log no banco de dados');
      }
      // Retorna a resposta do ChatGPT ao usuário
      res.json({
        isSuccess: true,
        message: 'Logs inseridos'
      });
    });
  } catch (error) {
    console.error('Erro ao consultar ChatGPT ou inserir log:', error);
    res.status(500).send('Erro ao processar a solicitação');
  }
});

// Endpoint GET para listar os chats de um usuário
app.get('/chats', async (req, res) => {
  const usuarioId = req.query.usuarioId;

  if (!usuarioId) {
    return res.status(400).send('ID do usuário é obrigatório.');
  }

  const getQuery = `SELECT id, title, created_at FROM chats WHERE user_id='${usuarioId}' ORDER BY created_at DESC`

  try {
    // Executa a inserção de log
    sql.query(connectionString, getQuery, (err, rows) => {
      if (err) {
        console.error('Erro ao retornar lista de chats:', err);
        res.json({
          isSuccess: false,
          errors: ['Erro ao retornar lista de chats do banco de dados']
        })
        return res.status(500).send('Erro ao retornar lista de chats do banco de dados');
      }

      res.json({
        isSuccess: true,
        value: rows
      });
    });

  } catch (error) {
    console.error('Erro ao consultar chats:', error);
    res.status(500).send('Erro ao consultar os chats');
  }
});

app.post('/chat', async (req, res) => {
  const { message, chat_id, user_id } = req.body;

  if (!message || !chat_id || !user_id) {
    return res.status(400).json({ error: 'Message, chat_id, and user_id are required' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini', // Substitua pelo modelo que deseja usar
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const chatResponse = response.data;

    // Registrar o log
    const insertUserLogQuery = `INSERT INTO logs (user_id, chat_id, action, detail) VALUES ('${user_id}', '${chat_id}', 'send message', '${message}')`
    const insertChatLogQuery = `INSERT INTO logs (user_id, chat_id, action, detail) VALUES ('${user_id}', '${chat_id}', 'response message', '${chatResponse.choices[0].message.content}')`
    const insertUserMessage = `INSERT INTO messages (chat_id, user_id, role, content, created_at) VALUES ('${chat_id}', '${user_id}', 'user', '${message}', GETDATE())`
    const insertChatMessage = `INSERT INTO messages (chat_id, role, content, created_at) VALUES ('${chat_id}', 'assistant', '${chatResponse.choices[0].message.content}', GETDATE())`


    sql.query(connectionString, insertUserMessage, (err) => {
      if (err) {
        console.error('Erro ao inserir mensagem do usuário:', err);
        return res.status(500).send('Erro ao inserir mensagem do usuário');
      }

      res.json({ message: 'Chat criado com sucesso' });
    });

    sql.query(connectionString, insertUserLogQuery, (err) => {
      if (err) {
        console.error('Erro ao inserir log da mensagem do usuário:', err);
        return res.status(500).send('Erro ao log da mensagem do usuário');
      }

      res.json({ message: 'Chat criado com sucesso' });
    });
    
    sql.query(connectionString, insertChatLogQuery, (err) => {
      if (err) {
        console.error('Erro ao inserir log da resposta do chat:', err);
        return res.status(500).send('Erro ao log da resposta do chat');
      }

      res.json({ message: 'Chat criado com sucesso' });
    });

    sql.query(connectionString, insertChatMessage, (err) => {
      if (err) {
        console.error('Erro ao inserir resposta do chat:', err);
        return res.status(500).send('Erro ao inserir resposta do chat');
      }

      res.json({ message: 'Chat criado com sucesso' });
    });

    res.json(chatResponse);
  } catch (error) {
    console.error('Error fetching response from OpenAI:', error);
    res.status(500).json({ error: 'Failed to fetch response from ChatGPT' });
  }
});

app.post('/novo-chat', async (req, res) => {
  try {
    const usuario_id = '26ABD48E-2902-4C44-87FE-BA2A8760D505';

    const insertQuery = `
      INSERT INTO chats (user_id, title, created_at, updated_at)
      VALUES ('${usuario_id}', 'Novo Chat', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    sql.query(connectionString, insertQuery, (err) => {
      if (err) {
        console.error('Erro ao criar o novo chat:', err);
        return res.status(500).send('Erro ao criar um novo chat no banco de dados');
      }

      res.json({ message: 'Chat criado com sucesso' });
    });
  } catch (error) {
    console.error('Erro ao criar novo chat:', error);
    res.status(500).send('Erro ao processar a solicitação');
  }
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
