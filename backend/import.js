const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Curso = require('./models/curso');
const Aluno = require('./models/aluno');
const connectDB = require('./connection'); // assumes config.js exports connectDB()



async function importarDados() {
  try {
    // Lê o ficheiro JSON
    const dataPath = path.join(__dirname, '..', 'mock-data', 'bd.json');
    const rawData = fs.readFileSync(dataPath);
    const dados = JSON.parse(rawData);

    // Conecta à base de dados
    await connectDB();

    // Limpa as coleções (opcional)
    await Curso.deleteMany();
    await Aluno.deleteMany();

    // Insere cursos
    if (dados.cursos && dados.cursos.length) {
      await Curso.insertMany(dados.cursos);
      console.log('Cursos importados.');
    }

    // Insere alunos
    if (dados.alunos && dados.alunos.length) {
      await Aluno.insertMany(dados.alunos);
      console.log('Alunos importados.');
    }

    console.log('Importação concluída.');
    process.exit();
  } catch (erro) {
    console.error('Erro ao importar dados:', erro);
    process.exit(1);
  }
}

importarDados();
