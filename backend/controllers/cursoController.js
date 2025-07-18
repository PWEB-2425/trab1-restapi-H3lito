const Curso = require('../models/curso');

exports.getAll = async (req, res) => {
  const nome = req.query.nome;
  let filtro = {};

  // Filtra pelo campo nomeDoCurso, caso receba o parâmetro nome
  if (nome) {
    filtro = {
      nomeDoCurso: { $regex: nome, $options: 'i' }
    };
  }

  try {
    const cursos = await Curso.find(filtro)
      .select('nomeDoCurso') // só traz o campo nomeDoCurso (pode incluir mais se quiser)
      .lean();

    if (cursos.length === 0 && nome) {
      return res.status(404).json({ msg: 'Nenhum curso encontrado' });
    }

    res.json(cursos);
  } catch (erro) {
    console.error('Erro ao buscar cursos:', erro);
    res.status(500).json({ msg: 'Erro interno ao buscar cursos' });
  }
};


exports.getById = async (req, res) => {
    const curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ msg: 'Curso não encontrado' });

    res.json(curso);
};

exports.create = async (req, res) => {
  const novoCurso = new Curso(req.body);
  await novoCurso.save();

  res.status(201).json(novoCurso);
};

exports.update = async (req, res) => {
  const cursoAtualizado = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.json(cursoAtualizado);
};

exports.delete = async (req, res) => {
  await Curso.findByIdAndDelete(req.params.id);
  
  res.json({ msg: 'Curso removido' });
};
