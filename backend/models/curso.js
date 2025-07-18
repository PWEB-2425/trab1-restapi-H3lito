const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
  nomeDoCurso: String
});

module.exports = mongoose.model('Curso', CursoSchema);
