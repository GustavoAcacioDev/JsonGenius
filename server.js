const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint hello-world
app.get('/hello-world', (req, res) => {
    console.log('hello-world'); // Exibe "hello-world" no console quando o endpoint é acessado
    res.json({ message: 'hello-world' }); // Retorna "hello-world" como resposta
});

// Inicie o servidor
app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
});
