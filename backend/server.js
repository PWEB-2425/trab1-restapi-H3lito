const express = require('express');
const cors = require('cors');
const connectDB = require('./connection');
const app = express();
const dotenv = require('dotenv');

// Liga ao MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Importa e usa as rotas
app.use('/cursos', require('./routes/cursoRoutes'));
app.use('/alunos', require('./routes/alunoRoutes'));

// Porta onde o servidor vai ouvir
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
