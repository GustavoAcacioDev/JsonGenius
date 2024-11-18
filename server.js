require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const sql = require("msnodesqlv8");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const connectionString = "Encrypt = Optional;Driver={ODBC Driver 17 for SQL Server};Server=localhost;Database=CHATGPT_A3;Trusted_Connection=yes;"

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      isSuccess: false,
      errors: ['Email e senha são obrigatórios.']
    });
  }

  const getQuery = `SELECT id, password_hash FROM users WHERE email='${email}'`;

  try {
    // Consulta ao banco de dados para buscar o usuário
    sql.query(connectionString, getQuery, async (err, rows) => {
      if (err) {
        console.error('Erro ao consultar usuário:', err);
        return res.status(500).json({
          isSuccess: false,
          errors: ['Erro ao consultar o banco de dados.']
        });
      }

      const user = rows[0];

      // Verifica se o usuário foi encontrado
      if (!user) {
        return res.status(404).json({
          isSuccess: false,
          errors: ['Usuário não encontrado.']
        });
      }

      if (bcrypt.compareSync(password, user.password_hash)) {
        // Passwords match
        const token = jwt.sign({ userId: user.id }, 'CHATGPT_A3', { expiresIn: '1h' });

        res.json({
          isSuccess: true,
          value: {
            userId: user.user_id,
            message: 'Login realizado com sucesso.',
            token: token
          }
        });
      } else {
        // Passwords don't match
        return res.status(401).json({
          isSuccess: false,
          errors: ['Senha inválida.']
        });
      }


    });
  } catch (error) {
    console.error('Erro durante o login:', error);
    res.status(500).json({
      isSuccess: false,
      errors: ['Erro interno ao processar a solicitação.']
    });
  }
});

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
        messages: [ {
          role: 'system',
          content: 'Você é um assistente que sempre responde em português. Você também é instruido a responder somente perguntas relacionadas a formatação de JSON, vc não deve responder nada que não seja relacionado a JSON, você também deve responder ao usuário que a pergunta não é sobre JSON e que ele pode refazer a pergunta',
        },
        { 
          role: 'user', 
          content: message
        }],
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


    await new Promise((resolve, reject) => {
      sql.query(connectionString, insertUserMessage, (err) => {
        if (err) {
          console.error('Erro ao inserir mensagem do usuário:', err);
          return reject('Erro ao inserir mensagem do usuário');
        }
        resolve();
      });
    });

    await new Promise((resolve, reject) => {
      sql.query(connectionString, insertChatMessage, (err) => {
        if (err) {
          console.error('Erro ao inserir resposta do chat:', err);
          return reject('Erro ao inserir resposta do chat');
        }
        resolve();
      });
    });

    await new Promise((resolve, reject) => {
      sql.query(connectionString, insertUserLogQuery, (err) => {
        if (err) {
          console.error('Erro ao inserir log da mensagem do usuário:', err);
          return reject('Erro ao inserir log da mensagem do usuário');
        }
        resolve();
      });
    });

    await new Promise((resolve, reject) => {
      sql.query(connectionString, insertChatLogQuery, (err) => {
        if (err) {
          console.error('Erro ao inserir log da resposta do chat:', err);
          return reject('Erro ao inserir log da resposta do chat');
        }
        resolve();
      });
    });

    res.json(chatResponse);
  } catch (error) {
    console.error('Error fetching response from OpenAI:', error);
    res.status(500).json({ error: 'Failed to fetch response from ChatGPT' });
  }
});

app.delete('/chat/:chat_id/delete', async (req, res) => {
  const { chat_id } = req.params;

  if (!chat_id) {
    return res.status(400).json({ error: 'Chat ID is required' });
  }

  try {
    const deleteMessagesQuery = `
      DELETE FROM messages WHERE chat_id = '${chat_id}'
    `;

    sql.query(connectionString, deleteMessagesQuery, (err, result) => {
      if (err) {
        console.error('Erro ao excluir mensagens:', err);
        return res.status(500).json({ error: 'Erro ao excluir mensagens do chat' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Nenhuma mensagem encontrada para o chat_id fornecido' });
      }

      res.json({ message: `Todas as mensagens do chat ${chat_id} foram excluídas com sucesso.` });
    });
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


app.post('/novo-chat', async (req, res) => {
  try {
    const { userId } = req.body

    if (!userId) {
      res.json({ message: 'É necessário informar o ID do usuário' });
    }

    const insertQuery = `
      INSERT INTO chats (user_id, title, created_at, updated_at)
      VALUES ('${userId}', 'Novo Chat', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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

app.get('/mensagens', async (req, res) => {
  try {
    const { chatId } = req.query;

    // Validate if the chat ID is provided
    if (!chatId) {
      return res.status(400).json({
        isSuccess: false,
        errors: ['É necessário informar o ID do chat.']
      });
    }

    // Query to retrieve messages from the specified chat
    const getQuery = `
      SELECT id, user_id, chat_id, role, content, created_at 
      FROM messages 
      WHERE chat_id = '${chatId}'
      ORDER BY created_at ASC
    `;

    // Execute the query
    sql.query(connectionString, getQuery, (err, rows) => {
      if (err) {
        console.error('Erro ao consultar mensagens:', err);
        return res.status(500).json({
          isSuccess: false,
          errors: ['Erro ao consultar mensagens do banco de dados.']
        });
      }

      // Respond with the retrieved messages
      res.json({
        isSuccess: true,
        value: rows
      });
    });
  } catch (error) {
    console.error('Erro ao processar a solicitação de mensagens:', error);
    res.status(500).json({
      isSuccess: false,
      errors: ['Erro interno ao processar a solicitação.']
    });
  }
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
